// Create a website that will demonstrate and play through the first moves of
// the catalan opening for chess.

// var chessBoard =
//     [['wr', 'wk', 'wb', 'wq', 'wk', 'wb', 'wk', 'wr'],
//      ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
//      ['.', '.', '.', '.', '.', '.', '.', '.'],
//      ['.', '.', '.', '.', '.', '.', '.', '.'],
//      ['.', '.', '.', '.', '.', '.', '.', '.'],
//      ['.', '.', '.', '.', '.', '.', '.', '.'],
//      ['.', '.', '.', '.', '.', '.', '.', '.'],
//      ['.', '.', '.', '.', '.', '.', '.', '.'],
//      ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
//      ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br']];
// let wp = './images/wp.png', wr = './images/wr.png', wn = './images/wn.png';
// let wk = './images/wk.png', wq = './images/wq.png', wb = './images/wb.png';
// let bp = './images/bp.png', br = './images/br.png', bn = './images/bn.png';
// let bb = './images/bb.png', bk = './images/bk.png', bq = './images/bq.png';

function genBoard() {
  // Create 64 divs, separated into classes of light and dark, and rows and columns
  // Will use grid to style.
  // All divs will be put into the .board in existing html.
  let board = document.querySelector('.board');

  //create and add sidebars
  let leftSidebar = genSidebar(true), rightSidebar = genSidebar(true);
  let topSidebar = genSidebar(false), botSidebar = genSidebar(false);
  leftSidebar.className = "sidebar lSidebar";
  rightSidebar.className = "sidebar rSidebar";
  topSidebar.className = "sidebar tSidebar";
  botSidebar.className = "sidebar bSidebar";
  board.appendChild(leftSidebar);
  board.appendChild(rightSidebar);
  board.appendChild(topSidebar);
  board.appendChild(botSidebar);

  //loop to create the actual board itself
  for (let i = 1 ; i <= 8 ; i++) {
    for (let j = 72 ; j >= 65 ; j--) {
      let tile = document.createElement('div');
      let loc = String.fromCharCode(j).toLowerCase() + i;
      if ((i % 2 === 0 && j % 2 === 1) || (i % 2 === 1 && j % 2 === 0 )) {
        tile.className = "tile dark"
        tile.id = loc;
      } else {
        tile.className = "tile light"
        tile.id = loc;
      }
      // console.log(loc);
      tile.style.gridArea = loc;
      board.appendChild(tile);
    }
  }
}

function genSidebar(isRow) {
  // Create the sidebars to mark which rows correspond to which numbers, and
  // which columns map to which letters.
  // if isRow is true, create with numbers, if false, create with letters
  // return the document element, but do not attach it to the page.

  let newSidebar = document.createElement('div');

  if (isRow) {
    var vals = ["1", "2", "3", "4", "5", "6", "7", "8"];
  } else {
    var vals = ["h", "g", "f", "e", "d", "c", "b", "a"];
  }

  for (let i = 0; i < vals.length ; i++) {
    let newTile = document.createElement('h6');
    newTile.textContent = vals[i];
    newSidebar.appendChild(newTile);
  }
  return newSidebar;
}

function placePieces() {
  // I need to pull the piece img files and place them in the board grid.
  // I'll create a div within the tile div and scale the background to contain.
  let startingPieces = [['wr', 'a1', 'h1'], ['wn', 'b1', 'g1'], ['wb', 'c1', 'f1'],
        ['wk', 'e1'], ['wq', 'd1'], ['wp', 'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
        ['br', 'a8', 'h8'], ['bn', 'b8', 'g8'], ['bb', 'c8', 'f8'], ['bk', 'e8'],
        ['bq', 'd8'], ['bp', 'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7']];
  for (let i = 0 ; i < startingPieces.length ; i++) {
    for (let j = 1 ; j < startingPieces[i].length ; j++) {
      // let loc = String.fromCharCode(j).toLowerCase() + i;
      movePieces("", startingPieces[i][j], startingPieces[i][0]);
    }
  }
}

function movePieces(start, finish, piece) {
  // this function will find the piece on the start tile, and move it
  // to the finish tile.
  // If start is "" then just place a piece on the finish tile.
  if (start !== "") {
    // remove piece from class on start tile
    let startTile = document.getElementById(start);
    let classes = startTile.className;
    let pos = classes.indexOf(piece);
    if (pos >= 0 ) {
      classes = classes.slice(pos-1);
    }
    startTile.className = classes;
  }
  // Add piece class to finish tile
  let endTile = document.getElementById(finish);
  endTile.className += " " + piece;

}

genBoard();
placePieces();
