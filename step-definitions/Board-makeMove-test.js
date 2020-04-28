// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

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

  // By principle I don't necessarily want to introduce my own testdata so doing deep copy/clone of what developer did
  let initialMatrix = JSON.parse(JSON.stringify(fakeGame.board.matrix));


  /* ----------------------------------------------------------- */
  /* ---------- Scenario: A player makes a valid move ---------- */
  /* ----------------------------------------------------------- */

  this.Given(/^board playInProgress property is initially false upon valid move$/, function () {
    expect(fakeGame.board.playInProgress).to.be.false;
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

    expect(fakeGame.board.playInProgress).to.be.true;

    // Await board makeMove to set playInProgress false
    timer = 0;
    while (fakeGame.board.playInProgress) {
      await sleep(1); // 1ms sleep avoid overrun
      if (timer > 999) break;
      timer++;
    }

  });


  this.Then(/^board makeMove method should call render (\d+) times for any empty column on game board$/, async function (value) {

    timesRendered = 0;  // Zeroing
    await fakeGame.board.makeMove(1);

    expect(timesRendered).to.equal(+value);

  });


  this.Then(/^board matrix property should end up corresponding to previous board matrix including any player moves$/, function () {

    // Previous step-definition made 2 player moves on empty board at column [0] and [1]
    // Lets compare current matrix array against manually altered temporary array
    let tempMatrix = JSON.parse(JSON.stringify(initialMatrix));
    tempMatrix[5][0] = 1;
    tempMatrix[5][1] = 2;
    expect(tempMatrix.join()).to.equal(fakeGame.board.matrix.join());
  });


  this.Then(/^board winCheck method be called to check for a 4-in-a-row win$/, function () {

    expect(winCheckCalled).to.be.true;

  });


  this.Then(/^board currentPlayer property be set to type "([^"]*)" of value 1 or 2 whichever is the next player in turn$/, function (value) {

    // Should be all numbers and next (current) player should not be previous player 
    tellTurnPlayer.map(x => {
      expect(x).to.be.a(value);
      expect(Number.isInteger(x)).to.be.true;
    });

    expect(tellTurnPlayer[tellTurnPlayer.length - 1]).to.not.equal(tellTurnPlayer[tellTurnPlayer.length - 2]);

    // Lets also check that (current) player is a number and the player is "prior to previous" player
    expect(fakeGame.board.currentPlayer).to.be.a(value).and.equal(tellTurnPlayer[tellTurnPlayer.length - 3]);

  });


  this.Then(/^game tellTurn method be called with board currentPlayer as argument$/, function () {

    // game tellTurn should have been called 3 times including board constructor call at this point of scenario
    expect(tellTurnPlayer.length).to.equal(3);

    expect(tellTurnPlayer[tellTurnPlayer.length - 1]).to.equal(fakeGame.board.currentPlayer);

  });


  this.Then(/^board makeMove method should return true$/, async function () {

    expect(await fakeGame.board.makeMove(0)).to.be.true;

  });


  this.Then(/^board playInProgress property should have been set to false when board makeMove has returned true$/, function () {

    // This step-definition should preseed previous step 
    // But since we already know makeMove sets playInProgress true upon method call we need only check that its false when finished
    expect(fakeGame.board.playInProgress).to.be.false;

  });


  /* -------------------------------------------------------------- */
  /* ---------- Scenario: A player makes an invalid move ---------- */
  /* -------------------------------------------------------------- */

  this.Given(/^board playInProgress property is initially false upon invalid move$/, function () {

    expect(fakeGame.board.playInProgress).to.be.false;

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
        expect(fakeGame.board.matrix[n][i]).to.not.equal(0);
      }
    }

  });


  this.Then(/^board makeMove method should return false$/, async function () {

    for (i = 0; i < fakeGame.board.matrix[0].length; i++) {  // Columns
      expect(await fakeGame.board.makeMove(i)).to.be.false;
    }

  });


  this.Then(/^board playInProgress property should have been set to false when board makeMove has returned false$/, function () {

    // This step-definition should preseed previous step 
    // But since we already know makeMove sets playInProgress true upon method call we need only check that its false when finished
    expect(fakeGame.board.playInProgress).to.be.false;

  });


  /* ----------------------------------------------------------------------------------------------------------------- */
  /* ---------- Scenario: Wrong column argument is passed to board makeMove method when player makes a move ---------- */
  /* ----------------------------------------------------------------------------------------------------------------- */

  this.Given(/^board playInProgress property is initially false upon any move$/, function () {

    expect(realGame.board.playInProgress).to.be.false;

  });


  this.When(/^makeMove is passed a column argument that is not of type "([^"]*)" integer with a value between (\d+) or (\d+)$/, function (arg1, arg2, arg3) {

    // Nothing to test here. Move on to next step

  });


  this.Then(/^makeMove should throw the error "([^"]*)"$/, async function (expectedError) {
    // Use Promise somehow?
    //expect(realGame.board.makeMove(999)).to.throw(Error, expectedError, 'Board makeMove is not throwing correct error');;
  });

}