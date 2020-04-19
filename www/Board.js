class Board {

  constructor(game) {
    if (!game instanceof Game) throw console.error('game must be an instance of Game');
    this.game = game;
    this.matrix = [...Array(6)].map(x => Array(7).fill(0));
    this.currentPlayer = 1;
    this.playInProgress = false;
    this.addEventListener();
    this.render();
    this.game.tellTurn(this.currentPlayer);
  }

  async makeMove(column) {
    if (this.playInProgress) return null;
    if (!Number.isInteger(column) || (column > 6 && column < 0)) throw console.error('column must be an integer between 0 and 6');
    this.playInProgress = true;

    //console.log('Made a move at column: ' + column);
    for (let row in this.matrix[column]) {
      if (row !== 0) {
        // Work through array column like this?...
        // 1 check next row, if not 1 || 2 then set current row to player and set previous row to 0... else stop and winCheck()
        // 2 render
        // 3 sleep 50ms
        // 4 repeat from step 1
      }
    }

    /* Some missing steps here
    .
    .
    .
    .
    */

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
        let clickedDiv = event.target.closest('div[name]').getAttribute('name');
        let selectedCol = (clickedDiv % 7);
        let selectedRow = Math.floor(clickedDiv / 7);

        // Some direct testing without makeMove()... just setting clicked to .red
        console.log('You clicked position corresponding to this.matrix[' + selectedRow + '][' + selectedCol + ']');
        this.matrix[selectedRow][selectedCol] = this.currentPlayer;
        this.makeMove(selectedCol);
        this.render();
      });
    }
    else {
      throw console.error('Could not add .board eventlistener!');
    }
  }

  removeEventListener() { }

  render() {
    let totalCount = 0;

    // If board not created
    if ($('.board').innerHTML === '') {
      let totalCount = 0;
      for (let row of this.matrix) {
        for (let column of row) {
          let firstDiv = document.createElement('div');
          let secondDiv = document.createElement('div');
          // Lets set a name attribute
          firstDiv.setAttribute('name', totalCount);
          $('.board').appendChild(firstDiv).appendChild(secondDiv);
          totalCount++;
        }
      }
    }
    else {
      for (let i = 0; i < this.matrix.length; i++) {
        for (let n = 0; n < this.matrix[0].length; n++) {
          // Set corresponding div color to match this.matrix array value
          let currentDiv = $('[name="' + totalCount + '"');
          switch (this.matrix[i][n]) {
            case 0:
              currentDiv.classList.remove('red');
              currentDiv.classList.remove('yellow');
              break;
            case 1:
              currentDiv.classList.add('red');
              break;
            case 2:
              currentDiv.classList.add('yellow');
              break;
          }
          totalCount++;
        }
      }

    }

  }


}

// make it possible to test on backend
if (typeof global !== 'undefined') { global.Board = Board };