// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {

  let fakeGame;
  let realGame;
  let currentPlayer;
  let startCalled = false;
  let addEventListenerCalled = false;

  class FakeGame extends Game {
    start() { startCalled = true; }
    tellTurn(player) { currentPlayer = player; }
    addEventListener() { addEventListenerCalled = true; }
  }

  /* ------------------------------------------------------------------------------------ */
  /* ---------- Scenario: Starting the game by creating a new instance of game ---------- */
  /* ------------------------------------------------------------------------------------ */

  this.When(/^starting a new Game$/, function () {

    // Test further down

  });

  this.Then(/^a prompt should appear to input two names$/, function () {

    let playerNames = ['Anna', 'Bertil'];
    global.prompt = () => playerNames.shift();
    realGame = new Game();

  });

  this.Then(/^save the names in property playerNames$/, function () {

    // Test further down

  });

  this.Then(/^the property should have (\d+) elements$/, function (lengthOfPlayerNames) {

    expect(realGame.playerNames.length).to.equal(+lengthOfPlayerNames,
      'playerNames should contain two elements'
    );

  });

  this.Then(/^in each element with a players name$/, function () {

    expect(realGame.playerNames[0]).to.equal('Anna',
      'first element in playerNames should contain player ones name'
    );

    expect(realGame.playerNames[1]).to.equal('Bertil',
      'first element in playerNames should contain player twos name'
    );

  });

  /* ------------------------------------------------------------------------------------ */
  /* ---------- Scenario: Starting the game by creating a new instance of game ---------- */
  /* ------------------------------------------------------------------------------------ */

  this.Given(/^that the game is started by creating a new instance of Game$/, function () {

    fakeGame = new FakeGame();

    expect(startCalled).to.be.true;

  });


  this.Then(/^game property board should be set to a new instance of Board by calling game start method$/, function () {

    realGame = new Game();

    expect(realGame.board).to.be.instanceof(Board);

  });


  this.Then(/^game addEventListener method should be called$/, function () {

    expect(addEventListenerCalled).to.be.true;

  });


  this.Then(/^game tellTurn method should be called by board with board currentPlayer value (\d+) as argument$/, function (value) {

    // Creating manually since Game start method override in FakeGame
    fakeGame.board = new Board(fakeGame);

    expect(currentPlayer).to.equal(fakeGame.board.currentPlayer);
    expect(currentPlayer).to.equal(+value);

  });

}