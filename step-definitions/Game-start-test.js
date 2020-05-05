require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {
  this.After(() => fixNoSuchWindowError(driver));


  let board;
  let fakeGame;
  let realGame;
  let winCheck;
  let startCalled = false;

  class FakeGame extends Game {
    start() { startCalled = true; }
  }

  fakeGame = new FakeGame();

  realGame = new Game();


  this.Given(/^that the method start\(\) is called$/, function () {

    expect(startCalled, 'method Start was not called').to.be.true;

  });




  this.Then(/^it should create an instance of Board$/, function () {

    expect(realGame.board, 'Start dident crate an instance of Board').to.be.instanceof(Board);

  });



  this.Then(/^send current instance of Game to Boards constructor$/, function () {

    expect(realGame, ' current instance of game was met sent to Board Construktor').to.deep.equal(realGame.board.game);

  });


  this.Then(/^save the instance in property "([^"]*)"\.$/, function (value) {

    // Untestable?

  });


}