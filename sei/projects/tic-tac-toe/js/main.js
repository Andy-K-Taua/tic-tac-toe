

// step13 This is where we will be grabbing our html elements

// const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');

const cellDivs = document.querySelectorAll('.game-cell');

//These are the game variables .. continues
// let gameIsLive = true;
let status = true;
// let winner = null;


//functions step14 .. continues
const checkGamesStatus = function(player) {
  const topLeft = cellDivs[0].classList[2]
  const topMiddle = cellDivs[1].classList[2]
  const topRight = cellDivs[2].classList[2]
  const middleLeft = cellDivs[3].classList[2]
  const middleMiddle = cellDivs[4].classList[2]
  const middleRight = cellDivs[5].classList[2]
  const bottomLeft = cellDivs[6].classList[2]
  const bottomMiddle = cellDivs[7].classList[2]
  const bottomRight = cellDivs[8].classList[2]

  // console.log(topLeft, topMiddle, topRight)

const winMessage = document.querySelector("#winMessage")


//Across
  if (topLeft === player && topMiddle === player && topRight === player){
    console.log("x wins");
    winMessage.innerHTML=(`${player} wins top row`)
  }
  if (middleLeft === player && middleMiddle === player && middleRight === player){
    console.log("x wins");
    winMessage.innerHTML=(`${player} wins middle row`)
  }
  if (bottomLeft === player && bottomMiddle === player && bottomRight === player){
    console.log("x wins");
    winMessage.innerHTML=(`${player} wins bottom row`)
  }

//Down
  if (topLeft === player && middleLeft === player && bottomLeft === player){
    console.log("x wins");
    winMessage.innerHTML=(`${player} wins left column`)
  }
  if (topMiddle === player && middleMiddle === player && bottomMiddle === player){
    console.log("x wins");
    winMessage.innerHTML=(`${player} wins middle column`)
  }
  if (topRight === player && middleRight === player && bottomRight === player){
    console.log("x wins");
    winMessage.innerHTML=(`${player} wins right column`)
  }

//Diagonal from the topLeft
 if (topLeft === player && middleMiddle === player && bottomRight === player){
   console.log("x wins");
   winMessage.innerHTML=(`${player} wins diagonal`)
 }

 //Diagonal from topRight
 if (topRight === player && middleMiddle === player && bottomLeft === player){
   console.log("x wins");
   winMessage.innerHTML=(`${player} wins diagonal`)
 }
 //========================================




}; //End of check game status

//Determining the winner

//These are the event handlers

// const handleReset = (e) => {
//   console.log(e);
// };

const handleCellClick = (e) => {
  const classList = e.target.classList; //When console logging event (e) there is a 'target' attribute. Within the target attribute there is what you call a classList. This has all the classes for the element that is in question.
  const location = classList[1];

  if(classList[2] === 'x' || classList[2] === 'o'){
    return; //go through and explain what this actually does. Prevents a click from being allowed to happen in a square that is already occupied by a player
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


// These are the event listeners
// resetDiv.addEventListener('click', handleReset);

for (const cellDiv of cellDivs) {
  cellDiv.addEventListener('click', handleCellClick);
}
// This is a 'for of' loop - this will add EventListener to each of our elements. What happens is this will loop within the each of the elements within cellDivs and store it in cellDiv
