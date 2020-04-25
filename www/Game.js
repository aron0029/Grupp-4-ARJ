class Game {

  constructor() {
    this.board = {};
    this.addEventListener();
    this.start();
  }

  start() {
    this.board = new Board(this);
  }

  tellTurn(player) {
    if (player !== 1 && player !== 2) throw (new Error('player must be 1 or 2'));
    let message = $('.message');
    player === 1 ? message.innerHTML = 'Röds tur...' : message.innerHTML = 'Guls tur...';
  }

  over(won) {
    if (won !== 1 && won !== 2 && won !== 'draw') throw (new Error('won must be “draw”, 1 or 2'));
    let message = $('.message');
    switch (won) {
      case 1: message.innerHTML = 'Röd vann!'; break;
      case 2: message.innerHTML = 'Gul vann!'; break;
      default: message.innerHTML = 'Det blev oavgjort!';
    }
    let againButton = document.createElement('button');
    againButton.className = 'again';
    againButton.innerHTML = 'Spela igen';
    againButton.setAttribute('type', 'button');
    message.appendChild(againButton);
  }

  addEventListener() {
    if ($('.message')) {
      $('.message').addEventListener("click", () => this.start());
    }
    else {
      throw (new Error('Could not add .message eventlistener!'));
    }
  }
}

// make it possible to test on backend
if (typeof global !== 'undefined') { global.Game = Game };