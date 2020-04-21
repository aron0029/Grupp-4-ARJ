class Board {

  constructor(game) {
    if (!game instanceof Game) throw console.error('game must be an instance of Game');
    this.game = game;

    // Creating 7x6 2D array. All values set to 0
    this.matrix = [...Array(7)].map(x => Array(6).fill(0));

    // Set initial
    this.currentPlayer = 1;
    this.playInProgress = false;

    // Running
    this.addEventListener();
    this.render();
    this.game.tellTurn(this.currentPlayer);
  }


  async makeMove(column) {
    if (this.playInProgress) return null;
    if (!Number.isInteger(column) || (column > 6 && column < 0)) throw console.error('column must be an integer between 0 and 6');

    // Prevent a move when makeMove() is running
    this.playInProgress = true;

    for (let i = 0; i < this.matrix[column].length; i++) {
      if (this.matrix[column][i] === 0) {
        this.matrix[column][i] = this.currentPlayer;
        // Redraw for animation
        this.render();
        // Pause
        await sleep(50);
        // If next position is occupied break at this position
        if (this.matrix[column][i + 1] !== 0) break;
        // We are currently in a drop animation so set this position to 0 before moving on to next position
        this.matrix[column][i] = 0;
      }
      else {
        // No drop possible, the column is full so do nothing
        this.playInProgress = false;
        return false;
      }
    }

    // Check if won. Does nothing right now
    this.winCheck();

    // Change currentPlayer
    this.currentPlayer = (this.currentPlayer === 1 ? this.currentPlayer = 2 : this.currentPlayer = 1);
    this.game.tellTurn(this.currentPlayer);

    this.playInProgress = false;

    return true;
  }


  winCheck() { }


  markWin(combo) { }


  addEventListener() {
    if ($('.board')) {
      $('.board').addEventListener("click", (event) => {
        let clickedDiv = [...$('.board').children].indexOf(event.target.closest('.board > div'));
        let selectedCol = clickedDiv % this.matrix.length;
        this.makeMove(selectedCol);
      });
    }
    else {
      throw console.error('Could not add .board eventlistener!');
    }
  }


  removeEventListener() { }


  render() {
    // If board divs not exist, create them
    if ($('.board').innerHTML === '') {
      for (let i = 0; i < this.matrix.flat(1).length; i++) {
        let firstDiv = document.createElement('div');
        let secondDiv = document.createElement('div');
        $('.board').appendChild(firstDiv).appendChild(secondDiv);
      }
    }
    // Else when board elements already exist in the DOM
    else {
      // Fetching board divs
      let boardDivs = [...$$('.board > div')];
      // I have no idea how to "flatten" array in correct dimension so using nested for-loops until better solution...
      let currentDiv = 0;
      for (let i = 0; i < this.matrix[0].length; i++) {       // Board rows
        for (let n = 0; n < this.matrix.length; n++) {        // Board columns
          switch (this.matrix[n][i]) {
            case 1: boardDivs[currentDiv].classList.add('red'); break;
            case 2: boardDivs[currentDiv].classList.add('yellow'); break;
            default:
              boardDivs[currentDiv].classList.remove('red');
              boardDivs[currentDiv].classList.remove('yellow');
              break;
          }
          currentDiv++;
        }
      }
    }
  }

} // End of class

// make it possible to test on backend
if (typeof global !== 'undefined') { global.Board = Board };