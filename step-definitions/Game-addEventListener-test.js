// This requires Game, Board, sleep, $ and $$ as globals
// (do this in each step-definition file in this project)
require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {

  let startTimesCalled = 0;
  let addEventListenerCalled = false;
  let fakeGameOne;
  let fakeGameTwo;

  class FakeGameOne extends Game {
    addEventListener() { addEventListenerCalled = true; }
  }

  class FakeGameTwo extends Game {
    start() {
      this.board = new Board(this);
      startTimesCalled++;
    }
  }


  this.Given(/^eventlistener listening for click events was added to html div element with class \.message$/, function () {

    fakeGameOne = new FakeGameOne();

    expect(addEventListenerCalled, 'addEventListener was not called by Game constructor').to.be.true;

  });


  this.When(/^click event is raised by clicking child element button with class \.again$/, function () {

    // If needed. Clearing any eventlisteners from previous instances of Game and Board used in other tests
    document.body.removeChild($('.message'));
    let newMessageDiv = document.createElement('div');
    newMessageDiv.className = 'message';
    document.body.appendChild(newMessageDiv);

    // Starting new game
    fakeGameTwo = new FakeGameTwo();

    // Creating play again button
    fakeGameTwo.over(1);

    // Check if start was called a second time
    $('.again').click();
    expect(startTimesCalled).to.equal(2, 'start was not called when clicking play again button');

  });


  this.Then(/^eventlistener should call game start method to create an empty new Board$/, function () {

    // Saving current instance
    let oldBoard = fakeGameTwo.board;

    // Filling board with red
    fakeGameTwo.board.matrix = [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1]
    ];

    // Re-rendering and creating play again button
    fakeGameTwo.board.render();
    fakeGameTwo.over(1);

    $('.again').click();

    // Checking for new instance
    expect(oldBoard).to.not.deep.equal(fakeGameTwo.board, 'new instance of Board was not created');

    // Also Checking that new board rendered an empty board using its own matrix
    expect($$('.red').length).to.equal(0, 'an empty board was not rendered');

  });

}