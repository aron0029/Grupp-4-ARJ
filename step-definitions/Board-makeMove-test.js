// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let listenerCalled = false;
  let winCheckCalled = false;
  let timesRendered;
  let tellTurnPlayer = [];

  class FakeGame extends Game {
    start() { this.board = new FakeBoard(this); }
    tellTurn(player) { tellTurnPlayer.push(player); }
  }

  class FakeBoard extends Board {
    addEventListener() { listenerCalled = true; }
    winCheck() { winCheckCalled = true; }
    render() { timesRendered++; }
  }

  //let realGame = new Game();
  let fakeGame = new FakeGame();
  let initialMatrix = JSON.parse(JSON.stringify(fakeGame.board.matrix));  // Deep copy/clone

  this.Given(/^board addEventListener method was called$/, function () {
    expect(listenerCalled).to.be.true;
  });

  this.Given(/^board playInProgress property is initially false$/, function () {
    expect(fakeGame.board.playInProgress).to.be.false;
  });

  this.Then(/^board playInProgress property should be set to true$/, async function () {
    fakeGame.board.makeMove(0);
    while (!fakeGame.board.playInProgress) await sleep(1); // 1ms sleep avoid overrun
    expect(fakeGame.board.playInProgress).to.be.true;
  });

  this.Then(/^board makeMove method should call render (\d+) times for any empty column on game board$/, async function (value) {
    // Await board makeMove from previous step-definition. 1ms sleep to avoid overrun
    while (fakeGame.board.playInProgress) await sleep(1);
    timesRendered = 0;
    await fakeGame.board.makeMove(1);
    expect(timesRendered).to.equal(+value);
  });

  this.Then(/^board matrix property array values should end up corresponding to previous board matrix values including any player moves$/, function () {
    // Previous step-definition made 2 player moves on empty board at column [0] and [1]
    // Lets compare current matrix array against manually altered initial matrix array
    initialMatrix[5][0] = 1;
    initialMatrix[5][1] = 2;
    expect(initialMatrix.join()).to.equal(fakeGame.board.matrix.join());
  });

  this.Then(/^board winCheck method be called to check for a 4-in-a-row win$/, function () {
    expect(winCheckCalled).to.be.true;
  });

  this.Then(/^board currentPlayer property be set to number 1 or 2 whichever is the next player in turn$/, function () {
    // Next player should be the player "prior to previous" player
    expect(fakeGame.board.currentPlayer).to.be.a('number').and.equal(tellTurnPlayer[tellTurnPlayer.length - 3]);
  });

  this.Then(/^game tellTurn method be called with board currentPlayer as argument$/, function () {
    expect(tellTurnPlayer[tellTurnPlayer.length - 1]).to.equal(fakeGame.board.currentPlayer);
  });

  this.Then(/^board makeMove method should return true$/, async function () {
    expect(await fakeGame.board.makeMove(0)).to.be.true;
  });

  this.Then(/^board playInProgress property end up being set to false when board makeMove has finished move$/, function () {
    // This step-definition should preseed previous step 
    // But since we already know makeMove sets playInProgress true upon method call we need only check that its false when finished
    expect(fakeGame.board.playInProgress).to.be.false;
  });

  this.When(/^there are no free positions available in a column for more game pieces$/, async function () {
    // Lets actually call makeMove 6 times before testing invalid move instead of setting fakeGame.board.matrix[0][3] value to 1;
    for (i = 0; i <= fakeGame.board.matrix.length; i++) {
      fakeGame.board.makeMove(3);
      while (fakeGame.board.playInProgress) await sleep(1);
    }
  });

  this.Then(/^board makeMove method should return false$/, async function () {
    expect(await fakeGame.board.makeMove(3)).to.be.false;
  });

  this.Then(/^board playInProgress property end up being set to false when board makeMove has skipped move$/, function () {
    // This step-definition should preseed previous step 
    // But since we already know makeMove sets playInProgress true upon method call we need only check that its false when finished
    expect(fakeGame.board.playInProgress).to.be.false;
  });

}