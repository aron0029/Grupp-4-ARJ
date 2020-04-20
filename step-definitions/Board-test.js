// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let board;
  let game;

  this.When(/^a new Board is created$/, function () {
    game = new Game();
    board = new Board(game);

  });

  this.Then(/^game should be an instance of Game$/, function () {
    expect(board.game).to.be.an.instanceof(Game,
      'game must be an instance of Game'
    );
  });

  this.Then(/^all Board positions should have a value of (\d+)$/, function (value) {
    expect(board.matrix).to.deep.equal([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ],
      'game board value not set correctly'
    );
  });

  this.Then(/^currentPlayer set to (\d+)$/, function (value) {
    expect(board.currentPlayer).to.deep.equal(1,
      'currentPlayer not set to player 1'
    );
  });

  this.Then(/^playInProgress set to false$/, function () {
    expect(board.playInProgress).to.deep.equal(false,
      'playInProgress not set to false'
    );
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