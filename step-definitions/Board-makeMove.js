// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  /*
  let clickEvent = new MouseEvent('click', { view: window, bubbles: true, cancelable: true });
  $('.board').firstChild.dispatchEvent(clickEvent);
  */

  this.Given(/^an eventlistener is added to the html element with class board$/, function () { });
  this.When(/^eventlistener calls function makeMove on click event on that html element$/, function () { });
  this.Then(/^eventlistener function call passes a variable of type integer between 0 and 6 as argument to makeMove$/, function () { });

  this.Given(/^board.playInProgress property is false upon valid move$/, function () { });
  this.Then(/^makeMove should move current players game piece through free positions in selected column calling render each time until no free position is available$/, function () { });
  this.Then(/^board.matrix property array values should be set corresponding to previous board.matrix values including this latest player move$/, function () { });
  this.Then(/^winCheck called to check for a 4-in-a-row win$/, function () { });
  this.Then(/^board.currentPlayer be set to integer 1 or 2 whichever is the next player in turn$/, function () { });
  this.Then(/^function game.tellTurn be called with board.currentPlayer as argument$/, function () { });
  this.Then(/^board.playInProgress property be set to true$/, function () { });
  this.Then(/^makeMove return true$/, function () { });

  this.Given(/^board.playInProgress property is false upon invalid move$/, function () { });
  this.When(/^there are no free positions available in selected column for more game pieces$/, function () { });
  this.Then(/^board.playInProgress property be set to false$/, function () { });
  this.Then(/^makeMove return false$/, function () { });

}