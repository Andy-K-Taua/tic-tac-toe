import re, sys, os
from pathlib import Path
import pyperclip

MAX_KB, MAX_LN = 50, 100
CHUNK_LIMIT = 15000  # Safe target character ceiling per prompt block

HIDDEN = {'.git','.DS_Store','Thumbs.db','.idea','.vscode','.github','package-lock.json','yarn.lock','pnpm-lock.yaml','.eslintcache'}
COLLAPSED = {'node_modules','dist','build','.vite','.next','__pycache__','public','assets','coverage','.serverless','vendor','bower_components','out','venv','.venv','supabase'}
IGNORED = {'.log','.tmp','.png','.jpg','.jpeg','.svg','.gif','.ico','.woff','.woff2','.ttf','.eot','.bak','.map','.pdf','.zip','.tar','.gz','.mp3','.mp4','.wav','.mov'}
CODE_EXT = {'.js','.ts','.jsx','.tsx','.json','.html','.css','.vue','.svelte','.py','.md','.go','.rs','.rb','.php','.java','.cs','.yaml','.yml'}

def clear_screen():
    # \033[H moves cursor to top-left, \033[J clears screen content
    print("\033[H\033[J", end="", flush=True)

def minify_file(p: Path) -> str:
    try:
        sz = p.stat().st_size
        if sz > MAX_KB * 1024: return f"// [Skipped: Heavy ({sz/1024:.1f} KB)]"
        with open(p, 'r', encoding='utf-8', errors='ignore') as f: lines = f.read().splitlines()
        res = []
        for l in lines:
            s = l.strip()
            if not s: continue
            if p.suffix in {'.js','.ts','.jsx','.tsx','.css','.vue','.svelte'} and (s.startswith('//') or s.startswith('/*')): continue
            if p.suffix in {'.py','.sh','.yaml','.yml'} and s.startswith('#'): continue
            if p.suffix in {'.html','.md'} and s.startswith('<!--'): continue
            res.append(l)
        if not res: return "// [Empty/Comment-only]"
        return "\n".join(res[:MAX_LN]) + (f"\n\n// ... [Truncated total {len(res)} lines]" if len(res) > MAX_LN else "")
    except Exception as e: return f"// [Error: {e}]"

def tree_scan(p: Path, r: Path, pref="", d=1, max_d=3, lines_list=None):
    if d > max_d or lines_list is None: return []
    try: items = sorted(list(p.iterdir()), key=lambda e: (e.is_file(), e.name.lower()))
    except Exception as e: return []
    files = []
    filt = [e for e in items if e.name not in HIDDEN]
    for i, e in enumerate(filt):
        last = (i == len(filt) - 1)
        conn = "└── " if last else "├── "
        nxt = pref + ("    " if last else "│   ")
        if e.is_dir():
            lines_list.append(f"{pref}{conn}[DIR] {e.name}/")
            if e.name not in COLLAPSED: files.extend(tree_scan(e, r, nxt, d+1, max_d, lines_list))
        else:
            if e.suffix in IGNORED: continue
            lines_list.append(f"{pref}{conn}{e.name}")
            if e.suffix in CODE_EXT: files.append(e)
    return files

def get_sources_strings(files, r: Path):
    out = []
    t = "```"
    m = {'py':'python','js':'javascript','ts':'typescript','yml':'yaml'}
    for p in files:
        out.append(f"### File: ./{p.relative_to(r)}\n{t}{m.get(p.suffix.lstrip('.'), p.suffix.lstrip('.'))}\n{minify_file(p)}\n{t}\n")
    return out

def get_checks_string(r: Path):
    out = []
    h, pkg = r / "index.html", r / "package.json"
    if h.exists():
        c = h.read_text(encoding='utf-8', errors='ignore')
        scr = re.findall(r'<script.*src=[\'\"](.*?)[\'\"]', c)
        out.append(f"index.html context:\n- Mount Point: {'OK' if any(x in c for x in ['id=\"root\"','id=\"app\"']) else 'Missing'}\n- Entry Points: {scr if scr else 'None'}")
    if pkg.exists(): out.append("package.json detected in root.")
    return "\n".join(out)

def paginate_and_print(content_blocks):
    full_text = "\n".join(content_blocks)
    total_chars = len(full_text)
    
    chunks = []
    current_chunk = []
    current_len = 0
    
    for block in content_blocks:
        block_len = len(block) + 1
        if current_len + block_len > CHUNK_LIMIT and current_chunk:
            chunks.append("\n".join(current_chunk))
            current_chunk = [block]
            current_len = block_len
        else:
            current_chunk.append(block)
            current_len += block_len
    if current_chunk:
        chunks.append("\n".join(current_chunk))
        
    total_prompts = len(chunks)
    
    clear_screen()
    print(f"📊 METRICS: Total Payload Size is {total_chars} characters.")
    print(f"📦 DISTRIBUTION: This requires {total_prompts} separate prompt block(s).\n")
    
    for idx, chunk in enumerate(chunks, 1):
        # Added the 'q' logic here
        user_in = input(f"👉 Press ENTER to copy block [{idx}/{total_prompts}] or 'q' to quit: ").strip().lower()
        
        if user_in == 'q':
            print("\n👋 Operation cancelled. Exiting...")
            return # Exit the function cleanly
        
        # Copy to clipboard
        pyperclip.copy(chunk)
        
        clear_screen()
        print(f"✅ Block [{idx}/{total_prompts}] successfully copied to clipboard!")
        print(f"--- START PROMPT BLOCK [{idx}/{total_prompts}] ---")
        print(chunk)
        print(f"--- END PROMPT BLOCK [{idx}/{total_prompts}] ---\n")

def main():
    r = Path.cwd()
    print(f"\n--- CLIPBOARD WORKSPACE UTILITY [{r.name.upper()}] ---")
    print("1. Map & Dump Codebase (Standard Scan)")
    print("2. Tree View Architecture Map Only")
    print("3. View Minified Source Content Dump Only")
    print("4. Run Environment Sanity Checks")
    print("5. Exit")
    
    opt = input("\nSelect option (1-5): ").strip()
    if opt == '5' or opt not in {'1','2','3','4'}: sys.exit()
    
    d = 3
    if opt in {'1','2'}:
        try:
            inp = input("Depth ceiling (1-10, Default 3): ").strip()
            d = int(inp) if inp and 1 <= int(inp) <= 10 else 3
        except ValueError: pass

    clear_screen()
    payload_blocks = []

    if opt == '1':
        tree_lines = [f"[DIR] {r.name}/"]
        f = tree_scan(r, r, "", 1, d, tree_lines)
        payload_blocks.append("\n".join(tree_lines))
        if f: 
            payload_blocks.extend(get_sources_strings(f, r))
        checks = get_checks_string(r)
        if checks:
            payload_blocks.append(checks)
            
    elif opt == '2':
        tree_lines = [f"[DIR] {r.name}/"]
        tree_scan(r, r, "", 1, d, tree_lines)
        payload_blocks.append("\n".join(tree_lines))
        
    elif opt == '3':
        f = [e for e in r.rglob('*') if e.is_file() and e.suffix in CODE_EXT and not any(p in e.parts for p in HIDDEN | COLLAPSED)]
        payload_blocks.extend(get_sources_strings(f, r))
        
    elif opt == '4':
        checks = get_checks_string(r)
        if checks:
            payload_blocks.append(checks)

    if payload_blocks:
        paginate_and_print(payload_blocks)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n👋 Script interrupted by user. Exiting...")
        sys.exit(0)