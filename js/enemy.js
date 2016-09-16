"use strict";


/**
 * @file This file contains the Enemy class. These are the objects that the
 * Player object must avoid.
 *
*/

/**
 * @class Enemy
 * @classdesc Moves across the screen remaining in the row the piece starts in.
 * The Player is sent back to the beginning when Enemy collides with it.
 * @param: None.
*/
var Enemy = function() {
  assert(gameboard.constructor.name == "GameBoard");

  /**
   * @constant [<type> <name>]
  */
  Enemy.c_MAX_ENEMY_ON_BOARD = 3;  // number of enemies allowed on the board at one time

  /**
   * @constant [<type> <name>]
   * @static
  */
  var c_MAX_SPEED = 4;

  /**
   * @constant [<type> <name>]
   * @static
  */
  var c_MIN_SPEED = 1;

  /////////////////// local members
  // Position on game board.
  /**
   * @member {integer} x
   * @private
   * @description The x-axis on the gameboard.
  */
  var _x;
  /**
   * @function getX
   * @param None.
   * @description Getter, returns x.
  */
  this.getX = function() {
    return _x;
  }

  /**
   * @function setX
   * @param None.
   * @description Setter, sets x.
  */
  this.setX = function(newX) {
    assert(true == isNumber(newX) || true == this.isOnGameboardXY(newX, 0),
      "Invalid 'x' value");

    _x = newX;
  }

  /**
   * @function resetX
   * @param None.
   * @description sets _x to undefined
  */
  this.resetX = function() {
    _x = undefined;
  }

  /**
   * @member {integer} y
   * @private
   * @description The y-axis on the game board.
  */
  var _y;  // initialized to undefined
  /**
   * @function getY
   * @protected
   * @param None.
   * @description Getter, returns y.
  */
  this.getY = function() {
    return _y;
  }

  /**
   * @function setY
   * @protected
   * @param None.
   * @description Setter, sets y.
  */
  this.setY = function(newY) {
    assert(true == isNumber(newY) || false == this.isOnGameboardXY(0, newY),
        "Invalid 'y' value");

    _y = newY;
  }

  /**
   * @function resetY
   * @param None.
   * @description sets _y to undefined
  */
  this.resetY = function() {
    _y = undefined;
  }

  /**
   * @member {integer} speed
   * @protected
   * @private
   * @description The y-axis on the game board.
   *  How fast does this Enemy move.
   *  This value is initialized once per instantiation. It represents the
   *  number of iterations the Enemy has to wait before moving one pixel. Thus,
   *  the smaller the number the faster the object appears to move across the
   *  screen.

  */
  var _speed;  // initialized to undefined

  /**
   * @function getSpeed
   * @protected
   * @param None.
   * @description Getter, returns speed.
  */
  this.getSpeed = function() {
    return _speed;
  }

  /**
   * @function setSpeed
   * @protected
   * @param None.
   * @description Setter, sets speed.
  */
  this.setSpeed = function(newSpeed) {
    assert(true == isNumber(newSpeed), 'newSpeed Is not a number');
    assert(newSpeed >= c_MIN_SPEED && newSpeed <= c_MAX_SPEED, 'newSpeed out of range');

    _speed = newSpeed;
  }

  /**
   * @section Object specific functions.
  */

  /**
   * @function
   * @protected
   * @param None.
   * @description
  */
  this.newRandomSpeed = function() {
    // Speed is set if Enemy not on game board.
    if (false == this.isOnGameboard()) {
      return randomIntFromInterval(c_MIN_SPEED, c_MAX_SPEED);
    }
  }

  /**
   * @function shouldStart
   * @protected
   * @param None.
   * @description Return true iff there is space for a nother Enemy and the
   * current enemy is not already on the GameBoard.
  */
  this.shouldStart = function() {
    if ((Enemy.countEnemiesOnBoard == undefined || Enemy.countEnemiesOnBoard < Enemy.c_MAX_ENEMY_ON_BOARD) && this.isOnGameboard() == false) {
      return true;
    }
    return false;
  }

  /**
   * @function
   * @protected
   * @param None.
   * @description
  */
  this.shouldEnterGame = function() {
    if (Enemy.countEnemiesOnBoard < Enemy.c_MAX_ENEMY_ON_BOARD &&
      false == this.isOnGameboard()) {
      return true;
    }
    return false;
  }

  /**
   * @function
   * @protected
   * @param None.
   * @description
  */
  this.shouldLeaveGame = function() {
    return this.isOnGameboard() == false;  // Return true if Enemy is no longer on board.
  }

  /**
   * @function enterGame
   * @protected
   * @param None.
   * @description
  */
  this.enterGame = function(x, y) {
    precondition(Enemy.countEnemiesOnBoard == undefined || Enemy.countEnemiesOnBoard < Enemy.c_MAX_ENEMY_ON_BOARD);

    if (false == isNumber(x) || false == isNumber(y)) {
      this.setSpeed(this.newRandomSpeed());  // Give the enemy a new random speed.

      this.setX(0);
      var y = gameboard.getRandomRow();
      this.setY(y);

//      console.log(y);
    } else {
      this.setX(x);
      this.setY(y);
    }
    Enemy.incrementCountEnemiesOnBoard();
  }

  /**
   * @function
   * @param None.
   * @description
  */
  this.leaveGame = function() {
    this.resetX();
    this.resetY();
    Enemy.decrementCountEnemiesOnBoard();
  }

  /**
   * @function
   * @param None.
   * @description
  */
  this.isOnGameboard = function() {
    var b = this.isOnGameboardXY(this.getX(), this.getY());
    if (b == false) {
      return false;
    }
    return true;
  }

  /**
  * @function
  * @param None.
  * @description
  */
  this.isOnGameboardXY = function(x, y) {
    if(true == isNumber(x) && true == isNumber(y)) {
      return Enemy.gameboard.isOnGameboard(x, y);
    }

    return false;
  }

  /**
   * @section
   *
  */
  /***
    * Initialize this object.
    *
  */

  // class variables and constants
  /**
   * @member {GameBoard} Enemy.gameboard
   * @private
   * @description A reference to the GameBoard.
   * @todo Consider having the reference passed in as parameter to the
   *        constructor.
  */
  if (Enemy.gameboard == undefined) { // only set once
    Enemy.gameboard = gameboard;
  }
  if (false == isNumber(Enemy.countEnemiesOnBoard)) {
    Enemy.countEnemiesOnBoard = 0;  // this must equal the number of Enemy initialized
  }

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';

  if (this.shouldEnterGame()) {
    this.setSpeed(this.newRandomSpeed());
    this.setX(randomIntFromInterval(GameBoard.c_ENEMY_SAFE_COLS_RANGE.firstCol,
      GameBoard.c_ENEMY_SAFE_COLS_RANGE.lastCol)),
    this.setY(randomIntFromInterval(GameBoard.c_ENEMY_SAFE_ROWS_RANGE.firstRow,
      GameBoard.c_ENEMY_SAFE_ROWS_RANGE.lastRow))

    Enemy.incrementCountEnemiesOnBoard();

  } else {
    _x = undefined;
    _y = undefined;
    _speed = undefined;
  }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
/**
 * @function update
 * @public
 * @description Updates the Enemy's current position on the board.
 * @param: {float} dt - The elapsed time since the last move (usually a very
 * small number, less than one). The Enemy's speed is multiplied by this value
 * to determine the game distance the Enemy moved.
*/
// Enemy.prototype.getX = function() {
//   return _x;
// }
//
// Enemy.prototype.getY = function() {
//   return _y;
// }

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
    this.setX(this.getSpeed() * dt + this.getX());
    //console.log(dt, this.getSpeed(), this.getSpeed() * dt) + this.getX();

    // Is the Enemy still on the gameboard after its position is updated?
    if (this.shouldLeaveGame()) {
      this.leaveGame(); // No, so remove from board.
    }
};

/**
 * @function render
 * @static
 * @param None.
 * @description Calls the context's drawImage function to draw the Enemy on the
 * board. The Enemy's x,y locations and image is passed to the context.
 * @param: None.
*/
Enemy.prototype.render = function() {
  var x = this.getX();
  var y = this.getY();
//console.log('y=' + y);

  if (true == isNumber(x) && true == isNumber(y)) {
    //   ctx.drawImage(Resources.get(this.sprite), x, y);
    //console.log(x, gameboard.cellLocationX(this.getX()), y, gameboard.cellLocationX(this.getY()));
       ctx.drawImage(Resources.get(this.sprite), gameboard.cellLocationX(x),
                           gameboard.cellLocationY(y));
  }


  // ctx.drawImage(Resources.get(this.sprite), gameboard.cellLocationX(this.getX()),
  //                       gameboard.cellLocationY(this.getY()));
}

////////////////////////////////////////////////////
////////////////////////////////////// Class methods
////////////////////////////////////////////////////

/**
  * @function incrementCountEnemiesOnBoard
  * @static
  * @description Static method that increaments the static counter tracking the
  * number of Enemy object currently on the gameboard.
  * @param: None.
*/
Enemy.incrementCountEnemiesOnBoard = function() {
  Enemy.countEnemiesOnBoard = ++Enemy.countEnemiesOnBoard || 1;

  assert(Enemy.countEnemiesOnBoard <= Enemy.c_MAX_ENEMY_ON_BOARD);

  return Enemy.countEnemiesOnBoard;
}

/**
  * @function decrementCountEnemiesOnBoard
  * @static
  * @description Static method that decrements the static counter tracking the
  * number of Enemy object currently on the gameboard.
  * @param: None.
*/
Enemy.decrementCountEnemiesOnBoard = function() {
  precondition(Enemy.countEnemiesOnBoard > 0);

  Enemy.countEnemiesOnBoard = --Enemy.countEnemiesOnBoard;

  return Enemy.countEnemiesOnBoard;
}
