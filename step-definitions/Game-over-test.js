// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {

  let game;
  let wonIsWhatWhat;
  let overIsCalled = false;

  class FakeGame extends Game {
  }

  class FakeGame2 extends Game {
    over(won) {
      overIsCalled = true;
      wonIsWhatWhat = won;
    }
  }

  // Scenario: Check if argument "won" is valid

  this.When(/^over\(won\) is called$/, function () {
    // test further down
  });

  this.Then(/^check if argument won's value is "([^"]*)", (\d+) or (\d+)\. If not, cast error "([^"]*)"$/, function (draw, player1, player2, expectedErrorMsg) {

    game = new FakeGame();

    expect(() => game.over(draw)).to.not.throw(Error,
      "Sending won as 'draw' should not throw any error"
    );

    expect(() => game.over(+player1), "Sending won as 1 should not throw any error").to.not.throw(Error);
    expect(() => game.over(+player2), "Sending won as 2 should not throw any error").to.not.throw(Error);

    expect(() => game.over("oavgjort")).to.throw(
      Error,
      expectedErrorMsg,
      'over(won) is not throwing correct error message'
    );

  });

  // Scenario: Check if argument "won" is draw

  this.When(/^over\(won\) is called when draw$/, async function () {

    game = new FakeGame2();

    game.board.matrix = [
      [2, 0, 2, 1, 2, 2, 1],
      [2, 1, 2, 1, 2, 2, 1],
      [2, 1, 2, 1, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 2],
      [1, 2, 1, 2, 1, 2, 2],
      [1, 2, 1, 2, 1, 2, 2]
    ];
    await game.board.makeMove(1);
    expect(overIsCalled, 'over() method was not called when the game was draw').to.be.true;

  });

  this.Then(/^check if argument won is "([^"]*)"$/, function (drawString) {

    expect(wonIsWhatWhat).to.equal(drawString);

  });

  this.Then(/^check if css class "([^"]*)" innerHTML is "([^"]*)" when draw$/, async function (messageClass, drawHtmlMsg) {

    game = new FakeGame();
    game.board.matrix = [
      [2, 0, 2, 1, 2, 2, 1],
      [2, 1, 2, 1, 2, 2, 1],
      [2, 1, 2, 1, 2, 1, 1],
      [1, 2, 1, 2, 1, 2, 2],
      [1, 2, 1, 2, 1, 2, 2],
      [1, 2, 1, 2, 1, 2, 2]
    ];
    await game.board.makeMove(1);
    expect($("." + messageClass + "").innerHTML).to.includes(drawHtmlMsg);

  });

  // Scenario: Check if argument "won" is 1

  this.When(/^over\(won\) is called when player one won$/, async function () {

    game = new FakeGame2();
    game.board.matrix = [
      [2, 0, 2, 1, 2, 2, 1],
      [2, 0, 2, 1, 2, 2, 1],
      [2, 1, 2, 1, 2, 1, 1],
      [1, 1, 1, 2, 1, 2, 2],
      [1, 1, 1, 2, 1, 2, 2],
      [1, 2, 1, 2, 1, 2, 2]
    ];
    await game.board.makeMove(1);

  });

  this.Then(/^check if argument won is (\d+) when Player one won$/, function (player1) {

    expect(wonIsWhatWhat).to.equal(+player1,
      'when player 1 won, won in method over() should be 1'
    );

  });

  this.Then(/^check if css class "([^"]*)" innerHTML is Player (\d+)'s name \+ "([^"]*)" when Player one won$/, async function (messageClass, player1, wonMsg) {

    const names = ['Anna', 'Bertil'];
    let playerOneName = names[0];
    global.prompt = () => names.shift();
    let game2 = new FakeGame();
    game2.board.matrix = [
      [0, 0, 2, 1, 2, 2, 1],
      [0, 1, 2, 1, 2, 2, 1],
      [0, 1, 2, 1, 2, 1, 1],
      [1, 2, 1, 2, 1, 2, 2],
      [1, 1, 1, 2, 1, 2, 2],
      [1, 1, 1, 2, 1, 2, 2]
    ];
    await game2.board.makeMove(0);

    expect($("." + messageClass + "").innerHTML).to.includes(playerOneName + wonMsg);

  });

  // Scenario: Check if argument "won" is 2

  this.When(/^over\(won\) is called when player two won$/, function () {

  });

  this.Then(/^check if argument won is (\d+) when Player two won$/, function (player2) {

  });

  this.Then(/^check if css class "([^"]*)" innerHTML is Player (\d+)'s name \+ "([^"]*)" when Player two won$/, function (messageClass, player2, arg2) {

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