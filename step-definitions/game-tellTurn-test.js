require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {

  let realGame = new Game();
  let fakeGame = {};
  let tellTurnCalled = false;
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

  this.Given(/^tellTurn method is called$/, function (callback) {

  });

  this.Given(/^and was passed an argument "([^"]*)" value of (\d+)$/, function (arg1, arg2, callback) {

  });

  this.Then(/^the content of html div element with css class \.message should be changed to player (\d+)'s entered name \+ "([^"]*)"$/, function (arg1, arg2, callback) {

  });


  /* -------------------------------------------------------- */
  /* ---------- Scenario: Showing player 2 is next ---------- */
  /* -------------------------------------------------------- */

  this.Given(/^tellTurn method is called$/, function (callback) {

  });

  this.Given(/^and was passed an argument "([^"]*)" value of (\d+)$/, function (arg1, arg2, callback) {

  });

  this.Then(/^the content of html div element with css class \.message should be changed to player (\d+)'s entered name \+ "([^"]*)"$/, function (arg1, arg2, callback) {

  });


  /* ---------------------------------------------------------------------------------------- */
  /* ----------  Scenario: Wrong player value is passed to tellTurn by Board class ---------- */
  /* ---------------------------------------------------------------------------------------- */

  this.When(/^tellTurn method is called and passed a value which is not (\d+) or (\d+)$/, function (arg1, arg2, callback) {

  });

  this.Then(/^tellTurn method should throw error "([^"]*)"$/, function (arg1, callback) {

  });

}
