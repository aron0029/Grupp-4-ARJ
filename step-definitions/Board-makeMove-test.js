// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {
  this.After(() => fixNoSuchWindowError(driver));

  let winCheckCalled = false;
  let timesRendered;
  let tellTurnPlayer = [];

  class FakeGame extends Game {
    start() { this.board = new FakeBoard(this); }
    tellTurn(player) { tellTurnPlayer.push(player); }
  }

  class FakeBoard extends Board {
    winCheck() { winCheckCalled = true; }
    render() { timesRendered++; }
  }

  let fakeGame = new FakeGame();
  let realGame = new Game();

  // By principle I don't necessarily want to introduce my own testdata by creating/filling an array,
  // so as tester i'm doing deep copy/clone of whatever developer did
  let initialMatrix = JSON.parse(JSON.stringify(fakeGame.board.matrix));


  /* ----------------------------------------------------------- */
  /* ---------- Scenario: A player makes a valid move ---------- */
  /* ----------------------------------------------------------- */

  this.Given(/^board playInProgress property is initially false upon valid move$/, function () {

    expect(fakeGame.board.playInProgress, 'playInProgress property should be false unless makeMove is running').to.be.false;

  });


  this.Then(/^board playInProgress property should be set to true$/, async function () {

    fakeGame.board.makeMove(0);

    // Await board makeMove to set playInProgress true
    let timer = 0;
    while (!fakeGame.board.playInProgress) {
      await sleep(1); // 1ms sleep avoid overrun
      if (timer > 999) break;
      timer++;
    }

    expect(fakeGame.board.playInProgress, 'makeMove should be running').to.be.true;

    // Await board makeMove to set playInProgress false
    timer = 0;
    while (fakeGame.board.playInProgress) {
      await sleep(1); // 1ms sleep avoid overrun
      if (timer > 999) break;
      timer++;
    }

  });


  this.Then(/^board makeMove method should call render (\d+) times for any empty column on game board$/, async function (value) {

    // Zeroing any previous calls to render
    timesRendered = 0;

    await fakeGame.board.makeMove(1);

    expect(timesRendered).to.equal(+value, 'render was not called correct number of time by makeMove during a move');

  });


  this.Then(/^board matrix property should end up corresponding to previous board matrix including any player moves$/, function () {

    let tempMatrix = JSON.parse(JSON.stringify(initialMatrix));

    // Previous step-definition made 2 player moves on empty board at column [0] and [1]
    tempMatrix[5][0] = 1; // Player 1 Red
    tempMatrix[5][1] = 2; // Player 2 Yellow

    // Comparing current matrix array against temporary array
    expect(tempMatrix).to.deep.equal(fakeGame.board.matrix, 'makeMove did not update matrix array correctly');

  });


  this.Then(/^board winCheck method be called to check for a 4-in-a-row win$/, function () {

    expect(winCheckCalled, 'winCheck was not called').to.be.true;

  });


  this.Then(/^board currentPlayer property be set to type "([^"]*)" of value 1 or 2 whichever is the next player in turn$/, function (value) {

    tellTurnPlayer.map(x => {
      expect(x).to.be.a(value, 'currentPlayer property passed to game.tellTurn should be of type number');
      expect(Number.isInteger(x, 'currentPlayer property passed to game.tellTurn should be an integer')).to.be.true;
    });

    expect(tellTurnPlayer[tellTurnPlayer.length - 1]).to.not.equal(tellTurnPlayer[tellTurnPlayer.length - 2],
      'currentPlayer property should not equal previous player');

    expect(fakeGame.board.currentPlayer).to.be.a(value).and.equal(tellTurnPlayer[tellTurnPlayer.length - 3],
      'currentPlayer property should be type number and should equal player prior to previous player');

  });


  this.Then(/^game tellTurn method be called with board currentPlayer as argument$/, function () {

    // game tellTurn should have been called 3 times including board constructor call at this point of scenario
    expect(tellTurnPlayer.length).to.equal(3, 'game.tellTurn was not called correct number of times');

    expect(tellTurnPlayer[tellTurnPlayer.length - 1]).to.equal(fakeGame.board.currentPlayer,
      'currentPlayer property was not set correctly');

  });


  this.Then(/^board makeMove method should return true$/, async function () {

    expect(await fakeGame.board.makeMove(0), 'makeMove did not return true on valid move').to.be.true;

  });


  this.Then(/^board playInProgress property should have been set to false when board makeMove has returned true$/, function () {

    // This step-definition should preseed previous step 
    // But since we already know makeMove sets playInProgress true upon method call we need only check that its false when finished
    expect(fakeGame.board.playInProgress, 'playInProgress should be false on return').to.be.false;

  });


  /* -------------------------------------------------------------- */
  /* ---------- Scenario: A player makes an invalid move ---------- */
  /* -------------------------------------------------------------- */

  this.Given(/^board playInProgress property is initially false upon invalid move$/, function () {

    expect(fakeGame.board.playInProgress, 'playInProgress property should be false unless makeMove is running').to.be.false;

  });


  this.When(/^there are no free positions available in a column for more game pieces$/, async function () {

    fakeGame.board.matrix = JSON.parse(JSON.stringify(initialMatrix));

    // Lets actually call makeMove 6 times for each column before testing invalid moves instead of setting board matrix values manually
    for (i = 0; i < fakeGame.board.matrix[0].length; i++) {  // Columns
      for (n = 0; n < fakeGame.board.matrix.length; n++) {    // Rows
        await fakeGame.board.makeMove(i);
      }
    }

    // Check that board makeMove filled board matrix
    for (i = 0; i < fakeGame.board.matrix[0].length; i++) {  // Columns
      for (n = 0; n < fakeGame.board.matrix.length; n++) {    // Rows
        expect(fakeGame.board.matrix[n][i]).to.not.equal(0, 'matrix array element was not set correctly during move');
      }
    }

  });


  this.Then(/^board makeMove method should return false$/, async function () {

    for (i = 0; i < fakeGame.board.matrix[0].length; i++) {  // Columns
      expect(await fakeGame.board.makeMove(i), 'wrong return value given making an invalid move').to.be.false;
    }

  });


  this.Then(/^board playInProgress property should have been set to false when board makeMove has returned false$/, function () {

    // This step-definition should preseed previous step 
    // But since we already know makeMove sets playInProgress true upon method call we need only check that its false when finished
    expect(fakeGame.board.playInProgress, 'playInProgress should be false on return').to.be.false;

  });


  /* ----------------------------------------------------------------------------------------------------------------- */
  /* ---------- Scenario: Wrong column argument is passed to board makeMove method when player makes a move ---------- */
  /* ----------------------------------------------------------------------------------------------------------------- */

  this.Given(/^board playInProgress property is initially false upon any move$/, function () {

    expect(realGame.board.playInProgress, 'playInProgress property should be false unless makeMove is running').to.be.false;

  });


  this.When(/^makeMove is passed a column argument that is not of type "([^"]*)" integer with a value between (\d+) and (\d+)$/, function (arg1, arg2, arg3) {

    // Nothing to test here. Move on to next step...

  });


  this.Then(/^makeMove should throw the error "([^"]*)"$/, async function (expectedError) {

    // Testing upper and lower integer boundries
    expect(await realGame.board.makeMove(7).throwCheck).to.throw(Error, expectedError, 'Board makeMove is not throwing correct error');
    expect(await realGame.board.makeMove(6).throwCheck).to.not.throw(Error, expectedError, 'Board makeMove is not throwing correct error');
    expect(await realGame.board.makeMove(-1).throwCheck).to.throw(Error, expectedError, 'Board makeMove is not throwing correct error');
    expect(await realGame.board.makeMove(0).throwCheck).to.not.throw(Error, expectedError, 'Board makeMove is not throwing correct error');

    // Testing invalid types
    expect(await realGame.board.makeMove('string').throwCheck).to.throw(Error, expectedError, 'Board makeMove is not throwing correct error');
    expect(await realGame.board.makeMove('1').throwCheck).to.throw(Error, expectedError, 'Board makeMove is not throwing correct error');
    expect(await realGame.board.makeMove('1.1').throwCheck).to.throw(Error, expectedError, 'Board makeMove is not throwing correct error');
    expect(await realGame.board.makeMove([1]).throwCheck).to.throw(Error, expectedError, 'Board makeMove is not throwing correct error');
    expect(await realGame.board.makeMove({}).throwCheck).to.throw(Error, expectedError, 'Board makeMove is not throwing correct error');
    expect(await realGame.board.makeMove(true).throwCheck).to.throw(Error, expectedError, 'Board makeMove is not throwing correct error');
    expect(await realGame.board.makeMove(false).throwCheck).to.throw(Error, expectedError, 'Board makeMove is not throwing correct error');
    expect(await realGame.board.makeMove(undefined).throwCheck).to.throw(Error, expectedError, 'Board makeMove is not throwing correct error');
    expect(await realGame.board.makeMove(null).throwCheck).to.throw(Error, expectedError, 'Board makeMove is not throwing correct error');

    // Testing floats within boundries
    expect(await realGame.board.makeMove(1.999).throwCheck).to.throw(Error, expectedError, 'Board makeMove is not throwing correct error');
    expect(await realGame.board.makeMove(-1.999).throwCheck).to.throw(Error, expectedError, 'Board makeMove is not throwing correct error');

    // Testing more boundries with floats
    expect(await realGame.board.makeMove(5.999).throwCheck).to.throw(Error, expectedError, 'Board makeMove is not throwing correct error');
    expect(await realGame.board.makeMove(6.001).throwCheck).to.throw(Error, expectedError, 'Board makeMove is not throwing correct error');
    expect(await realGame.board.makeMove(0.001).throwCheck).to.throw(Error, expectedError, 'Board makeMove is not throwing correct error');
    expect(await realGame.board.makeMove(-0.001).throwCheck).to.throw(Error, expectedError, 'Board makeMove is not throwing correct error');

  });


  /* ---------------------------------------------------------------- */
  /* ---------- Scenario: Filling entire board during game ---------- */
  /* ---------------------------------------------------------------- */

  this.Given(/^no player has won the game$/, function () {

    // Nothing to test. Remember we are not testing winCheck() or render() in this feature...

  });

  this.When(/^every position on game board is filled by game pieces$/, async function () {

    // Resetting
    realGame.board.matrix = JSON.parse(JSON.stringify(initialMatrix));

    // Making sure red player 1 is current
    realGame.board.currentPlayer = 1;

    let doMoves = [
      0, 1, 0, 1, 0, 1,
      1, 0, 1, 0, 1, 0,
      2, 3, 2, 3, 2, 3,
      3, 2, 3, 2, 3, 2,
      4, 5, 4, 5, 4, 5,
      6, 4, 6, 4, 6, 4,
      5, 6, 5, 6, 5, 6
    ]

    for (let doColumn of doMoves) {
      await realGame.board.makeMove(doColumn);
    }

    for (let element of realGame.board.matrix.flat(1)) {
      expect(element).to.not.equal(0, 'matrix array property was not filled');
    }

  });

  this.Then(/^all values in board matrix property placed by makeMove should exactly correspond to every move made during game$/, function () {

    let endMatrix = [
      [2, 1, 2, 1, 2, 1, 2],
      [2, 1, 2, 1, 2, 1, 2],
      [2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 2, 1]
    ];

    expect(realGame.board.matrix).to.deep.equal(endMatrix, 'matrix array property was not updated correctly during moves');

  });


  /* ---------------------------------------------------------------------- */
  /* ---------- Scenario: Filling half of game board during game ---------- */
  /* ---------------------------------------------------------------------- */

  this.Given(/^no player has won the game yet$/, function () {

    // Nothing to test. Remember we are not testing winCheck() nor render() in this feature...

  });

  this.When(/^half of the positions on game board are filled by game pieces$/, async function () {

    // Resetting by starting new game
    realGame = new Game();

    // Making sure yellow player 2 is current
    realGame.board.currentPlayer = 2;

    let doMoves = [
      1, 2, 3, 4, 5, 6,
      2, 3, 4, 5, 6,
      3, 4, 5, 6,
      4, 5, 6,
      5, 6,
      6
    ]

    for (let doColumn of doMoves) {
      await realGame.board.makeMove(doColumn);
    }

    let count = 0;
    for (let element of realGame.board.matrix.flat(1)) {
      element === 0 ? count++ : '';
    }

    expect(count).to.equal(21, 'matrix array property was not half filled');

  });

  this.Then(/^all values in board matrix property placed by makeMove should exactly correspond to every move made in the game thus far$/, function () {

    let endMatrix = [
      [0, 0, 0, 0, 0, 0, 2],
      [0, 0, 0, 0, 0, 2, 1],
      [0, 0, 0, 0, 1, 2, 1],
      [0, 0, 0, 1, 2, 1, 2],
      [0, 0, 2, 1, 2, 1, 2],
      [0, 2, 1, 2, 1, 2, 1]
    ];

    expect(realGame.board.matrix).to.deep.equal(endMatrix, 'matrix array property was not updated correctly during moves');

  });

}