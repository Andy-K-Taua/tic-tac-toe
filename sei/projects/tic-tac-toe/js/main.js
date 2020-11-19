
const resetDiv = document.querySelector('.reset');

// const cellDivs = document.querySelectorAll('.game-cell');
const $cellDivs = $('.game-cell');

let status = true;

const checkGamesStatus = function(player) {
  const topLeft = $cellDivs.eq(0).hasClass(player)
  const topMiddle = $cellDivs.eq(1).hasClass(player)
  const topRight = $cellDivs.eq(2).hasClass(player)
  const middleLeft = $cellDivs.eq(3).hasClass(player)
  const middleMiddle = $cellDivs.eq(4).hasClass(player)
  const middleRight = $cellDivs.eq(5).hasClass(player)
  const bottomLeft = $cellDivs.eq(6).hasClass(player)
  const bottomMiddle = $cellDivs.eq(7).hasClass(player)
  const bottomRight = $cellDivs.eq(8).hasClass(player)

const $winMessage = $("#winMessage");

//================== Across

  if (topLeft && topMiddle && topRight){
    console.log(`${player} wins`);
    winMessage.innerHTML=(`${player} wins top row`)
  }
  if (middleLeft && middleMiddle && middleRight){
    console.log(`${player} wins`);
    winMessage.innerHTML=(`${player} wins middle row`)
  }
  if (bottomLeft && bottomMiddle && bottomRight){
    console.log(`${player} wins`);
    winMessage.innerHTML=(`${player} wins bottom row`)
  }

//=================== Down

  if (topLeft && middleLeft && bottomLeft){
    console.log(`${player} wins`);
    winMessage.innerHTML = `${player} wins left column`;
  }
  if (topMiddle && middleMiddle && bottomMiddle){
    console.log(`${player} wins`);
    winMessage.innerHTML=(`${player} wins middle column`)
  }
  if (topRight && middleRight && bottomRight){
    console.log(`${player} wins`);
    winMessage.innerHTML=(`${player} wins right column`)
  }

//========== Diagonal from the topLeft

 if (topLeft && middleMiddle && bottomRight){
   console.log(`${player} wins`);
   winMessage.innerHTML=(`${player} wins diagonal`)
 }

 // ========== Diagonal from topRight

 if (topRight && middleMiddle && bottomLeft){
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

for (const cellDiv of $cellDivs) {
  cellDiv.addEventListener('click', handleCellClick);

}
// This is a 'for of' loop - this will add EventListener to each of our elements. What happens is this will loop within the each of the elements within cellDivs and store it in cellDiv
