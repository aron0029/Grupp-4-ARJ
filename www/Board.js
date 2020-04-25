class Board {

  constructor(game) {
    if (!(game instanceof Game)) throw (new Error('game must be an instance of Game'));
    this.game = game;

    // Creating 6x7 2D array. All values set to 0
    this.matrix = [...Array(6)].map(x => Array(7).fill(0));

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
    if (!Number.isInteger(column) || (column > 6 && column < 0)) throw (new Error('column must be an integer between 0 and 6'));

    // Prevent a move when makeMove() is running
    this.playInProgress = true;

    for (let i = 0; i < this.matrix.length; i++) {
      if (this.matrix[i][column] === 0) {
        this.matrix[i][column] = this.currentPlayer;
        // Redraw for animation
        this.render();
        // Pause
        await sleep(50);
        // Check if there is another element of the array
        if ((i + 1) < this.matrix.length) {
          if (this.matrix[i + 1][column] !== 0) {
            // Next position was occupied so break at this position
            break;
          }
          else {
            // Next position was free. As we are currently in a drop animation set this position to 0 before moving on to next
            this.matrix[i][column] = 0;
          }
        }
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
      this.listener = (event) => {
        let clickedDiv = [...$('.board').children].indexOf(event.target.closest('.board > div'));
        let selectedCol = clickedDiv % this.matrix[0].length;
        // Unused. Keep for unit-testing purposes. This will give the row of a clicked div
        //let selectedRow = Math.floor(clickedDiv / this.matrix[0].length);
        //console.log('You clicked position corresponding to this.matrix[' + selectedRow + '][' + selectedCol + ']');
        //this.matrix[selectedRow][selectedCol] = this.currentPlayer;
        //this.render();
        this.makeMove(selectedCol);
      };
      $('.board').addEventListener("click", this.listener);
    }
    else {
      throw (new Error('Could not add .board eventlistener!'));
    }
  }


  removeEventListener() { }


  render() {
    // If board empty create child divs
    if (!$('.board').innerHTML) {
      for (let i = 0; i < this.matrix.flat(1).length; i++) {
        let firstDiv = document.createElement('div');
        let secondDiv = document.createElement('div');
        $('.board').appendChild(firstDiv).appendChild(secondDiv);
      }
    }
    // Else when board child divs already exist
    else {
      let boardDivs = [...$$('.board > div')];
      let currentDiv = 0;
      for (let i = 0; i < this.matrix.length; i++) {        // A board row [6]
        for (let n = 0; n < this.matrix[0].length; n++) {   // Board columns [7]
          switch (this.matrix[i][n]) {
            case 1: boardDivs[currentDiv].classList.add('red'); break;
            case 2: boardDivs[currentDiv].classList.add('yellow'); break;
            default:
              boardDivs[currentDiv].classList.remove('red');
              boardDivs[currentDiv].classList.remove('yellow');
          }
          currentDiv++;
        }
      }
    }
  }

} // End of class

// make it possible to test on backend
if (typeof global !== 'undefined') { global.Board = Board };