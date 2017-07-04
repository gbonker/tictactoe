window.onload = function(){
  // front-end
  function boardSizes() {
    var boardHeight = (window.innerHeight - 150);
    var spaceHeight = boardHeight / 3;
    $('#tictac').css('height', boardHeight+'px');
    $('.board-space').css('height', spaceHeight+'px');
    $('.board-space').css('font-size', (spaceHeight-70)+'px');
  }
  boardSizes();

  $(window).resize(function() {
    boardSizes();
  });

  // game logic
  var letter = "X";
  var newGameButton = document.getElementById("new-game");
  newGameButton.addEventListener("click", function() {
    reset();
  });

  $(".board-space").click(function(){
      
    // place move
    if (!gameOver() && this.innerText === "") {
      $(this).text(letter);
      switchLetter();
    }
    
    // after move is placed, see if the game is over
    if (gameOver()) {
      if (someoneWon()) {
        $("#who-won").text("Game Over! " + letter + " won!");
      } else if (noOneWon()) {
        $("#who-won").text("Game Over! All spaces are filled, but no one won.");
      }
      return;
    }

  }); 



  function switchLetter() {
    if (!gameOver()) {
      if (letter === "X") {
        letter = "O";
      } else {
        letter = "X";
      }
    }
  }

  function areEqual(a,b,c){
    return (a === b && b === c && a !== "");
  }
  
  function reset() {
    $("#top-left").text("");
    $("#top-middle").text("");
    $("#top-right").text("");
    $("#middle-left").text("");
    $("#middle-middle").text("");
    $("#middle-right").text("");
    $("#bottom-left").text("");
    $("#bottom-middle").text("");
    $("#bottom-right").text("");
    $("#who-won").text("");
  }

  function someoneWon() {
    var topLeftLetter = $("#top-left").text();
    var topMiddleLetter = $("#top-middle").text();
    var topRightLetter = $("#top-right").text();
    var middleLeftLetter = $("#middle-left").text();
    var middleMiddleLetter = $("#middle-middle").text();
    var middleRightLetter = $("#middle-right").text();
    var bottomLeftLetter = $("#bottom-left").text();
    var bottomMiddleLetter = $("#bottom-middle").text();
    var bottomRightLetter = $("#bottom-right").text();
    
    return ( 
      // horizontal 3 in a row
      areEqual(topLeftLetter, topMiddleLetter, topRightLetter) ||
      areEqual(middleLeftLetter, middleMiddleLetter, middleRightLetter) ||
      areEqual(bottomLeftLetter, bottomMiddleLetter, bottomRightLetter) ||
      // vertical 3 in a row
      areEqual(topLeftLetter, middleLeftLetter, bottomLeftLetter) ||
      areEqual(topMiddleLetter, middleMiddleLetter, bottomMiddleLetter) ||
      areEqual(topRightLetter, middleRightLetter, bottomRightLetter) ||
      // diagonal 3 in a row
      areEqual(topLeftLetter, middleMiddleLetter, bottomRightLetter) ||
      areEqual(topRightLetter, middleMiddleLetter, bottomLeftLetter)
    );
  } 

  function allSpacesFilled() {
    var boardSpaces = document.getElementsByClassName("board-space");
    for (var i = 0; i < boardSpaces.length; i++) {
      if (boardSpaces[i].innerText === "") {
        return false;
      }
    }
    return true;
  }

  function noOneWon() {
    return allSpacesFilled() && !someoneWon();
  }

  function gameOver() {
    return noOneWon() || someoneWon();
  }

}