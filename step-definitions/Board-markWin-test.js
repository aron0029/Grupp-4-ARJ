// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  // Overrides

  let markWinWasCalled = false;

  class fakeGame extends Game {

  }

  class fakeBoard extends Board {
    markWin() { markWinWasCalled = true; }
  }

  let board;
  let game;

  // Scenario: The game was won by a player

  this.Given(/^a player wins the game$/, function () {
    // test further down
  });

  this.Given(/^board makeMove method called board markWin method$/, function () {
    game = new fakeGame();
    board = game.board;

    board.matrix = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0]
    ];

    board.makeMove(0);

    console.log('playInProgress: ', board.playInProgress)
    console.log('currentPlayer: ', board.currentPlayer)
    console.log('makeMove: ', board.makeMove(0))
    console.log('winCheck: ', board.winCheck())
    console.log('playInProgress: ', board.playInProgress)

    expect(markWinWasCalled, 'markWin was not called').to.be.true;
  });

  this.Then(/^the argument passed by board makeMove method should be a type "([^"]*)" with a length of (\d+)$/, function (array, four) {

  });

  this.Then(/^each of the (\d+) elements of this array should be a type "([^"]*)" with (\d+) elements each containing type "([^"]*)"$/, function (four, array, two, numbers) {

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