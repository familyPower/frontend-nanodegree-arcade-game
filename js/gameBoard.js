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
var GameBoard = function() {

  /**
   * @function
   * @param None.
   * @description
  */
  GameBoard.cvtDisplayCoordToGameboardCoord = function(x,y) {
    var newX = x *  GameBoard.c_CELL_WIDTH;
    var newY = y * GameBoard.c_CELL_HEIGHT;

    return {x:newX, y:newY};
  }
};

GameBoard.rowImages = [
        'images/water-block.png',   // Top row is water
        'images/stone-block.png',   // Row 1 of 3 of stone
        'images/stone-block.png',   // Row 2 of 3 of stone
        'images/stone-block.png',   // Row 3 of 3 of stone
        'images/grass-block.png',   // Row 1 of 2 of grass
        'images/grass-block.png'    // Row 2 of 2 of grass
    ],

GameBoard.c_NUM_COLS = 5;
GameBoard.c_NUM_ROWS = 6;
GameBoard.c_CELL_WIDTH = 101;
GameBoard.c_CELL_HEIGHT = 83;
GameBoard.c_PLAYER_SAFE_ROWS_RANGE = {firstRow:4, lastRow:GameBoard.c_NUM_ROWS-1};
GameBoard.c_PLAYER_SAFE_COLS_RANGE = {firstCol:0, lastCol:GameBoard.c_NUM_COLS-1};
GameBoard.c_ENEMY_SAFE_ROWS_RANGE = {firstRow:1, lastRow:3};
GameBoard.c_ENEMY_SAFE_COLS_RANGE = {firstCol:0, lastCol:GameBoard.c_NUM_COLS-1};

/**
 * @function
 * @param None.
 * @description
*/
GameBoard.prototype.render = function() {
  /* Loop through the number of rows and columns we've defined above
   * and, using the rowImages array, draw the correct image for that
   * portion of the "grid"
   */

   var boardRow,
      boardCol;

  // Where to start drawing images.
  var xBase = 100;
  var yBase = 100;

  for (var row = 0; row < GameBoard.c_NUM_ROWS; row++) {
      for (var col = 0; col < GameBoard.c_NUM_COLS; col++) {
          /* The drawImage function of the canvas' context element
           * requires 3 parameters: the image to draw, the x coordinate
           * to start drawing and the y coordinate to start drawing.
           * We're using our Resources helpers to refer to our images
           * so that we get the benefits of caching these images, since
           * we're using them over and over.
           */

          // center the gameboard
          // ctx.translate(xBase + (GameBoard.c_CELL_WIDTH * col), yBase +
          //     (GameBoard.c_CELL_HEIGHT * row));
          ctx.drawImage(Resources.get(GameBoard.rowImages[row]), col *
              GameBoard.c_CELL_WIDTH, row *
              GameBoard.c_CELL_HEIGHT);
      }
  }
}

/**
 * @function
 * @param None.
 * @description
*/
GameBoard.prototype.cellLocationX = function (x) {
  return x * GameBoard.c_CELL_WIDTH;
};

/**
 * @function
 * @param None.
 * @description
*/
GameBoard.prototype.cellLocationY = function (y) {
  return y * GameBoard.c_CELL_HEIGHT - 20; // the constant 20 compensates for
                                         // the part of the image that is
                                         // covered by the image below it.

};

/**
 * @function
 * @param None.
 * @description
*/
GameBoard.prototype.getRandomRow = function() {
  return randomIntFromInterval(1, GameBoard.c_NUM_ROWS-3);  // What row to put the new piece
}

/**
 * @function
 * @param None.
 * @description
*/
// Returns false if x or y is out of bounds
GameBoard.prototype.isOnGameboard = function(x, y) {
  if (false == isNumber(x) || x < 0 || x >= GameBoard.c_NUM_COLS ||
          false == isNumber(y) || y < 0 || y >= GameBoard.c_NUM_ROWS) {
    return false;
  }
  return true;
}

/**
 * @function
 * @param None.
 * @description
*/
// Test for collision between player and enemy.
GameBoard.prototype.collisionDetected = function (player, enemy) {
  // Verify the player and enemy are on the game board.
  if (false == this.isOnGameboard(enemy.x, enemy.y) || false == this.isOnGameboard(player.x, player.y)) {
    return false;
  }
  return ((player.x == Math.round(enemy.x)) && (player.y == enemy.y));
}

/**
 * @function
 * @param None.
 * @description
*/
// returns true iff game coordinate is in the water.
GameBoard.prototype.isEntityInWater = function(coord) {
  return coord.y == 0;
}
