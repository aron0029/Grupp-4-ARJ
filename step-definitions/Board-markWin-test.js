// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  // Overrides

  let markWinWasCalled = false;
  let tellTurnPlayer = [];
  let comboType;

  class FakeGame extends Game {
    start() { this.board = new FakeBoard(this); }
    tellTurn(player) { tellTurnPlayer.push(player); }
  }

  class FakeBoard extends Board {
    markWin(combo) { markWinWasCalled = true; comboType = combo }
  }

  let board;
  let game;

  // Scenario: The game was won by a player

  this.Given(/^a player wins the game$/, function () {
    // test further down
  });

  this.Given(/^board makeMove method called board markWin method$/, async function () {
    game = new FakeGame();
    board = game.board;

    board.matrix = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0]
    ];
    await board.makeMove(0);

    expect(markWinWasCalled, 'markWin was not called').to.be.true;
  });

  this.Then(/^the argument passed to markWin method should be a type array with a length of (\d+)$/, function (four) {
    expect(Array.isArray(comboType), 'argument combo is not an array').to.be.true;
    expect(comboType.length, 'argument combo length should be 4').to.deep.equal(+four);
  });

  this.Then(/^each of the (\d+) elements of this array should be a type 'array' with (\d+) elements each containing type "([^"]*)"$/, function (arg1, arg2, arg3) {

  });

  this.Then(/^first of these (\d+) elements be set to a value between (\d+) to (\d+) and the second element be set to a value of (\d+) to (\d+)$/, function (two, zero, six, zero2, seven) {

  });

  this.Then(/^markWin should add the class \.win to html div elements that correspond to the winning rows position in board matrix$/, function () {

  });

  // Scenario: The game was a draw

  this.Given(/^the board is full without any player winning$/, function () {

  });

  this.Then(/^markWin should not be called$/, function () {

  });

}