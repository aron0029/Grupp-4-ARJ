class Game {

  constructor() { }

  start() { }

  tellTurn(player) { }

  over(won) { }

  addEventListener() { }

}

// make it possible to test on backend
if (typeof global !== 'undefined') { global.Game = Game };