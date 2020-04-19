// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  // Test Board-constructur
  let board;
  let game;

  this.When(/^a new Board is created$/, function () {

    // Test if game is an instance of Game
    game = new Game();
    board = new Board(game);
    expect(board.game).to.be.an.instanceof(Game,
      'game must be an instance of Game'
    );
  });

  this.Then(/^the Board should be empty$/, function () {

  });

  this.Then(/^all Board positions should have a value of (\d+)$/, function (arg1) {

  });

  this.Given(/^that a new Board of type Board is passed to Game$/, function () {

  });

  this.When(/^a new Game is created$/, function () {

  });

  this.Then(/^the value of Game input argument game should be set to that Board$/, function () {

  });

  this.Then(/^the value of Game property matrix be set to an array consisting of (\d+) x (\d+) elements each with a value set to (\d+)$/, function (arg1, arg2, arg3) {

  });

  this.Then(/^Game tellTurn\(\) be called using currentPlayer property with value (\d+) as input argument$/, function (arg1) {

  });

  this.Then(/^the value of Game property playInProgress set to false$/, function () {

  });

}