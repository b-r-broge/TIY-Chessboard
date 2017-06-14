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

// Catalan opening: closed, moves:
//  - d2 d4 wp
//  - g8 f6 bn
//  - c2 c4 wp
//  - e7 e6 bp
//  - g2 g3 wp
//  - d7 d5 bp
//  - f1 g2 wb
//  - f8 e7 bb
//  - g1 f3 wn

var move = 0, timerId = 0;
var stepBack = document.getElementById("stepback"), stepForward = document.getElementById('stepforw');
var rewind = document.getElementById('rewind'), fastforward = document.getElementById('ff');
var pp = document.getElementById('play');
stepForward.addEventListener('click', catalan);
stepBack.addEventListener('click', catalan);
rewind.addEventListener('click', catalan);
fastforward.addEventListener('click', catalan);
pp.addEventListener('click', play);


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
    // var vals = ["h", "g", "f", "e", "d", "c", "b", "a"];
    var vals = ["a", "b", "c", "d", "e", "f", "g", "h"];
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
      movePiece("", startingPieces[i][j], startingPieces[i][0]);
    }
  }
}

function clearHighlight() {
  // clean out highlights of the previous squares
  let highlight = document.getElementsByClassName('high');
  console.log(highlight);
  for (let i = 0; i < highlight.length; i++) {
    console.log(highlight[i].className);
    highlight[i].className = highlight[i].className.slice(0, highlight[i].className.length-5);
  }
}

function movePiece(start, finish, piece) {
  // this function will find the piece on the start tile, and move it
  // to the finish tile.
  // If start is "" then just place a piece on the finish tile.
  // clearHighlight();
  if (start !== "") {
    // remove piece from class on start tile
    let startTile = document.getElementById(start);
    startTile.removeChild(startTile.firstChild);
    // startTile.className += ' high';
  }
  // Add piece class to finish tile
  let endTile = document.getElementById(finish);
  let newPiece = document.createElement('div');
  newPiece.className = piece;
  endTile.appendChild(newPiece);
  // endTile.className += ' high';
}

function play(event) {
  // console.log('play pressed');
  if ( timerId ) {
    // console.log('clear timer');
    clearInterval(timerId);
    timerId = 0;
  } else {
    // console.log('start timer');
    catMoveF();
    timerId = setInterval(catMoveF, 2500);
  }
}

function catalan(event) {
  console.log(event.target.value);
  var situation = event.target.value;
  switch (situation) {
    case "start":
      console.log("reset to 0 moves");
      for (let i = move; i >= 0 ; i--) {
        catMoveB();
      }
      break;
    case "back":
      console.log("move back 1 move");
      catMoveB();
      break;
    case "forw":
      console.log("move forward 1 move");
      catMoveF();
      break;
    case "end":
      console.log("skip forward to the end");
      for (let i = move; i <= 8 ; i++) {
        catMoveF();
      }
      break;
    default:
      break;
  }
}

// Performs the next move in the sequence, B performs the steps in reverse.
// Both use the move variable to track where in the sequence they are.

function catMoveF() {
  switch (move) {
    case 0:
      movePiece('d2', 'd4', 'wp');
      move += 1;
      break;
    case 1:
      movePiece('g8', 'f6', 'bn');
      move += 1;
      break;
    case 2:
      movePiece('c2', 'c4', 'wp');
      move += 1;
      break;
    case 3:
      movePiece('e7', 'e6', 'bp');
      move += 1;
      break;
    case 4:
      movePiece('g2', 'g3', 'wp');
      move += 1;
      break;
    case 5:
      movePiece('d7', 'd5', 'bp');
      move += 1;
      break;
    case 6:
      movePiece('f1', 'g2', 'wb');
      move += 1;
      break;
    case 7:
      movePiece('f8', 'e7', 'bb');
      move += 1;
      break;
    case 8:
      movePiece('g1', 'f3', 'wn');
      move += 1;
    default:
      console.log('movement out of range: ', move);
      break;
  }
}

function catMoveB() {
  switch (move) {
    case 1:
      movePiece('d4', 'd2', 'wp');
      move -= 1;
      break;
    case 2:
      movePiece('f6', 'g8', 'bn');
      move -= 1;
      break;
    case 3:
      movePiece('c4', 'c2', 'wp');
      move -= 1;
      break;
    case 4:
      movePiece('e6', 'e7', 'bp');
      move -= 1;
      break;
    case 5:
      movePiece('g3', 'g2', 'wp');
      move -= 1;
      break;
    case 6:
      movePiece('d5', 'd7', 'bp');
      move -= 1;
      break;
    case 7:
      movePiece('g2', 'f1', 'wb');
      move -= 1;
      break;
    case 8:
      movePiece('e7', 'f8', 'bb');
      move -= 1;
      break;
    case 9:
      movePiece('f3', 'g1', 'wn');
      move -= 1;
    default:
      console.log('movement out of range: ', move);
      break;
  }
}

genBoard();
placePieces();
// clearHighlight();
