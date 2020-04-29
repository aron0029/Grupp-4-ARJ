require('./_include-all')();

module.exports = function () {

  let realGame = new Game();
  let fakeGame = {};
  let tellTurnCalled = false;
  let tellTurnplayer;

  class FakeGame extends Game {
    tellTurn(player) {
      tellTurnCalled = true;
      tellTurnplayer = player;
    }
  }

  this.When(/^tellTurn method is called$/, function () {
    fakeGame = new FakeGame();
    expect(tellTurnCalled).to.be.true;
  });

  this.Then(/^argument "([^"]*)" should be either (\d+) or (\d+)$/, function (arg1, arg2, arg3) {
    expect(tellTurnplayer).to.be.a('number');
    expect(tellTurnplayer).to.be.oneOf([1, 2]);
  });

  this.Then(/^if "([^"]*)" is not 1 or 2, it should throw error "([^"]*)"$/, function (arg1, expectedError) {
    expect(() => realGame.tellTurn('nisse')).to.throw(Error, expectedError, 'tellTurn did not throw expected error');
  });


  this.Then(/^in DOM element with css class 'message' change innerHTML content to "([^"]*)" if player is (\d+)$/, function (arg1, arg2) {
    expect({a: 1}).to.have.property('röds tur...'); 
    expect({a: 2}).to.have.property('guls tur...'); 
  });

  // And in DOM element with css class 'message' change innerHTML content to "Röds tur..." if player is 1


  this.Then(/^change innerHTML content to "([^"]*)" if player is (\d+)$/, function (arg1, arg2) {
    
  });

}
 