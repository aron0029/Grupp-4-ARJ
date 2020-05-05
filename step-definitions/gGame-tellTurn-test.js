require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {

  let realGame = new Game();
  let fakeGame = {};
  let tellTurnCalled;
  let tellTurnplayer;

  class FakeGame extends Game {
    tellTurn(player) {
      tellTurnCalled = true;
      tellTurnplayer = player;
    }
  }


  /* -------------------------------------------------------- */
  /* ---------- Scenario: Showing player 1 is next ---------- */
  /* -------------------------------------------------------- */

  this.Given(/^tellTurn method is called on game start or after move by second player (\d+)$/, async function (arg1) {

    tellTurnCalled = false;
    fakeGame = new FakeGame();

    expect(tellTurnCalled).to.be.true;

    tellTurnCalled = false;
    await fakeGame.board.makeMove(0);

    expect(tellTurnCalled).to.be.true;

  });

  this.Given(/^and was passed argument "([^"]*)" value of (\d+) to show first player is next$/, function (arg1, arg2) {

  });

  this.Then(/^the content of html div element with css class \.message should be changed to first player (\d+)'s entered name \+ "([^"]*)"$/, function (arg1, arg2) {

  });


  /* -------------------------------------------------------- */
  /* ---------- Scenario: Showing player 2 is next ---------- */
  /* -------------------------------------------------------- */

  this.Given(/^tellTurn method is called on game start or after move by first player (\d+)$/, async function (arg1) {

    tellTurnCalled = false;
    fakeGame = new FakeGame();

    expect(tellTurnCalled).to.be.true;

    tellTurnCalled = false;
    await fakeGame.board.makeMove(0);

    expect(tellTurnCalled).to.be.true;

  });

  this.Given(/^and was passed argument "([^"]*)" value of (\d+) to show second player is next$/, function (arg1, arg2) {

  });

  this.Then(/^the content of html div element with css class \.message should be changed to second player (\d+)'s entered name \+ "([^"]*)"$/, function (arg1, arg2) {

  });


  /* ---------------------------------------------------------------------------------------- */
  /* ----------  Scenario: Wrong player value is passed to tellTurn by Board class ---------- */
  /* ---------------------------------------------------------------------------------------- */

  this.When(/^tellTurn method is called and passed a value which is not a "([^"]*)" of (\d+) or (\d+)$/, function (arg1, arg2, arg3) {

  });

  this.Then(/^tellTurn method should throw error "([^"]*)"$/, function (arg1) {

  });

}
