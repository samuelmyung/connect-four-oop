"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
// (board[5][0] would be the bottom-left spot on the board)

/** makeBoard: fill in global `board`:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

// Create class called game, add necessary variables and instance methods

class Game{
  constructor(height = 6, width = 7){
    this.height = height;
    this.width = width;
    this.board = [];
  }

  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      const emptyRow = Array(this.width).fill(null);
      this.board.push(emptyRow);
    }
  }

  makeHtmlBoard() {
    const htmlBoard = document.getElementById("board");

    // TODO: add comment for this code
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", `top-${x}`);
      headCell.addEventListener("click", handleClick);
      top.append(headCell);
    }
    htmlBoard.append(top);
}

findSpotForCol(x) {
  for (let y = this.height - 1; y >= 0; y--) {
    if (this.board[y][x] === null) {
      return y;
    }
  }
  return null;
}

placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);

  const spot = document.getElementById(`c-${y}-${x}`);
  spot.append(piece);
}

endGame(msg) {
  alert(msg);
}

checkForWin() {

  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
        ([y, x]) =>
            y >= 0 &&
            y < this.height &&
            x >= 0 &&
            x < this.width &&
            this.board[y][x] === currPlayer
    );
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // get "check list" of 4 cells (starting here) for each of the different
      // ways to win
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win.call(this, horiz)|| _win.call(this, vert) || _win.call(this, diagDR) || _win.call(this, diagDL)) {
        return true;
      }
    }
  }
  return false;
}

}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = Number(evt.target.id.slice("top-".length));

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie: if top row is filled, board is filled
  if (board[0].every(cell => cell !== null)) {
    return endGame('Tie!');
  }

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** Start game. */

function start() {
  makeBoard();
  makeHtmlBoard();
}

start();