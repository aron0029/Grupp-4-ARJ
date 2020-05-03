require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {
  this.After(() => fixNoSuchWindowError(driver));

  let Board;
  let Start = false;
  let Game;


  // start()
  // Metoden ska skapa ett ny instans av
  // Board och skicka nuvarande instans av Game till dess konstruktor.
  //Instansen ska lagras i egenskapen board


  this.Given(/^that the method start\(\) is called$/, function () {
    expect(Start).to.be.callback;

  });

  /*2* Scenario: Starting a new game - features\Game - start.feature: 4
  Step: Then it should create an instance of Board - features\Game - start.feature: 6
  Message:
  Undefined.Implement with the following snippet: */
  function NewBoard() { }


  this.Then(/^it should create an instance of Board$/, function () {
    expect(Board).to.be.instanceof.Start;

  });

  /* 3) Scenario: Starting a new game - features\Game - start.feature: 4
   Step: And send current instance of Game to Boards constructor - features\Game - start.feature: 7
   Message:
   Undefined.Implement with the following snippet:
   */

  this.Then(/^send current instance of Game to Boards constructor$/, function () {
    expect(Game).to.be.an.instanceof.Board;

  });

  /*4) Scenario: Starting a new game - features\Game - start.feature: 4
  Step: And save the instance in property "board". - features\Game - start.feature: 8
  Message:
  Undefined.Implement with the following snippet: */

  this.Then(/^save the instance in property "([^"]*)"\.$/, function (value) {
    expect(Start).to.be.instanceof.Board;

  });


}