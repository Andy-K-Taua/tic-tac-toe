

// step13 This is where we will be grabbing our html elements
// const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

//These are the game variables .. continues
let gameIsLive = true;
let xIsNext = true;
let winner = null;


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
}

//Determining the winner

//These are the event handlers

// const handleReset = (e) => {
//   console.log(e);
// };

const handleCellClick = (e) => {
  const classList = e.target.classList; //When console logging event (e) I found a 'target' attribute. Within the target attribute there is what you call a classList. This has all the classes for the element that is in question.
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
// resetDiv.addEventListener('click', handleReset);

for (const cellDiv of cellDivs) {
  cellDiv.addEventListener('click', handleCellClick);
}
// This is a 'for of' loop - this will add EventListener to each of our elements. What happens is this will loop within the each of the elements within cellDivs and store it in cellDiv
