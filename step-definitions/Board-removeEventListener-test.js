// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {

  let removeEventListenerCalled = false;

  class FakeGame extends Game {
    start() { this.board = new FakeBoard(this); }
  }

  class FakeBoard extends Board {
    removeEventListener() { removeEventListenerCalled = true; }
  }

  let fakeGame = new FakeGame();


  /* ---------------------------------------------------------------------------------------------- */
  /* ---------- Scenario: When game ha ended and board eventlistener is no longer needed ---------- */
  /* ---------------------------------------------------------------------------------------------- */

  this.Given(/^that board makeMove called board removeEventListener method$/, async function () {

    fakeGame.board.matrix[5][0] = 1;
    fakeGame.board.matrix[4][0] = 1;
    fakeGame.board.matrix[3][0] = 1;

    //$('.board').firstChild.click();

    // Making a winning move
    await fakeGame.board.makeMove(0);

    expect(removeEventListenerCalled).to.be.true;

  });


  this.Then(/^board removeEventListener should remove eventlistener from div html element with class \.board$/, function () {



  });

}