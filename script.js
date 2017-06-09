
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
    for (let j = 65 ; j <= 72 ; j++) {
      let tile = document.createElement('div');
      let loc = String.fromCharCode(j).toLowerCase() + i;
      if ((i % 2 === 0 && j % 2 === 1) || (i % 2 === 1 && j % 2 === 0 )) {
        tile.className = "tile dark " + loc;
      } else {
        tile.className = "tile light " + loc;
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
    var vals = ["a", "b", "c", "d", "e", "f", "g", "h"];
  }

  for (let i = 0; i < vals.length ; i++) {
    let newTile = document.createElement('h6');
    newTile.textContent = vals[i];
    newSidebar.appendChild(newTile);
  }

  return newSidebar;
}

function populatePieces() {
  // I need to pull the piece img files and place them in the board grid.
  // I'll create a div within the tile div and scale the background to fit.
  // Going to try and have the black pieces be inverted in color
  // from the white pieces
  
}

genBoard();
