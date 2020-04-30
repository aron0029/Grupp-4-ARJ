// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {

  let renderCalled = false;
  let realGame;
  let lastPlayer;

  class FakeGame extends Game {
    start() { this.board = new FakeBoard(this); }
  }

  class FakeBoard extends Board {
    render() { renderCalled = true; }
  }

  let fakeGame = new FakeGame();

  // By principle I don't necessarily want to introduce my own testdata by creating/filling an array,
  // so as tester i'm doing deep copy/clone of whatever developer did
  let initialMatrix = JSON.parse(JSON.stringify(fakeGame.board.matrix));


  /* -------------------------------------------------------------------------------- */
  /* ---------- Scenario: Running the game should draw an empty game board ---------- */
  /* -------------------------------------------------------------------------------- */

  this.Given(/^that board render method is called by board constructor when running the game$/, function () {

    expect(renderCalled).to.be.true;

  });


  this.Given(/^that html div element with class \.board exists when board render method is called when running the game$/, function () {

    expect($('.board')).to.not.be.null;

  });


  this.Then(/^(\d+) html div elements should be added as children of that html div element each with a html div element child of their own$/, function (value) {

    // Clearing any DOM content by main.js when creating new Game()
    $('.board').innerHTML = '';

    // Instance of realGame since we need an initial render here
    realGame = new Game();

    let allDivs = [...$('.board').children];
    let parentDivs = [];
    let childDivs = [];

    // .board div must have exactly 42 children that are divs
    allDivs.map(x => x.localName === 'div' ? parentDivs.push(x) : '');
    expect(parentDivs.length).to.equal(+value);

    // Each of 42 parents must have exactly 1 child that is div
    parentDivs.map(x => x.children.length === 1 && x.firstChild.localName === 'div' ? childDivs.push(x.firstChild) : '');
    expect(childDivs.length).to.equal(+value);

  });


  /* ---------------------------------------------------------------------------------------------- */
  /* ---------- Scenario: Game should update GUI when valid move is made by red player 1 ---------- */
  /* ---------------------------------------------------------------------------------------------- */

  this.Given(/^that html div element with class \.board exists when board render method is called when red player (\d+) makes a move$/, function (arg1) {

    expect($('.board')).to.not.be.null;

  });


  this.Given(/^that board render method was called after move was made by red player$/, async function () {

    // Precondition for next step-definition
    lastPlayer = fakeGame.board.currentPlayer;

    renderCalled = false;

    await fakeGame.board.makeMove(0);

    expect(renderCalled).to.be.true;

  });


  this.When(/^board currentPlayer property value was (\d+) on move by red player$/, function (value) {

    // Last player from previous step-definition
    expect(lastPlayer).to.equal(+value);

  });


  this.Then(/^class \.red should be added to one of the (\d+) html div elements corresponding to last player move$/, async function (arg1) {

    // Resetting matrix
    realGame.board.matrix = JSON.parse(JSON.stringify(initialMatrix));

    // Resetting game board in DOM
    $('.board').innerHTML = '';
    realGame.board.render();

    // Making sure red player 1 is current
    realGame.board.currentPlayer = 1;

    // Dropping a single red piece in column 3
    let column = 3;
    await realGame.board.makeMove(column);

    // Should only be a single .red div at this point
    expect($$('.red').length).to.equal(1);
    expect($$('.yellow').length).to.equal(0);

    // Check column
    expect([...$('.board').children].indexOf($('.red')) % 7).to.equal(column);

    // Checking that .red div corresponds to bottom of row in board matrix
    expect(Math.floor([...$('.board').children].indexOf($('.red')) / 7)).to.equal(realGame.board.matrix.length - 1);

  });


  this.Then(/^all previous moves should remain visible including red player 1's and correspond to values in property board matrix array$/, async function () {

    // Resetting matrix
    realGame.board.matrix = JSON.parse(JSON.stringify(initialMatrix));

    // Resetting divs
    $('.board').innerHTML = '';
    realGame.board.render();

    // Making sure red player 1 is current
    realGame.board.currentPlayer = 1;

    // Dropping a single piece in each column and checking corresponding div
    let players = ['yellow', 'red'];
    for (let i = 0; i < realGame.board.matrix[0].length; i++) {

      await realGame.board.makeMove(i);

      // Starting at div [index 35]
      expect([...$('.board').children][35 + i].className).to.equal(players[realGame.board.currentPlayer - 1]);
    }

    // Checking divs against board matrix
    players.reverse();
    for (let i = 0; i < realGame.board.matrix[0].length; i++) {

      // Starting at div [index 35]
      expect([...$('.board').children][35 + i].className).to.equal(players[realGame.board.matrix[5][i] - 1]);

    }

  });


  /* ------------------------------------------------------------------------------------------------- */
  /* ---------- Scenario: Game should update GUI when valid move is made by yellow player 2 ---------- */
  /* ------------------------------------------------------------------------------------------------- */

  this.Given(/^that html div element with class \.board exists when board render method is called when yellow player (\d+) makes a move$/, function (arg1) {

    expect($('.board')).to.not.be.null;

  });


  this.Given(/^that board render method was called after move was made by yellow player$/, async function () {

    // Precondition for next step-definition
    lastPlayer = fakeGame.board.currentPlayer;

    renderCalled = false;

    await fakeGame.board.makeMove(0);

    expect(renderCalled).to.be.true;

  });

  this.When(/^board currentPlayer property value was (\d+) on move by yellow player$/, function (value) {

    // Last player from previous step-definition
    expect(lastPlayer).to.equal(+value);

  });


  this.Then(/^class \.yellow should be added to one of the (\d+) html div elements corresponding to last player move$/, async function (arg1) {

    // Resetting matrix
    realGame.board.matrix = JSON.parse(JSON.stringify(initialMatrix));

    // Resetting divs
    $('.board').innerHTML = '';
    realGame.board.render();

    // Making sure yellow player 2 is current
    realGame.board.currentPlayer = 2;

    // Dropping a single yellow piece in column 3
    let column = 3;
    await realGame.board.makeMove(column);

    // Should only be a single .yellow div at this point
    expect($$('.yellow').length).to.equal(1);
    expect($$('.red').length).to.equal(0);

    // Check column
    expect([...$('.board').children].indexOf($('.yellow')) % 7).to.equal(column);

    // Checking that .yellow div corresponds to bottom of row in board matrix
    expect(Math.floor([...$('.board').children].indexOf($('.yellow')) / 7)).to.equal(realGame.board.matrix.length - 1);

  });


  this.Then(/^all previous moves should remain visible including yellow player 2's and correspond to values in property board matrix array$/, async function () {

    // Resetting matrix
    realGame.board.matrix = JSON.parse(JSON.stringify(initialMatrix));

    // Resetting divs
    $('.board').innerHTML = '';
    realGame.board.render();

    // Making sure red player 1 is current
    realGame.board.currentPlayer = 2;

    // Dropping a single piece in each column and checking corresponding div
    let players = ['yellow', 'red'];
    for (let i = 0; i < realGame.board.matrix[0].length; i++) {

      await realGame.board.makeMove(i);

      // Starting at div [index 35]
      expect([...$('.board').children][35 + i].className).to.equal(players[realGame.board.currentPlayer - 1]);
    }

    // Checking divs against board matrix
    players.reverse();
    for (let i = 0; i < realGame.board.matrix[0].length; i++) {

      // Starting at div [index 35]
      expect([...$('.board').children][35 + i].className).to.equal(players[realGame.board.matrix[5][i] - 1]);

    }

  });

}