module.exports = class Board {

  constructor(game) { }

  async makeMove(column) { }

  winCheck() { }

  markWin(combo) { }

  addEventListener() { }

  removeEventListener() { }

  render() { }

}

// make it possible to test on backend
if (typeof global !== 'undefined') { global.Board = Board };