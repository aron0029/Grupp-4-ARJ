// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  // Overrides

  class fakeGame extends Game {
    constructor() {
      super(game)
      this.matrix = [];

    }

  }

  class fakeBoard extends Board {

  }

  let board;
  let game;
  let winCheck;

  game = new fakeGame();
  board = game.board;


  // Scenario: Check the whole board if anyone won

  this.When(/^someone has won$/, function () {
    // test in other test further down
  });

  this.Then(/^method should return an object when won$/, function () {
    // test in other test further down
  });

  this.Then(/^the object should have property "([^"]*)" with value (\d+) or (\d+) \(player\)$/, function (winner, one, two) {
    board.matrix = [...Array(6)].map(x => Array(7).fill(1));

    winCheck = board.winCheck();
    expect(winCheck).to.have.any.keys(winner,
      'winCheck does not return an object with property winner'
    );
    expect(winCheck.winner).to.deep.equal(+one,
      'winCheck did not return winner as Player 1'
    );

    board.matrix = [...Array(6)].map(x => Array(7).fill(2));
    winCheck = board.winCheck();
    expect(winCheck.winner).to.deep.equal(2,
      'winCheck did not return winner as Player 2'
    );

  });

  this.Then(/^the object should have property "([^"]*)" with an array of (\d+) arrays where every inner array have the board position \(row number, column number\)$/, function (combo, four) {
    expect(winCheck).to.have.any.keys(combo,
      'winCheck does not return an object with property combo'
    );

    expect(winCheck.combo.length).to.deep.equal(+four,
      'winCheck combo does not return an array with four array'
    );

    board.matrix = [...Array(6)].map(x => Array(7).fill(2));
    winCheck = board.winCheck();
    expect(winCheck.combo).to.deep.equal([[0, 0], [0, 1], [0, 2], [0, 3]],
      'winCheck did not return correct winning positions of the combo'
    );

  });

  // Scenario: Check the whole board if the game has been draw

  this.When(/^no one has won$/, function () {
    // test further down 
  });

  this.Then(/^method should return an object when draw$/, function () {
    //test further down
  });

  this.Then(/^the object should have property "([^"]*)" with value "([^"]*)" as a string\.$/, function (winner, draw) {
    board.matrix = [
      [2, 1, 2, 1, 2, 2, 1],
      [2, 1, 2, 1, 2, 2, 1],
      [2, 1, 2, 1, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 2],
      [1, 2, 1, 2, 1, 2, 2],
      [1, 2, 1, 2, 1, 2, 2]
    ];
    winCheck = board.winCheck();
    expect(winCheck.winner).to.deep.equal(draw,
      'winCheck did not return correct winning positions of the combo'
    );
  });

  // Scenario: If no one has won or draw

  this.When(/^no one has won or draw$/, function () {
    // test further down
  });

  this.Then(/^method should return value false$/, function () {
    board.matrix = [...Array(6)].map(x => Array(7).fill(0));
    winCheck = board.winCheck();
    expect(winCheck, 'winCheck did not return false even when the game is not over').to.be.false;
  });

}