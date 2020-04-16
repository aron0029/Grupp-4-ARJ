// emulate helpers in backend
const jsdom = require("jsdom");
module.exports = function includeAll() {
  const { JSDOM } = jsdom;
  const DOM = new JSDOM('<!DOCTYPE html><div class="board"></div><div class="message"></div>');
  global.sleep = (ms) => new Promise(res => setTimeout(res, ms));
  global.$ = (x) => DOM.window.document.querySelector(x);
  global.$$ = (x) => DOM.window.document.querySelectorAll(x);
  // import the classes (that will add themselves to global)
  require('../www/Game.js');
  require('../www/Board.js');
}