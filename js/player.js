"use strict";

/**
 * @file
 *
*/

/**
 * @class
 * @classdesc
  * @param: None.
*/

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

/**
 * @function
 * @param None.
 * @description
 */
var Player = function() {
  this.x = 2;
  this.y = 4;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/char-boy.png';

  /**
   * @function
   * @param None.
   * @description
   */
this.moveLeft = function() {
    if (gameboard.isOnGameboard(this.x-1, this.y)) {
      this.x-=1;
    }
  }

  /**
   * @function
   * @param None.
   * @description
   */
this.moveRight = function() {
    if (gameboard.isOnGameboard(this.x+1, this.y)) {
      this.x+=1;
    }

  }

  /**
   * @function
   * @param None.
   * @description
   */
this.moveUp = function() {
    if (gameboard.isOnGameboard(this.x, this.y-1)) {
      this.y-=1;
    }

  }

  /**
   * @function
   * @param None.
   * @description
   */
this.moveDown = function() {
    if (gameboard.isOnGameboard(this.x, this.y+1)) {
      this.y+=1;
    }

  }

};  // End class

/**
 * @function
 * @param None.
 * @description
 */
Player.prototype.update = function() {

};

/**
 * @function
 * @param None.
 * @description
 */
Player.prototype.render = function() {
  if (this.x != undefined && this.y != undefined) {
    ctx.drawImage(Resources.get(this.sprite), gameboard.cellLocationX(this.x),
                        gameboard.cellLocationY(this.y));
  }

};

/**
 * @function
 * @param None.
 * @description
 */
Player.prototype.handleInput = function(e) {
  switch (e) {
    case 'left':
      this.moveLeft();
    break;
    case 'right':
      this.moveRight();
    break;
    case 'up':
      this.moveUp();
    break;
    case 'down':
      this.moveDown();
    break;

    //default:

  }
};

/**
 * @function
 * @param None.
 * @description
 */
Player.prototype.restart = function() {
  var x = randomIntFromInterval(GameBoard.c_PLAYER_SAFE_COLS_RANGE.firstCol,
    GameBoard.c_PLAYER_SAFE_COLS_RANGE.lastCol
  );
  var y = randomIntFromInterval(GameBoard.c_PLAYER_SAFE_ROWS_RANGE.firstRow,
    GameBoard.c_PLAYER_SAFE_ROWS_RANGE.lastRow);
  this.x = x;
  this.y = y;
};

/**
 * @function
 * @param None.
 * @description
 */
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
