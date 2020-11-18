

// step13 This is where we will be grabbing our html elements

// const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');

const cellDivs = document.querySelectorAll('.game-cell');

//These are the game variables .. continues
// let gameIsLive = true;
let status = true;
// let winner = null;


//functions step14 .. continues

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
  console.log(topLeft, topMiddle, topRight)
const winMessage = document.querySelector("#winMessage")
//Across
  if (topLeft === "x" && topMiddle === "x" && topRight === "x"){
    console.log("x wins");
    winMessage.innerHTML="x wins on top row";
  }
  if (middleLeft === "x" && middleMiddle === "x" && middleRight === "x"){
    console.log("x wins");
  }
  if (bottomLeft === "x" && bottomMiddle === "x" && bottomRight === "x"){
    console.log("x wins");
  }

//Down
  if (topLeft === "x" && middleLeft === "x" && bottomLeft === "x"){
    console.log("x wins");
  }
  if (topMiddle === "x" && middleMiddle === "x" && bottomMiddle === "x"){
    console.log("x wins");
  }
  if (topRight === "x" && middleRight === "x" && bottomRight === "x"){
    console.log("x wins");
  }

//Diagonal from the topLeft
 if (topLeft === "x" && middleMiddle === "x" && bottomRight === "x"){
   console.log("x wins");
 }

 //Diagonal from topRight
 if (topRight === "x" && middleMiddle === "x" && bottomLeft === "x"){
   console.log("x wins");
 }
 //========================================

 //Across
 if (topLeft === "o" && topMiddle === "o" && topRight === "o"){
   console.log("o wins");
 }
 if (middleLeft === "x" && middleMiddle === "o" && middleRight === "o"){
   console.log("o wins");
 }
 if (bottomLeft === "x" && bottomMiddle === "o" && bottomRight === "o"){
   console.log("o wins");
 }

//Down
 if (topLeft === "o" && middleLeft === "o" && bottomLeft === "o"){
   console.log("o wins");
 }
 if (topMiddle === "o" && middleMiddle === "o" && bottomMiddle === "o"){
   console.log("o wins");
 }
 if (topRight === "o" && middleRight === "o" && bottomRight === "o"){
   console.log("o wins");
 }

//Diagonal from the topLeft
if (topLeft === "o" && middleMiddle === "o" && bottomRight === "o"){
  console.log("o wins");
}

//Diagonal from topRight
if (topRight === "o" && middleMiddle === "o" && bottomLeft === "o"){
  console.log("o wins");
}


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
    checkGamesStatus();

    status = !status;
  } else {
    classList.add('o');
    checkGamesStatus();

    status = !status;
  }
};


// These are the event listeners
// resetDiv.addEventListener('click', handleReset);

for (const cellDiv of cellDivs) {
  cellDiv.addEventListener('click', handleCellClick);
}
// This is a 'for of' loop - this will add EventListener to each of our elements. What happens is this will loop within the each of the elements within cellDivs and store it in cellDiv
