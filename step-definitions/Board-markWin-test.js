// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();

module.exports = function () {

  // Overrides

  let markWinWasCalled = false;
  let tellTurnPlayer = [];
  let comboType;

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

  let board;
  let game;

  // Scenario: The game was won by a player

  this.Given(/^a player wins the game$/, function () {
    game = new FakeGame();
    board = game.board;

    board.matrix = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0]
    ];
  });

  this.Given(/^board makeMove method called board markWin method$/, async function () {
    await board.makeMove(0);

    expect(markWinWasCalled, 'markWin was not called').to.be.true;
  });

  this.Then(/^the argument passed to markWin method should be a type array with a length of (\d+)$/, function (four) {
    expect(comboType).to.be.an('array'
      , 'argument combo is not an array'
    );
    expect(comboType, 'argument combo length should be 4').to.have.lengthOf(+four);
  });

  this.Then(/^each of the (\d+) elements of this array should be a type 'array' with (\d+) elements each containing type 'number'$/, function (four, two) {
    comboType.map(x => expect(x).to.be.an('array'
      , 'argument combo inner elements is not an array'
    ));

    comboType.map(x => x.map(y => expect(y).to.be.a('number',
      'elements in combo is not containing numbers'
    )));
  });

  this.Then(/^first of these (\d+) elements be set to a value between (\d+) to (\d+) and the second element be set to a value of (\d+) to (\d+)$/, function (two, zero, six, zero2, seven) {
    comboType.map(x => expect(x[0]).to.be.within(zero, six,
      'first element in combo is not between 0 and 6'
    ))
    comboType.map(x => expect(x[1]).to.be.within(zero2, seven,
      'second element in combo is not between 0 and 7'
    ))

  });

  this.Then(/^markWin should add the class \.win to html div elements that correspond to the winning rows position in board matrix$/, async function () {
    let game2 = new FakeGame2();
    board = game2.board;
    board.render();

    board.matrix = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0]
    ];

    await board.makeMove(0);
    let winningIndex = [14, 21, 28, 35]

    for (let i = 0; i <= 3; i++) {
      expect(winningIndex).to.include([...$$('.board > div')].indexOf([...$$('.win')][i]),
        'markWin is not setting .win class in right div position'
      )
    }
  });

  // Scenario: The game was a draw

  this.Given(/^the board is full without any player winning$/, function () {
    board.matrix = [
      [2, 0, 2, 1, 2, 2, 1],
      [2, 1, 2, 1, 2, 2, 1],
      [2, 1, 2, 1, 2, 2, 1],
      [1, 2, 1, 2, 1, 2, 2],
      [1, 2, 1, 2, 1, 2, 2],
      [1, 2, 1, 2, 1, 2, 2]
    ];
  });

  this.Then(/^markWin should not be called$/, async function () {
    markWinWasCalled = false;
    await board.makeMove(1);
    expect(markWinWasCalled, 'markWin should not be called when draw').to.be.false;
  });

}