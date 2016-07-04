"use strict";


// Now instantiate your objects.

// create the game board.
var gameBoard = new GameBoard();

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Enemy.countEnemiesOnBoard must be updated to reflect the number of
// place on the gameboard.
// All Enemy must be initalized with the GameBoard.
var allEnemies = [
  new Enemy(gameBoard, 3, 2),
  new Enemy(gameBoard, 0, 1),
  new Enemy(gameBoard, 1, 3),
  new Enemy(gameBoard)
];

// create the Player
var player = new Player();
