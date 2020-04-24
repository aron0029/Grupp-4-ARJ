// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  class FakeGame extends Game {
    start() { this.board = new FakeBoard(this); }
    tellTurn(player) { tellTurnPlayer = player; }
  }

  class FakeBoard extends Board {
    addEventListener() { listenerCalled = true; }
    winCheck() { winCheckCalled = true; }
    render() { timesRendered++; }
  }

  let listenerCalled = false;
  let winCheckCalled = false;
  let timesRendered = 0;
  let tellTurnPlayer = 0;

  //let realGame = new Game();
  let fakeGame = new FakeGame();
  let initialMatrix = JSON.parse(JSON.stringify(fakeGame.board.matrix));  // Deep copy/clone

  this.Given(/^board addEventListener was called$/, function () {
    expect(listenerCalled).to.be.true;
  });

  this.Given(/^board playInProgress property is initially false$/, function () {
    expect(fakeGame.board.playInProgress).to.be.false;
  });

  this.Then(/^board makeMove should call render (\d+) times for any selected column on empty game board$/, async function (value) {
    // Board constructor calls render 1 time, board makeMove should call render 6 times during a move anywhere on empty game board 
    await fakeGame.board.makeMove(0);
    expect(timesRendered).to.equal(+value + 1);
  });

  this.Then(/^board matrix property array values should end up corresponding to previous board matrix values including last player move$/, function () {
    // Previous step-definition already made a move on first column [index 0]
    // Lets compare current matrix array against manually altered initial matrix array
    initialMatrix[5][0] = 1;
    expect(initialMatrix.join()).to.equal(fakeGame.board.matrix.join());
  });

  this.Then(/^board winCheck be called to check for a 4-in-a-row win$/, function () {
    expect(winCheckCalled).to.be.true;
  });

  this.Then(/^board currentPlayer be set to number 1 or 2 whichever is the next player in turn$/, function () {
    // Player 1 has already made a move in previous step-definition
    expect(fakeGame.board.currentPlayer).to.be.a('number').and.equal(2);
  });

  this.Then(/^function game tellTurn be called with board currentPlayer as argument$/, function () {
    expect(tellTurnPlayer).to.equal(fakeGame.board.currentPlayer);
  });

  this.Then(/^board makeMove should return true$/, async function () {
    expect(await fakeGame.board.makeMove(0)).to.be.true;
  });

  this.When(/^there are no free positions available in selected column for more game pieces$/, async function () {
    // Lets actually call makeMove 6 times before testing invalid move instead of setting fakeGame.board.matrix[0][6] to 1;
    for (i = 0; i < fakeGame.board.matrix.length; i++) await fakeGame.board.makeMove(6);
  });

  this.Then(/^board makeMove should return false$/, async function () {
    expect(await fakeGame.board.makeMove(6)).to.be.false;
  });

}