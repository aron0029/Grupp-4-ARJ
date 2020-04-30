// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {

  let fakeGame;
  let realGame;
  let wonIsWhatWhat;
  let overIsCalled = false;

  class FakeGame extends Game {
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

    realGame = new Game();

    expect(() => realGame.over(draw)).to.not.throw(Error,
      "Sending won as 'draw' should not throw any error"
    );

    expect(() => realGame.over(+player1), "Sending won as 1 should not throw any error").to.not.throw(Error);
    expect(() => realGame.over(+player2), "Sending won as 2 should not throw any error").to.not.throw(Error);

    expect(() => realGame.over("oavgjort")).to.throw(
      Error,
      expectedErrorMsg,
      'over(won) is not throwing correct error message'
    );

  });

  // Scenario: Check if argument "won" is draw

  this.When(/^over\(won\) is called when draw$/, async function () {

    fakeGame = new FakeGame();

    fakeGame.board.matrix = [
      [2, 0, 2, 1, 2, 2, 1],
      [2, 1, 2, 1, 2, 2, 1],
      [2, 1, 2, 1, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 2],
      [1, 2, 1, 2, 1, 2, 2],
      [1, 2, 1, 2, 1, 2, 2]
    ];
    await fakeGame.board.makeMove(1);
    expect(overIsCalled, 'over() method was not called when the game was draw').to.be.true;

  });

  this.Then(/^check if argument won is "([^"]*)"$/, function (drawString) {

    expect(wonIsWhatWhat).to.equal(drawString);

  });

  this.Then(/^check if css class "([^"]*)" innerHTML is "([^"]*)" when draw$/, async function (messageClass, drawHtmlMsg) {

    realGame = new Game();
    realGame.board.matrix = [
      [2, 0, 2, 1, 2, 2, 1],
      [2, 1, 2, 1, 2, 2, 1],
      [2, 1, 2, 1, 2, 1, 1],
      [1, 2, 1, 2, 1, 2, 2],
      [1, 2, 1, 2, 1, 2, 2],
      [1, 2, 1, 2, 1, 2, 2]
    ];
    await realGame.board.makeMove(1);
    expect($("." + messageClass + "").innerHTML).to.includes(drawHtmlMsg);

  });

  // Scenario: Check if argument "won" is 1

  this.When(/^over\(won\) is called when player one won$/, async function () {

    fakeGame = new FakeGame();
    fakeGame.board.matrix = [
      [2, 0, 2, 1, 2, 2, 1],
      [2, 0, 2, 1, 2, 2, 1],
      [2, 1, 2, 1, 2, 1, 1],
      [1, 1, 1, 2, 1, 2, 2],
      [1, 1, 1, 2, 1, 2, 2],
      [1, 2, 1, 2, 1, 2, 2]
    ];
    await fakeGame.board.makeMove(1);

  });

  this.Then(/^check if argument won is (\d+) when Player one won$/, function (player1) {

    expect(wonIsWhatWhat).to.equal(+player1,
      'when player 1 won, won in method over() should be 1'
    );

  });

  this.Then(/^check if css class "([^"]*)" innerHTML is Player (\d+)'s name \+ "([^"]*)" when Player one won$/, async function (messageClass, player1, wonMsg) {

    let names = ['Anna', 'Bertil'];
    let playerOneName = names[0];
    global.prompt = () => names.shift();
    realGame = new Game();
    realGame.board.matrix = [
      [0, 0, 2, 1, 2, 2, 1],
      [0, 1, 2, 1, 2, 2, 1],
      [0, 1, 2, 1, 2, 1, 1],
      [1, 2, 1, 2, 1, 2, 2],
      [1, 1, 1, 2, 1, 2, 2],
      [1, 1, 1, 2, 1, 2, 2]
    ];
    realGame.board.currentPlayer = +player1;
    await realGame.board.makeMove(0);

    expect($("." + messageClass + "").innerHTML).to.includes(playerOneName + wonMsg);

  });

  // Scenario: Check if argument "won" is 2

  this.When(/^over\(won\) is called when player two won$/, async function () {

    fakeGame = new FakeGame();
    fakeGame.board.matrix = [
      [1, 0, 2, 1, 2, 2, 1],
      [1, 0, 2, 1, 2, 2, 1],
      [2, 2, 2, 1, 2, 1, 1],
      [2, 1, 1, 2, 1, 2, 2],
      [2, 1, 1, 2, 1, 2, 2],
      [2, 2, 1, 2, 1, 2, 2]
    ];
    await fakeGame.board.makeMove(1);

  });

  this.Then(/^check if argument won is (\d+) when Player two won$/, function (player2) {

    expect(wonIsWhatWhat).to.equal(+player2,
      'when player 2 won, won in method over() should be 2'
    );

  });

  this.Then(/^check if css class "([^"]*)" innerHTML is Player (\d+)'s name \+ "([^"]*)" when Player two won$/, async function (messageClass, player2, wonMsg) {

    let names = ['Anna', 'Bertil'];
    let playerTwoName = names[1];
    global.prompt = () => names.shift();
    realGame = new Game();
    realGame.board.matrix = [
      [0, 0, 2, 1, 2, 2, 1],
      [0, 1, 2, 1, 2, 2, 1],
      [0, 1, 2, 1, 2, 1, 1],
      [2, 2, 1, 2, 1, 2, 2],
      [2, 1, 1, 2, 1, 2, 2],
      [2, 1, 1, 2, 1, 2, 2]
    ];
    realGame.board.currentPlayer = +player2;
    await realGame.board.makeMove(0);

    expect($("." + messageClass + "").innerHTML).to.includes(playerTwoName + wonMsg);

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