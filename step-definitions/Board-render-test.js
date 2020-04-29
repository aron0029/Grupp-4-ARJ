// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {


  /* -------------------------------------------------------------------------------- */
  /* ---------- Scenario: Running the game should draw an empty game board ---------- */
  /* -------------------------------------------------------------------------------- */

  this.Given(/^that html div element with class \.board exists when board render method is called when running the game$/, function () {

  });

  this.Given(/^that this html div element with class \.board is empty$/, function () {

  });

  this.Then(/^(\d+) html div elements should be added as children of that html div element each with a html div element child of their own$/, function (arg1) {

  });


  /* ---------------------------------------------------------------------------------------------- */
  /* ---------- Scenario: Game should update GUI when valid move is made by red player 1 ---------- */
  /* ---------------------------------------------------------------------------------------------- */

  this.Given(/^that html div element with class \.board exists when board render method is called when player (\d+) makes a move$/, function (arg1) {

  });

  this.Given(/^that board render method was called after move was made$/, function () {

  });

  this.When(/^board currentPlayer property value was (\d+)$/, function (arg1) {

  });

  this.Then(/^class \.red should be added to one of the (\d+) html div elements corresponding to last player move$/, function (arg1) {

  });

  this.Then(/^all previous player moves should remain visible and correspond to values in property board matrix array$/, function () {

  });


  /* ------------------------------------------------------------------------------------------------- */
  /* ---------- Scenario: Game should update GUI when valid move is made by yellow player 2 ---------- */
  /* ------------------------------------------------------------------------------------------------- */

  this.Given(/^that html div element with class \.board exists when board render method is called when player (\d+) makes a move$/, function (arg1) {

  });

  this.Given(/^that board render method was called after move was made$/, function () {

  });

  this.When(/^board currentPlayer property value was (\d+)$/, function (arg1) {

  });

  this.Then(/^class \.yellow should be added to one of the (\d+) html div elements corresponding to last player move$/, function (arg1) {

  });

  this.Then(/^all previous player moves should remain visible and correspond to values in property board matrix array$/, function () {

  });

}