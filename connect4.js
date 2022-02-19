/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let i = 0; i < HEIGHT; i++){
    let row = [];
    for(let i = 0; i < WIDTH; i++){
      row.push(null);
    }
    board.push(row);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board')

  // TODO: add comment for this code
  // this is creating the top table row and assigning it the id of "column-top"
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  //this is making # of cells according to WIDTH variable and appending them to the top row
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  //creating number of table rows according to height
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  //CHECKING WICH CELL IS EMPTY STARTING FROM THE BOTTOM OF THE COLUMN
  //RETURNS THE ROW # OF THE CELL THAT IS EMPTY
  for (let rowid = 5; rowid >= 0; rowid--){
    let cell = document.getElementById(`${rowid}-${x}`)
    if(cell.childElementCount == 0){
      return rowid;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let piece = document.createElement("div");
  let cell = document.getElementById(`${y}-${x}`)

  cell.appendChild(piece);
  if(currPlayer == 1){
    piece.classList.add('piece-blue')
  } else {
    piece.classList.add('piece-red')
  }
}

/** endGame: announce game end */

function endGame(msg) {
  setTimeout(function(){
    if(!alert(msg)){ window.location.reload()}
  }, 1000)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    if(currPlayer == 1){
      return endGame(`${player1Name} HAS WON!`);
    }
    if(currPlayer == 2){
      return endGame(`${player2Name} HAS WON!`)
    }
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  let allCells = Array.from(document.querySelectorAll('td'));
  let boardCells = allCells.filter((value,cellindex)=> cellindex > 6);
  if(boardCells.every((cell) => cell.childElementCount == 1)){
    setTimeout(function(){
      endGame('TIE! NO PLAYER WINS')
    }, 1000)
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if (currPlayer == 1){
    currPlayer += 1
  } else { currPlayer -= 1}
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

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
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

let player1Name = prompt("Enter Player 1 Name:")
let player2Name = prompt("Enter Player 2 Name:")
