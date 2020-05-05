require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {

  let realGame;
  let fakeGame;
  let tellTurnCalled;
  let tellTurnplayer;

  // Just for the sake of it, to break up into two step-definitions
  let throwTestArray;

  class FakeGame extends Game {
    tellTurn(player) {
      tellTurnCalled = true;
      tellTurnplayer = player;
    }
  }


  /* -------------------------------------------------------- */
  /* ---------- Scenario: Showing player 1 is next ---------- */
  /* -------------------------------------------------------- */

  this.Given(/^tellTurn method is called after move by second player (\d+) or on game start$/, async function (arg1) {

    tellTurnCalled = false;
    fakeGame = new FakeGame();

    expect(tellTurnCalled).to.be.true;


    // Making sure player 2 is current
    fakeGame.board.currentPlayer = 2;
    tellTurnCalled = false;
    await fakeGame.board.makeMove(0);

    expect(tellTurnCalled).to.be.true;

  });

  this.Given(/^and was passed player argument "([^"]*)" value of (\d+) to show first player is next$/, function (arg1, arg2) {

    expect(tellTurnplayer).to.be.a('number');
    expect(Number.isInteger(tellTurnplayer)).to.be.true;
    expect(tellTurnplayer).to.equal(1);

  });

  this.Then(/^the content of html div element with css class \.message should be changed to first player (\d+)'s entered name \+ "([^"]*)"$/, function (arg1, value) {

    // Clearing
    $('.message').innerHTML = '';

    let names = ['Anna', 'Bertil'];
    let playerOneName = names[0];
    global.prompt = () => names.shift();

    realGame = new Game();

    expect($('.message').innerHTML).to.equal(playerOneName + value);

  });


  /* -------------------------------------------------------- */
  /* ---------- Scenario: Showing player 2 is next ---------- */
  /* -------------------------------------------------------- */

  this.Given(/^tellTurn method is called after move by first player (\d+)$/, async function (arg1) {

    tellTurnCalled = false;
    fakeGame = new FakeGame();

    expect(tellTurnCalled).to.be.true;


    // Making sure player 1 is current
    fakeGame.board.currentPlayer = 1;
    tellTurnCalled = false;
    await fakeGame.board.makeMove(0);

    expect(tellTurnCalled).to.be.true;

  });

  this.Given(/^and was passed player argument "([^"]*)" value of (\d+) to show second player is next$/, function (arg1, arg2) {

    expect(tellTurnplayer).to.be.a('number');
    expect(Number.isInteger(tellTurnplayer)).to.be.true;
    expect(tellTurnplayer).to.equal(2);

  });

  this.Then(/^the content of html div element with css class \.message should be changed to second player (\d+)'s entered name \+ "([^"]*)"$/, async function (arg1, value) {

    // Clearing
    $('.message').innerHTML = '';

    let names = ['Anna', 'Bertil'];
    let playerTwoName = names[1];
    global.prompt = () => names.shift();

    // Make sure current player 2
    await realGame.board.makeMove(0);

    expect($('.message').innerHTML).to.equal(playerTwoName + value);

  });


  /* ---------------------------------------------------------------------------------------- */
  /* ----------  Scenario: Wrong player value is passed to tellTurn by Board class ---------- */
  /* ---------------------------------------------------------------------------------------- */

  this.When(/^tellTurn method is called and passed a value which is not a "([^"]*)" of (\d+) or (\d+)$/, function (arg1, arg2, arg3) {

    realGame = new Game();

    throwTestArray = [
      ['string', '1', [1], {}, true, false, undefined, null],
      []
    ];

    // How too without any real purpose split up a test into two step-definitions :-)
    for (let element of throwTestArray[0]) {
      try {
        realGame.tellTurn(element);
      } catch (error) {
        throwTestArray[1].push(error);
      }
    }

  });

  this.Then(/^tellTurn method should throw error "([^"]*)"$/, function (expectedError) {

    // How too without any real purpose split up a test into two step-definitions :-)
    for (let element of throwTestArray[1]) {
      expect(element).to.be.instanceof(Error);
      expect(element.message).to.equal(expectedError);
    }

  });

}
