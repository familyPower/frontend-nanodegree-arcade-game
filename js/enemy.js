"use strict";


// Enemies our player must avoid
var Enemy = function(gameBoard, x,y) {
  assert(gameBoard.constructor.name == "GameBoard");

  // local members
  this.x = x;
  this.y = y;

  // class variables and constants
  if (Enemy.gameboard == undefined) { // only set once
    Enemy.gameboard = gameBoard;
  }
  Enemy.c_MAX_ENEMY_ON_BOARD = 3;  // number of enemies allowed on the board at one time
  Enemy.countEnemiesOnBoard = 3;  // this must equal the number of Enemy initialized

  // constants
  var c_MIN_SPEED = 1;
  var c_MAX_SPEED = 4;

    // This value is initialized once per instantiation. It represents the
    // number of iterations the Enemy has to wait before moving one pixel. Thus,
    // the smaller the number the faster the object appears to move across the
    // screen.
    this.c_SPEED = randomIntFromInterval(c_MIN_SPEED, c_MAX_SPEED);;

    // Initialization function should only be executed once per instance.
    this.isInitialized = false;

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // initialize the enemy object. Should only be called once per instance.
    this.initialize = function() {
      if (Enemy.isInitialized == false) {

        this.isInitialized == true;
      }
    }


    //-------------------------------------------------
    // return true iff there is space for a nother Enemy and the current
    // enemy is not already on the GameBoard.
    this.shouldStart = function() {
      if (Enemy.countEnemiesOnBoard < Enemy.c_MAX_ENEMY_ON_BOARD && this.isOnGameboard() == false) {
        return true;
      }
      return false;
    }

    //-------------------------------------------------
    this.shouldEnterGame = function() {
      if (Enemy.countEnemiesOnBoard < Enemy.c_MAX_ENEMY_ON_BOARD && this.isOnGameboard() == false) {
        return true;
      }
      return false;
    }

    //-------------------------------------------------
    this.shouldLeaveGame = function() {
      return this.isOnGameboard() == false;  // Return true if Enemy is no longer on board.
    }

    //-------------------------------------------------
    this.enterGame = function() {
      precondition(Enemy.countEnemiesOnBoard < Enemy.c_MAX_ENEMY_ON_BOARD);

      this.x = 0;
      this.y = gameBoard.getRandomRow();
      Enemy.incrementCountEnemiesOnBoard();
    }

    //-------------------------------------------------
    this.leaveGame = function() {
      this.x = this.y = undefined;
      Enemy.decrementCountEnemiesOnBoard();
    }

    //-------------------------------------------------
    this.isOnGameboard = function() {
      var b = Enemy.gameboard.isOnGameBoard(this.x, this.y);
      if (b == false) {
        return false;
      }
      return true;
    }
    // end ams
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var shouldStart = this.shouldStart();
    if (this.isOnGameboard() == false && shouldStart == false)
      return;

    // Enemy not currently on the gameboard but is should be placed on the
    // start position on the game board.
    if (shouldStart == true) {
      this.enterGame();
      return;
    }

    // Enemy is already on the board, and its position needs to be updated.
    this.x += this.c_SPEED * dt;

    // Is the Enemy still on the gameboard after its position is updated?
    if (this.shouldLeaveGame()) {
      this.leaveGame(); // No, so remove from board.
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  if (this.x != undefined && this.y != undefined) {
    ctx.drawImage(Resources.get(this.sprite), gameBoard.cellLocationX(this.x),
                        gameBoard.cellLocationY(this.y));
  }
}

////////////////////////////////////// Class methods
////////////////////////////////////////////////////

// Increments the count of Enemy on the gameboard by 1.
Enemy.incrementCountEnemiesOnBoard = function() {
  Enemy.countEnemiesOnBoard = ++Enemy.countEnemiesOnBoard || 1;

  return Enemy.countEnemiesOnBoard;
}

// Decrements the count of Enemy on the gameboard by 1.
Enemy.decrementCountEnemiesOnBoard = function() {
  assert(Enemy.countEnemiesOnBoard > 0);

  Enemy.countEnemiesOnBoard = --Enemy.countEnemiesOnBoard;

  return Enemy.countEnemiesOnBoard;
}
