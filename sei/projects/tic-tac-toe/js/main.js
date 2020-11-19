

const $cellDivs = $('.game-cell');

let currentPlayer = "x"
let xWins = 0;
let oWins = 0;
let numClicks = 0;

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
    $("#winMessage").html(`${player} wins top row`)
    return true;
  }
  if (middleLeft && middleMiddle && middleRight){
    console.log(`${player} wins`);
    $("#winMessage").html(`${player} wins middle row`)
    return true;
  }
  if (bottomLeft && bottomMiddle && bottomRight){
    console.log(`${player} wins`);
    $("#winMessage").html(`${player} wins bottom row`)
    return true;
  }

//=================== Down

  if (topLeft && middleLeft && bottomLeft){
    console.log(`${player} wins`);
    $("#winMessage").html(`${player} wins left column`)
    return true;
  }
  if (topMiddle && middleMiddle && bottomMiddle){
    console.log(`${player} wins`);
    $("#winMessage").html(`${player} wins middle column`)
    return true;
  }
  if (topRight && middleRight && bottomRight){
    console.log(`${player} wins`);
    $("#winMessage").html(`${player} wins right column`)
    return true;
  }

//========== Diagonal from the topLeft

 if (topLeft && middleMiddle && bottomRight){
   console.log(`${player} wins`);
   $("#winMessage").html(`${player} wins diagonal`)
   return true;
 }

 // ========== Diagonal from topRight

 if (topRight && middleMiddle && bottomLeft){
   console.log(`${player} wins`);
   $("#winMessage").html(`${player} wins diagonal`)
   return true;
 }

 if(numClicks === 9){
   $("#winMessage").html(`Draw`)

 }

 return false; // We will only get here if no win was found

}; //End of checkGamesStatus function


$("#resetButton").on("click", function (){
  $cellDivs.removeClass('x o');
  numClicks = 0;
});

$cellDivs.on("click", function (){

  //check if the clicked square is occupied and if it is we can ignore the click

  if( $(this).hasClass('x')  || $(this).hasClass('o') ){
    return; //this means to leave the function before it has the chance to process the click
  }

  numClicks++;

  if ( currentPlayer === 'x'){
    // It is xs turn
    $(this).addClass('x');
    const isWin = checkGamesStatus('x');
    if ( isWin ){
      xWins++;
      $("#xWins").html(`x total: ${xWins}`)
    }
    currentPlayer = 'o'; // Switch back to the other player

    } else {
    // It is os turn
    $(this).addClass('o');
    const isWin = checkGamesStatus('o');
    if ( isWin ){
      oWins++;
      $("#oWins").html(`o total: ${oWins}`)
    }

    currentPlayer ='x'; // Switch back to the other player
  }
}); //End of click handler
