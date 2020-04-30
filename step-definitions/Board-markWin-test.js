// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {

  // Overrides

  let markWinWasCalled = false;
  let tellTurnPlayer = [];
  let comboType;
  let game;

  class FakeGame extends Game {
    start() { this.board = new FakeBoard(this); }
    tellTurn(player) { tellTurnPlayer.push(player); }
  }

  class FakeBoard extends Board {
    markWin(combo) { markWinWasCalled = true; comboType = combo }
  }

  class FakeGame2 extends Game {
    start() { this.board = new FakeBoard2(this); }
    tellTurn(player) { tellTurnPlayer.push(player); }
  }
  class FakeBoard2 extends Board { }

  // Scenario: The game was won by a player

  this.Given(/^a player wins the game$/, async function () {

    game = new FakeGame();

    game.board.matrix = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0]
    ];
    await game.board.makeMove(0);

  });

  this.Given(/^board makeMove method called board markWin method$/, function () {

    expect(markWinWasCalled, 'markWin was not called').to.be.true;

  });

  this.Then(/^the argument passed to markWin method should be a type "([^"]*)" with a length of (\d+)$/, function (typeArray, arrayLength) {

    expect(comboType).to.be.an(typeArray
      , 'argument combo is not an array'
    );

    expect(comboType).to.have.lengthOf(+arrayLength
      , 'argument combo length should be 4');

  });

  this.Then(/^each of the four elements of this array should be a type "([^"]*)" with (\d+) elements each containing type "([^"]*)"$/, function (typeArray, posValueLength, typeNumber) {

    comboType.map(x => expect(x).to.be.an(typeArray
      , 'argument combo inner elements is not an array'
    ));

    comboType.map(x => expect(x).to.have.lengthOf(+posValueLength
      , 'each inner array of combo must be 2 in length'
    ));

    comboType.map(x => x.map(y => expect(y).to.be.a(typeNumber,
      'elements in combo is not containing numbers'
    )));

  });

  this.Then(/^first of these two elements be set to a value between (\d+) to (\d+) and the second element be set to a value of (\d+) to (\d+)$/, function (minRow, maxRow, minCol, maxCol) {

    comboType.map(x => expect(x[0]).to.be.within(minRow, maxRow,
      'first element in combo is not between 0 and 6 (row)'
    ))
    comboType.map(x => expect(x[1]).to.be.within(minCol, maxCol,
      'second element in combo is not between 0 and 7 (col)'
    ))

  });

  this.Then(/^markWin should add the class \.win to html div elements that correspond to the winning rows position in board matrix$/, async function () {

    let game2 = new FakeGame2();

    game2.board.matrix = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0]
    ];

    await game2.board.makeMove(0);
    let winningIndex = [14, 21, 28, 35]

    for (let i = 0; i <= 3; i++) {
      expect(winningIndex).to.include([...$$('.board > div')].indexOf([...$$('.win')][i]),
        'markWin is not setting .win class in right div position'
      )
    }

  });

  // Scenario: The game was a draw

  this.Given(/^the board is full without any player winning$/, async function () {

    game.board.matrix = [
      [2, 0, 2, 1, 2, 2, 1],
      [2, 1, 2, 1, 2, 2, 1],
      [2, 1, 2, 1, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 2],
      [1, 2, 1, 2, 1, 2, 2],
      [1, 2, 1, 2, 1, 2, 2]
    ];
    markWinWasCalled = false;
    await game.board.makeMove(1);

  });

  this.Then(/^markWin should not be called$/, function () {

    expect(markWinWasCalled, 'markWin should not be called when draw').to.be.false;

  });

}