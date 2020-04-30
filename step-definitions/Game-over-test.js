// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  let wonIs;
  let game;

  class FakeGame extends Game {

  }

  // Scenario: Check if argument "won" is valid

  this.When(/^over\(won\) is called$/, function () {
    // test further down
  });

  this.Then(/^check if argument won's value is "([^"]*)", (\d+) or (\d+)\. If not, cast error "([^"]*)"$/, function (draw, player1, player2, expectedErrorMsg) {

    game = new FakeGame()

    expect(() => game.over(draw)).to.not.throw(Error,
      "Sending won as 'draw' should not throw any error"
    );

    expect(() => game.over(+player1), "Sending won as 1 should not throw any error").to.not.throw(Error);
    expect(() => game.over(+player2), "Sending won as 2 should not throw any error").to.not.throw(Error);

    expect(() => game.over("oavgjort")).to.throw(
      Error,
      'won must be “draw”, 1 or 2',
      'over(won) is not throwing correct error'
    );

  });

  // Scenario: Check if argument "won" is draw

  this.When(/^over\(won\) is called when draw$/, function () {

  });

  this.Then(/^check if argument won is "([^"]*)"$/, function (arg1) {

  });

  this.Then(/^check if css class "([^"]*)" innerHTML is "([^"]*)" when draw$/, function (arg1, arg2) {

  });

  // Scenario: Check if argument "won" is 1

  this.When(/^over\(won\) is called when player one won$/, function () {

  });

  this.Then(/^check if argument won is (\d+) when Player one won$/, function (arg1) {

  });

  this.Then(/^check if css class "([^"]*)" innerHTML is "([^"]*)" when Player one won$/, function (arg1, arg2) {

  });

  // Scenario: Check if argument "won" is 2

  this.When(/^over\(won\) is called when player two won$/, function () {

  });

  this.Then(/^check if argument won is (\d+) when Player two won$/, function (arg1) {

  });

  this.Then(/^check if css class "([^"]*)" innerHTML is "([^"]*)" when Player two won$/, function (arg1, arg2) {

  });

  // Scenario: Play again when game is over

  this.When(/^the game is over$/, function () {

  });

  this.Then(/^a button\-element should appear in the css class "([^"]*)" innerHTML\.$/, function (arg1) {

  });

  this.Then(/^the button should have a css class named "([^"]*)"$/, function (arg1) {

  });

  this.Then(/^with a text "([^"]*)"$/, function (arg1) {

  });

}