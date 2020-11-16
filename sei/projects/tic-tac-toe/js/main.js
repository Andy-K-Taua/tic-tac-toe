//This is where we will be grabbing our html elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

//These are the game variables
let gameIsLive = true;
let xIsNext = true;
let winner = null;


//functions


const checkGamesStatus = () => {
  const topLeft = cellDivs[0].classList[2]
  const topMiddle = cellDivs[1].classList[2]
  const topRight = cellDivs[2].classList[2]
  const middleLeft = cellDivs[3].classList[2]
  const middleMiddle = cellDivs[4].classList[2]
  const middleRight = cellDivs[5].classList[2]
  const bottomLeft = cellDivs[6].classList[2]
  const bottomMiddle = cellDivs[7].classList[2]
  const bottomRight = cellDivs[8].classList[2]

  // console.log(topLeft, topMiddle, topRight, middleLeft, middleMiddle, middleRight, bottomLeft, bottomMiddle, bottomRight)

//Determining winner
  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    handleWin (topLeft);
  } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight){
    handleWin(middleLeft);
  } else if (bottomLeft && bottomLeft === bottomRight){
    handleWin(bottomLeft)
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft){
    handleWin(topleft)
  }
};

//These are the event handlers
const handleReset = (e) => {s
  console.log(e);
};

const handleCellClick = (e) => {
  const classList = e.target.classList;
  const location = classList[1];

  if(classList[2] === 'x' || classList[2] === 'o'){
    return;
  }

  if (xIsNext){
    classList.add('x');
    checkGamesStatus();

    xIsNext = !xIsNext;
  } else {
    classList.add('o');
    checkGamesStatus();

    xIsNext = !xIsNext;
  }
};


// These are the event listeners
resetDiv.addEventListener('click', handleReset);

for (const cellDiv of cellDivs) {
  cellDiv.addEventListener('click', handleCellClick)
}
