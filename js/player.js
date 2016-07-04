"use strict";

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  this.x = 2;
  this.y = 4;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {

};

Player.prototype.handleInput = function() {

};


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


Player.prototype.update = function(dt) {
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
  if (this.x != undefined && this.y != undefined) {
    ctx.drawImage(Resources.get(this.sprite), gameBoard.cellLocationX(this.x),
                        gameBoard.cellLocationY(this.y));
  }
}
