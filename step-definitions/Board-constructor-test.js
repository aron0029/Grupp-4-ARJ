// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  // Override

  let renderIsCalled = false;
  let addEventListenerIsCalled = false;
  let tellTurnIsCalled = false;
  let tellTurnPlayer = false;

  class fakeGame extends Game {
    start() {
      this.board = new fakeBoard(this);
    }

    tellTurn(player) {
      tellTurnIsCalled = true;
      if (player === 1 || player === 2) {
        tellTurnPlayer = true;
      }
    }

  }

  class fakeBoard extends Board {
    render() {
      renderIsCalled = true;
    }

    addEventListener() {
      addEventListenerIsCalled = true;
    }

  }

  let board;
  let game;

  this.When(/^a new Board is created$/, function () {
    game = new fakeGame();
    board = game.board;

  });

  this.Then(/^game should be an instance of Game$/, function () {
    expect(board.game).to.be.an.instanceof(Game,
      'game must be an instance of Game'
    );

  });

  this.Then(/^if game is not an instance of Game, it should throw error 'game must be an instance of Game'$/, function () {
    expect(() => new Board({})).to.throw(
      Error,
      'game must be an instance of Game',
      'Game constructor is not throwing correct error'
    );
  });

  this.Then(/^all Board positions should have a value of (\d+)$/, function (value) {
    value = +value;
    expect(board.matrix).to.deep.equal([
      [value, value, value, value, value, value, value],
      [value, value, value, value, value, value, value],
      [value, value, value, value, value, value, value],
      [value, value, value, value, value, value, value],
      [value, value, value, value, value, value, value],
      [value, value, value, value, value, value, value]
    ],
      'game board value not set correctly'
    );
  });

  this.Then(/^currentPlayer set to (\d+)$/, function (value) {
    value = +value;
    expect(board.currentPlayer).to.deep.equal(value,
      'currentPlayer not set to player 1'
    );
  });

  this.Then(/^playInProgress set to false$/, function () {
    expect(board.playInProgress).to.be.false;
  });

  this.Then(/^call method addEventListener$/, function () {
    expect(addEventListenerIsCalled).to.be.true;
  });

  this.Then(/^call method render$/, function () {
    expect(renderIsCalled).to.be.true;
  });

  this.Then(/^call method tellTurn from game with argument currentPlayer$/, function () {
    expect(tellTurnIsCalled).to.be.true;
    expect(tellTurnPlayer).to.be.true;
  });

}