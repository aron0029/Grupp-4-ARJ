// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {

  let addEventListenerWasCalled = false;
  let fakeGame;

  // Overrides

  class FakeGame extends Game {
    start() { this.board = new FakeBoard(this); }
  }

  class FakeBoard extends Board {
    addEventListener() { addEventListenerWasCalled = true; }
  }

  // Scenario: addEventListener should be called in Board constructor

  this.When(/^a new Board is created for a new Game$/, function () {

    fakeGame = new FakeGame();

  });

  this.Then(/^Board constructor should call addEventListener method$/, function () {

    expect(addEventListenerWasCalled, 'addEventListener was not called by Board constructor').to.be.true;

  });
}