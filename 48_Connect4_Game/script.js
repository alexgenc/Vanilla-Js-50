const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

let gameFinished = false;

function makeBoard() {
  // set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT ; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

function makeHtmlBoard() {
  // cache "htmlBoard" selector
  const htmlBoard = document.querySelector("#board");
  
  // create a top row
  const top = document.createElement("tr");
  // give it an id: column-top
  top.setAttribute("id", "column-top");
  // add a click event listener and call handleClick when user clicks 
  top.addEventListener("click", handleClick);

  // create cells for the top row
  for (let x = 0; x < WIDTH; x++) {
    // create WIDTH num of new cells
    const headCell = document.createElement("td");
    // give cells their respective x value as their id
    headCell.setAttribute("id", x);
    // append these cells to the top row
    top.append(headCell);
  }
  // append the top row to the htmlBoard
  htmlBoard.append(top);

  // create main part of htmlBoard
  for (let y = 0; y < HEIGHT; y++) {
    // create HEIGHT num of rows
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      // create WIDTH num of cells
      const cell = document.createElement("td");
      // give cells their respective y and x values as their id
      cell.setAttribute("id", `${y}-${x}`);
      // append these cells to each row
      row.append(cell);
    }
    // append these rows to the htmlBoard
    htmlBoard.append(row);
    // at this point, we've created a 7x7 board (including the top row)
  }

  
}

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  // create a new div
  const newPiece = document.createElement("div");
  // give each div a class of piece(for styling) and fall(for animation)
  newPiece.classList.add("piece", "fall");
  // give each div a class of its player
  newPiece.classList.add(`player${currPlayer}`);

  // get correct table cell from its ID 
  const correctTableCell = document.getElementById(`${y}-${x}`);

  // append the new div to the correct table cell
  correctTableCell.append(newPiece);

}

function endGame(msg) {
  // pop up alert message
  gameFinished = true;
  alert(msg);
}

function handleClick(evt) {
  // don't allow clicking if game is finished
  if (gameFinished) {
    return;
  }
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
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

  // check for tie
  if (board.every(row => row.every(cell => cell))) {
      return endGame('Tie!');
  }
  // switch players each turn
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // get "check list" of 4 cells (starting here) for each of the different ways to win
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
