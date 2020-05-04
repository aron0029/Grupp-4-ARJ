// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {
  this.After(() => fixNoSuchWindowError(driver));

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

    // Making a winning move
    await fakeGame.board.makeMove(0);

    expect(removeEventListenerCalled).to.be.true;

  });


  this.Then(/^board removeEventListener should remove eventlistener from div html element with class \.board$/, async function () {

    // Clearing any eventlisteners from previous instances of Game and Board used in other tests
    document.body.removeChild($('.board'));
    let newBoardDiv = document.createElement('div');
    newBoardDiv.className = 'board';
    document.body.insertBefore(newBoardDiv, $('.message'));

    // Starting new game
    let realGame = new Game();

    let allDivs = [...$('.board').children];

    // Simulating click. Dropping red game piece in column 0
    allDivs[0].click();

    // Wait for makeMove to drop game piece
    let timer = 0;
    while (realGame.board.playInProgress) {
      await sleep(1); // 1ms sleep avoid overrun
      if (timer > 999) break;
      timer++;
    }

    // We expect eventlistener to have called makeMove(0)
    expect($$('.red').length).to.equal(1);

    // Filling 2 more game pieces
    realGame.board.matrix[4][0] = 1;
    realGame.board.matrix[3][0] = 1;

    // Setting red player 1
    realGame.board.currentPlayer = 1

    // Making a winning move
    await realGame.board.makeMove(0);

    // Setting yellow player 2
    realGame.board.currentPlayer = 2;

    // Simulating click. Dropping yellow game piece in column 0
    allDivs[0].click();

    // Wait for makeMove to drop game piece. But should not be called!
    timer = 0;
    while (realGame.board.playInProgress) {
      await sleep(1); // 1ms sleep avoid overrun
      if (timer > 999) break;
      timer++;
    }

    // Checking that eventlistener never called makeMove(0)
    expect($$('.yellow').length).to.equal(0);

  });

}