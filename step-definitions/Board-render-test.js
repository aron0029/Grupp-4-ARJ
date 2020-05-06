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

    expect(renderCalled, 'render was not called running the game').to.be.true;

  });


  this.Given(/^that html div element with class \.board exists when board render method is called when running the game$/, function () {

    expect($('.board'), 'html div element with class .board is missing').to.not.be.null;

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
    expect(parentDivs.length).to.equal(+value, 'render did not create html div parent elements correctly');

    // Each of 42 parents must have exactly 1 child that is div
    parentDivs.map(x => x.children.length === 1 && x.firstChild.localName === 'div' ? childDivs.push(x.firstChild) : '');
    expect(childDivs.length).to.equal(+value, 'render did not create html div child elements correctly');

  });

  this.Then(/^these (\d+) div elements including their children should have no CSS classes added to them at this point$/, function (arg1) {

    let allDivs = [...$('.board').children];

    allDivs.map(x => expect(x.classList.length).to.equal(0, 'html div element should not have any classes added'));

  });


  /* ---------------------------------------------------------------------------------------------- */
  /* ---------- Scenario: Game should update GUI when valid move is made by red player 1 ---------- */
  /* ---------------------------------------------------------------------------------------------- */

  this.Given(/^that html div element with class \.board exists when board render method is called when red player (\d+) makes a move$/, function (arg1) {

    expect($('.board'), 'html div element with class .board is missing').to.not.be.null;

  });


  this.Given(/^that board render method was called after move was made by red player$/, async function () {

    // Precondition for next step-definition
    lastPlayer = fakeGame.board.currentPlayer;

    renderCalled = false;

    await fakeGame.board.makeMove(0);

    expect(renderCalled, 'render was not called during move').to.be.true;

  });


  this.When(/^board currentPlayer property value was (\d+) on move by red player$/, function (value) {

    // Last player from previous step-definition
    expect(lastPlayer).to.equal(+value, 'move should be made by red player 1');

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
    expect($$('.red').length).to.equal(1, 'wrong number of game pieces rendered in GUI');
    expect($$('.yellow').length).to.equal(0, 'wrong number of game pieces rendered in GUI');

    // Check that .red div corresponds to column passed to makeMove
    expect([...$('.board').children].indexOf($('.red')) % 7).to.equal(column,
      'wrong placement of game pieces rendered in GUI');

    // Checking that .red div corresponds to bottom of row in board matrix
    expect(Math.floor([...$('.board').children].indexOf($('.red')) / 7)).to.equal(realGame.board.matrix.length - 1,
      'placement of game pieces rendered in GUI does not match board matrix array');

  });


  this.Then(/^all previous moves should remain visible including red players move and correspond to values in property board matrix array$/, async function () {

    // Making sure yellow player 2 is current
    realGame.board.currentPlayer = 2;

    // Dropping a single yellow piece (above previous red piece) in column 3
    let column = 3;
    await realGame.board.makeMove(column);

    // Should be a single .red div and single .yellow div at this point
    expect($$('.red').length).to.equal(1, 'wrong number of game pieces rendered in GUI');
    expect($$('.yellow').length).to.equal(1, 'wrong number of game pieces rendered in GUI');

    // Check that .red and .yellow div corresponds to column passed to makeMove
    expect([...$('.board').children].indexOf($('.red')) % 7).to.equal(column,
      'wrong placement of game pieces rendered in GUI');
    expect([...$('.board').children].indexOf($('.yellow')) % 7).to.equal(column,
      'wrong placement of game pieces rendered in GUI');

    // Checking that .red div still corresponds to bottom of row in board matrix
    expect(Math.floor([...$('.board').children].indexOf($('.red')) / 7)).to.equal(realGame.board.matrix.length - 1,
      'placement of game pieces rendered in GUI does not match board matrix array');

    // Checking that .yellow div corresponds to second row from bottom in board matrix
    expect(Math.floor([...$('.board').children].indexOf($('.yellow')) / 7)).to.equal(realGame.board.matrix.length - 2,
      'placement of game pieces rendered in GUI does not match board matrix array');

  });


  /* ------------------------------------------------------------------------------------------------- */
  /* ---------- Scenario: Game should update GUI when valid move is made by yellow player 2 ---------- */
  /* ------------------------------------------------------------------------------------------------- */

  this.Given(/^that html div element with class \.board exists when board render method is called when yellow player (\d+) makes a move$/, function (arg1) {

    expect($('.board'), 'html div element with class .board is missing').to.not.be.null;

  });


  this.Given(/^that board render method was called after move was made by yellow player$/, async function () {

    // Precondition for next step-definition
    lastPlayer = fakeGame.board.currentPlayer;

    renderCalled = false;

    await fakeGame.board.makeMove(0);

    expect(renderCalled, 'render was not called during move').to.be.true;

  });

  this.When(/^board currentPlayer property value was (\d+) on move by yellow player$/, function (value) {

    // Last player from previous step-definition
    expect(lastPlayer).to.equal(+value, 'move should be made by yellow player 2');

  });


  this.Then(/^class \.yellow should be added to one of the (\d+) html div elements corresponding to last player move$/, async function (arg1) {

    // Resetting matrix
    realGame.board.matrix = JSON.parse(JSON.stringify(initialMatrix));

    // Resetting game board in DOM
    $('.board').innerHTML = '';
    realGame.board.render();

    // Making sure red player 1 is current
    realGame.board.currentPlayer = 2;

    // Dropping a single red piece in column 3
    let column = 3;
    await realGame.board.makeMove(column);

    // Should only be a single .red div at this point
    expect($$('.yellow').length).to.equal(1, 'wrong number of game pieces rendered in GUI');
    expect($$('.red').length).to.equal(0, 'wrong number of game pieces rendered in GUI');

    // Check that .red div corresponds to column passed to makeMove
    expect([...$('.board').children].indexOf($('.yellow')) % 7).to.equal(column,
      'wrong placement of game pieces rendered in GUI');

    // Checking that .red div corresponds to bottom of row in board matrix
    expect(Math.floor([...$('.board').children].indexOf($('.yellow')) / 7)).to.equal(realGame.board.matrix.length - 1,
      'placement of game pieces rendered in GUI does not match board matrix array');

  });


  this.Then(/^all previous moves should remain visible including yellow players move and correspond to values in property board matrix array$/, async function () {

    // Making sure red player 1 is current
    realGame.board.currentPlayer = 1;

    // Dropping a single yellow piece (above previous red piece) in column 3
    let column = 3;
    await realGame.board.makeMove(column);

    // Should be a single .red div and single .yellow div at this point
    expect($$('.yellow').length).to.equal(1, 'wrong number of game pieces rendered in GUI');
    expect($$('.red').length).to.equal(1, 'wrong number of game pieces rendered in GUI');

    // Check that .red and .yellow div corresponds to column passed to makeMove
    expect([...$('.board').children].indexOf($('.yellow')) % 7).to.equal(column,
      'wrong placement of game pieces rendered in GUI');
    expect([...$('.board').children].indexOf($('.red')) % 7).to.equal(column,
      'wrong placement of game pieces rendered in GUI');

    // Checking that .yellow div still corresponds to bottom of row in board matrix
    expect(Math.floor([...$('.board').children].indexOf($('.yellow')) / 7)).to.equal(realGame.board.matrix.length - 1,
      'placement of game pieces rendered in GUI does not match board matrix array');

    // Checking that .red div corresponds to second row from bottom in board matrix
    expect(Math.floor([...$('.board').children].indexOf($('.red')) / 7)).to.equal(realGame.board.matrix.length - 2,
      'placement of game pieces rendered in GUI does not match board matrix array');

  });


  /* ------------------------------------------------------------------ */
  /* ---------- Scenario: Render full game board during game ---------- */
  /* ------------------------------------------------------------------ */

  this.Given(/^upon rendering that every position on game board is filled by game pieces$/, function () {

    // Precondition nothing to test here...

    // Resetting game board in DOM
    $('.board').innerHTML = '';
    realGame.board.render();

    realGame.board.matrix = [
      [2, 1, 2, 1, 2, 1, 2],
      [2, 1, 2, 1, 2, 1, 2],
      [2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 2, 1]
    ];

  });

  this.When(/^render has been called to render full game board$/, function () {

    // Precondition nothing to test here...

    realGame.board.render();

  });

  this.Then(/^all classes added to full game board divs should exactly correspond to values in board matrix property$/, function () {

    let allDivs = [...$('.board').children];

    // Lets make a 6x7 matrix array of divs instead, yay!
    let allDivsMatrix = [[], [], [], [], [], []];
    let divCount = 0;
    for (let i = 0; i < 6; i++) {
      for (let n = 0; n < 7; n++) {

        // Why not check for double classes at the same time
        expect(allDivs[divCount].classList.length).to.be.below(2);

        switch (allDivs[divCount].className) {
          case 'red': allDivsMatrix[i][n] = 1; break;
          case 'yellow': allDivsMatrix[i][n] = 2; break;
          default: allDivsMatrix[i][n] = 0;
        }
        divCount++;
      }
    }

    expect(allDivsMatrix).to.deep.equal(realGame.board.matrix,
      'placement of game pieces rendered in GUI does not match board matrix array');

  });


  /* ------------------------------------------------------------------------- */
  /* ---------- Scenario: Render half filled game board during game ---------- */
  /* ------------------------------------------------------------------------- */

  this.Given(/^upon rendering that half of the positions on game board are filled with game pieces$/, function () {

    // Precondition nothing to test here...

    // Resetting game board in DOM
    $('.board').innerHTML = '';
    realGame.board.render();

    realGame.board.matrix = [
      [0, 0, 0, 0, 0, 0, 2],
      [0, 0, 0, 0, 0, 2, 1],
      [0, 0, 0, 0, 1, 2, 1],
      [0, 0, 0, 1, 2, 1, 2],
      [0, 0, 2, 1, 2, 1, 2],
      [0, 2, 1, 2, 1, 2, 1]
    ];

  });

  this.When(/^render has been called to render half filled game board$/, function () {

    // Precondition nothing to test here...

    realGame.board.render();

  });

  this.Then(/^all classes added to half filled game board divs should exactly correspond to values in board matrix property$/, function () {

    let allDivs = [...$('.board').children];

    // Lets make a 6x7 matrix array of divs instead, yay!
    let allDivsMatrix = [[], [], [], [], [], []];
    let divCount = 0;
    for (let i = 0; i < 6; i++) {
      for (let n = 0; n < 7; n++) {

        // Why not check for double classes at the same time
        expect(allDivs[divCount].classList.length).to.be.below(2);

        switch (allDivs[divCount].className) {
          case 'red': allDivsMatrix[i][n] = 1; break;
          case 'yellow': allDivsMatrix[i][n] = 2; break;
          default: allDivsMatrix[i][n] = 0;
        }
        divCount++;
      }
    }

    expect(allDivsMatrix).to.deep.equal(realGame.board.matrix,
      'placement of game pieces rendered in GUI does not match board matrix array');

  });

}