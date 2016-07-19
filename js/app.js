"use strict";

// Now instantiate your objects.

// create the game board.
var gameboard = new GameBoard();

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Enemy.countEnemiesOnBoard must be updated to reflect the number of
// place on the gameboard.
// All Enemy must be initalized with the GameBoard.
var allEnemies = [
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy()
];

// create the Player
var player = new Player();


/////////////////////// Menu
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction(ele) {
    document.getElementById(ele).classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
