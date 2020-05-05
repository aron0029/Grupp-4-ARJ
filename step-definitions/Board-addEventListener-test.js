// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {

  let addEventListenerWasCalled = false;
  let fakeGameOne;
  let fakeGameTwo;
  let columnInput;


  // Overrides

  class FakeGameOne extends Game {
    start() { this.board = new FakeBoardOne(this); }
  }

  class FakeBoardOne extends Board {
    addEventListener() { addEventListenerWasCalled = true; }
  }

  class FakeGameTwo extends Game {
    start() { this.board = new FakeBoardTwo(this); }
  }

  class FakeBoardTwo extends Board {
    makeMove(column) { columnInput = column; }
  }


  /* -------------------------------------------------------------------------------------- */
  /* ---------- Scenario: addEventListener should be called in Board constructor ---------- */
  /* -------------------------------------------------------------------------------------- */

  this.When(/^new Board is created for a new Game$/, function () {

    // Nothing to test here

  });


  this.Then(/^Board constructor should call addEventListener method$/, function () {

    fakeGameOne = new FakeGameOne();

    expect(addEventListenerWasCalled, 'addEventListener was not called by Board constructor').to.be.true;

  });


  /* ----------------------------------------------------------------------------------------------- */
  /* ---------- Scenario: When game has ended and board eventlistener is no longer needed ---------- */
  /* ----------------------------------------------------------------------------------------------- */

  this.Given(/^click event is raised by any html child element of html div element with class \.board$/, function () {

    // Clearing any eventlisteners from previous instances of Game and Board used in other tests
    document.body.removeChild($('.board'));
    let newBoardDiv = document.createElement('div');
    newBoardDiv.className = 'board';
    document.body.insertBefore(newBoardDiv, $('.message'));

    // Starting new game
    fakeGameTwo = new FakeGameTwo();

    // Testing a single click
    $('.board').firstChild.click();
    expect(columnInput).to.equal(0, 'wrong argument value passed by board eventlistener function on click');

  });


  this.Then(/^eventlistener should call board makeMove method passing selected column as type "([^"]*)" between (\d+) to (\d+) to board makeMove method$/, function (value1, value2, value3) {

    let allDivs = [...$('.board').children];

    // Simulating clicks on all divs in every column
    for (let i = 0; i < fakeGameTwo.board.matrix[0].length; i++) {
      for (let n = 0; n < allDivs.length; n += 7) {

        allDivs[i + n].click();

        // Checking value
        expect(columnInput).to.equal(i, 'wrong argument value passed by board eventlistener function on click');

        // For the sake of testing
        expect(typeof columnInput).to.equal(value1, 'wrong argument type passed by board eventlistener function on click');
        expect(Number.isInteger(columnInput), 'wrong argument value passed by board eventlistener function on click').to.be.true;

        // Since we tested its an integer
        expect(columnInput, 'wrong argument value passed by board eventlistener function on click').to.be.at.least(value2).and.at.most(value3);
      }
    }

  });

}