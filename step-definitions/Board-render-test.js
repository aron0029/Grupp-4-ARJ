// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let renderCalled = false;
  let fakeGame;

  class FakeGame extends Game {
    start() { this.board = new FakeBoard(this); }
  }

  class FakeBoard extends Board {
    render() { renderCalled = true; }
  }


  /* -------------------------------------------------------------------------------- */
  /* ---------- Scenario: Running the game should draw an empty game board ---------- */
  /* -------------------------------------------------------------------------------- */

  this.Given(/^that board render method is called by board constructor when running the game$/, function () {

    fakeGame = new FakeGame();

    expect(renderCalled).to.be.true;

  });


  this.Given(/^that html div element with class \.board exists when board render method is called when running the game$/, function () {

    expect($('.board')).to.not.be.null;

  });

  this.Given(/^that this html div element with class \.board is empty$/, function () {

    expect($('.board').innerHTML).to.equal('');

  });

  this.Then(/^(\d+) html div elements should be added as children of that html div element each with a html div element child of their own$/, function (arg1) {

  });


  /* ---------------------------------------------------------------------------------------------- */
  /* ---------- Scenario: Game should update GUI when valid move is made by red player 1 ---------- */
  /* ---------------------------------------------------------------------------------------------- */

  this.Given(/^that html div element with class \.board exists when board render method is called when red player (\d+) makes a move$/, function (arg1) {

  });

  this.Given(/^that board render method was called after move was made by red player$/, function () {

  });

  this.When(/^board currentPlayer property value was (\d+) on move by red player$/, function (arg1) {

  });

  this.Then(/^class \.red should be added to one of the (\d+) html div elements corresponding to last player move$/, function (arg1) {

  });

  this.Then(/^all previous moves should remain visible including red player 1's and correspond to values in property board matrix array$/, function () {

  });


  /* ------------------------------------------------------------------------------------------------- */
  /* ---------- Scenario: Game should update GUI when valid move is made by yellow player 2 ---------- */
  /* ------------------------------------------------------------------------------------------------- */

  this.Given(/^that html div element with class \.board exists when board render method is called when yellow player (\d+) makes a move$/, function (arg1) {

  });

  this.Given(/^that board render method was called after move was made by yellow player$/, function () {

  });

  this.When(/^board currentPlayer property value was (\d+) on move by yellow player$/, function (arg1) {

  });

  this.Then(/^class \.yellow should be added to one of the (\d+) html div elements corresponding to last player move$/, function (arg1) {

  });

  this.Then(/^all previous moves should remain visible including yellow player 2's and correspond to values in property board matrix array$/, function () {

  });

}