class Game {

  constructor() {
    this.board = {};
    this.addEventListener();

    if (window.phantom) {
      this.playerNames = ['Röd', 'Gul'];
    } else {
      this.playerNames = [
        prompt('Ange namn för spelare 1:'),
        prompt('Ange namn för spelare 2:')
      ];
    }

    this.start();
  }

  start() {
    this.board = new Board(this);
  }

  tellTurn(player) {
    if (player !== 1 && player !== 2) { throw (new Error('player must be 1 or 2')); }
    let message = $('.message');
    player === 1 ? message.innerHTML = (this.playerNames[0] + 's tur...') : message.innerHTML = (this.playerNames[1] + 's tur...');
  }

  over(won) {
    if (won !== 1 && won !== 2 && won !== 'draw') { throw (new Error('won must be “draw”, 1 or 2')); }
    let message = $('.message');
    switch (won) {
      case 1: message.innerHTML = this.playerNames[0] + ' vann!'; break;
      case 2: message.innerHTML = this.playerNames[1] + ' vann!'; break;
      default: message.innerHTML = 'Det blev oavgjort!';
    }
    let againButton = document.createElement('button');
    againButton.className = 'again';
    againButton.innerHTML = 'Spela igen';
    againButton.setAttribute('type', 'button');
    message.appendChild(againButton);
  }

  addEventListener() {
    $('.message').addEventListener("click", (event) => {
      if (event.target.classList.contains('again')) { this.start(); }
    });

  }
}

// make it possible to test on backend
if (typeof global !== 'undefined') { global.Game = Game };