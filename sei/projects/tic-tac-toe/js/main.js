
const resetDiv = document.querySelector('.reset');

const cellDivs = document.querySelectorAll('.game-cell');
const $cellDivs = $('.game-cell');

let status = true;

const checkGamesStatus = function(player) {
  const topLeft = $cellDivs.eq(0).hasClass(player)
  const topMiddle = cellDivs[1].classList[2]
  const topRight = cellDivs[2].classList[2]
  const middleLeft = cellDivs[3].classList[2]
  const middleMiddle = cellDivs[4].classList[2]
  const middleRight = cellDivs[5].classList[2]
  const bottomLeft = cellDivs[6].classList[2]
  const bottomMiddle = cellDivs[7].classList[2]
  const bottomRight = cellDivs[8].classList[2]

const winMessage = document.querySelector("#winMessage")

//================== Across

  if (topLeft && topMiddle && topRight){
    console.log(`${player} wins`);
    winMessage.innerHTML=(`${player} wins top row`)
  }
  if (middleLeft === player && middleMiddle === player && middleRight === player){
    console.log(`${player} wins`);
    winMessage.innerHTML=(`${player} wins middle row`)
  }
  if (bottomLeft === player && bottomMiddle === player && bottomRight === player){
    console.log(`${player} wins`);
    winMessage.innerHTML=(`${player} wins bottom row`)
  }

//=================== Down

  if (topLeft === player && middleLeft === player && bottomLeft === player){
    console.log(`${player} wins`);
    winMessage.innerHTML = `${player} wins left column`;
  }
  if (topMiddle === player && middleMiddle === player && bottomMiddle === player){
    console.log(`${player} wins`);
    winMessage.innerHTML=(`${player} wins middle column`)
  }
  if (topRight === player && middleRight === player && bottomRight === player){
    console.log(`${player} wins`);
    winMessage.innerHTML=(`${player} wins right column`)
  }

//========== Diagonal from the topLeft

 if (topLeft === player && middleMiddle === player && bottomRight === player){
   console.log(`${player} wins`);
   winMessage.innerHTML=(`${player} wins diagonal`)
 }

 // ========== Diagonal from topRight

 if (topRight === player && middleMiddle === player && bottomLeft === player){
   console.log(`${player} wins`);
   winMessage.innerHTML=(`${player} wins diagonal`)
 }

};

const handleCellClick = (e) => {

  const classList = e.target.classList;
  const location = classList[1];

  if(classList[2] === 'x' || classList[2] === 'o'){
    return;
  }

  if (status){
    classList.add('x');
    checkGamesStatus('x');

    status = !status;
  } else {
    classList.add('o');
    checkGamesStatus('o');

    status = !status;
  }
};

// ========== These are the event listeners

// resetDiv.addEventListener('click', handleReset);

for (const cellDiv of cellDivs) {
  cellDiv.addEventListener('click', handleCellClick);
  console.log(cellDiv);
}
// This is a 'for of' loop - this will add EventListener to each of our elements. What happens is this will loop within the each of the elements within cellDivs and store it in cellDiv
