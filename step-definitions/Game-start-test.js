require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {
  this.After(() => fixNoSuchWindowError(driver));

  let fakeGame;
  let realGame;
  let startCalled = false;
  let fakeBoardGame;

  class FakeGame extends Game {
    start() {
      this.board = new FakeBoard(this);
      startCalled = true;
    }
  }

  class FakeBoard extends Board {
    constructor(game) {
      fakeBoardGame = game;
      super(game);
    }

  }

  fakeGame = new FakeGame();
  realGame = new Game();


  this.Given(/^that the method start\(\) is called$/, function () {

    expect(startCalled).to.be.true;

  });



  this.Then(/^it should create an instance of Board$/, function () {

    expect(realGame.board).to.be.instanceof(Board);

  });



  this.Then(/^pass current instance of Game to Boards constructor$/, function () {

    // Testing "send" (passing argument) using a fake Game
    expect(fakeGame).to.deep.equal(fakeBoardGame);

  });


  this.Then(/^save the instance in property "([^"]*)"$/, function (value) {

    // Save the instance of "Game" in property board? 
    // Testing this using a real Game
    expect(realGame).to.deep.equal(realGame.board.game);

  });


}