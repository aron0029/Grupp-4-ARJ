require('./_include-all')();
require('./_async-helpers.js');

module.exports = function () {
  this.After(() => fixNoSuchWindowError(driver));

  let Board;
  let Start = false;
  let Game;




  this.Given(/^that the method start\(\) is called$/, function () {
    expect(Start).to.be.callback;

  });



  this.Then(/^it should create an instance of Board$/, function () {
    expect(Board).to.be.instanceof.Start;

  });



  this.Then(/^send current instance of Game to Boards constructor$/, function () {
    expect(Game).to.be.an.instanceof.Board;

  });


  this.Then(/^save the instance in property "([^"]*)"\.$/, function (value) {
    expect(Start).to.be.instanceof.Board;

  });


}