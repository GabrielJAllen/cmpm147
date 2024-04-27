// project.js - purpose and description here
// Author: Gabriel Allen
// Date: 4/26/24

/* exported generateGrid, drawGrid, gridCode, gridCheck */
/* global placeTile */

function generateGrid(numCols, numRows) {
  let grid = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push("_");
    }
    grid.push(row);
  }
  
  function createRiver(grid) {
    // Get the number of rows and columns in the grid
    const numRows = grid.length;
    const numCols = grid[0].length;

    // Choose a random starting point on the top edge
    let startX = Math.floor(Math.random() * numCols);
    
    // Choose a random width between 2 and 3
    let width = Math.floor(Math.random() * 2) + 2;

    // Overwrite positions from the starting point out to the width with "w"
    for (let i = 0; i < width; i++) {
      if (startX + i < numCols) {
        grid[0][startX + i] = 'w';
      }
    }

    // Simulate the river flowing through the grid
    for (let row = 1; row < numRows; row++) {
      // Copy the previous row
      grid[row] = grid[row - 1].slice();

      // Update the river position based on the flow direction
      const flowDirection = Math.random() < 0.5 ? -1 : 1;

      startX += flowDirection;

      // Ensure the river stays within bounds
      startX = Math.max(0, Math.min(startX, numCols - width));

      // Overwrite positions with "w"
      for (let i = 0; i < width; i++) {
        if (startX + i < numCols) {
          grid[row][startX + i] = 'w';
        }
      }

      // Adjust width if river reaches the edge
      if (startX === 0 || startX + width === numCols) {
        width = Math.min(width + 1, numCols);
      }
    }

    return grid;
  }
  
  function addTrees(grid) {
    // Get the number of rows and columns in the grid
    const numRows = grid.length;
    const numCols = grid[0].length;

    // Iterate through each row in the grid
    for (let row = 0; row < numRows; row++) {
      // Choose a random distance between 2 and 4
      const distance = Math.floor(Math.random() * 3) + 2;

      // Iterate through the row from left to right
      for (let col = 0; col < numCols; col++) {
        // If the current cell is 'w', go back 'distance' and replace with '.'
        if (grid[row][col] === 'w') {
          for (let i = 1; i <= distance && col - i >= 0; i++) {
            grid[row][col - i] = '.';
          }
          break; // Once 'w' is found, no need to continue forward
        }
        // If the current cell is not 'w', replace with 't'
        else {
          grid[row][col] = 't';
        }
      }

      // Iterate backward through the row to handle the other side
      for (let col = numCols - 1; col >= 0; col--) {
        // If the current cell is 'w', go back 'distance' and replace with '.'
        if (grid[row][col] === 'w') {
          for (let i = 1; i <= distance && col + i < numCols; i++) {
            grid[row][col + i] = '.';
          }
          break; // Once 'w' is found, no need to continue backward
        }
        // If the current cell is not 'w', replace with 't'
        else {
          grid[row][col] = 't';
        }
      }
    }

    return grid;
  }
  
  grid = createRiver(grid)
  grid = addTrees(grid)

  return grid;
}

function drawGrid(grid) {
  background(128);
  
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      drawContext(grid, i, j, grid[i][j])
    }
  }
}

function gridCheck(grid, i, j, target) {
  return (
    i >= 0 &&
    i < grid.length &&
    j >= 0 &&
    j < grid[i].length &&
    grid[i][j] === target
  );
}

function gridCode(grid, i, j, target) {
  byte = 0;
  if( gridCheck(grid, i, j-1, target)){//left
    byte += 1
  }
  if( gridCheck(grid, i-1, j, target)){//top
    byte += 2
  }
  if( gridCheck(grid, i, j+1, target)){//right
    byte += 4
  }
  if( gridCheck(grid, i+1, j, target)){//bottom
    byte += 8
  }
  return byte
}

const lookup = [
  [18,18],//no nieghbors--SHOULD NOT OCCUR
  [11,0],//left neighbor only
  [18,18],//top neighbor only--SHOULD NOT OCCUR
  [11,1],//left and top neighbor
  [9,0],//right nieghbor only
  [18,18],//right and left neighbor--SHOULD NOT OCCUR
  [9,1],//right and top neighbor
  [18,18],//right, top, and left neighbor--SHOULD NOT HAVE TILE
  [18,18],//bottom neighbor only--SHOULD NOT OCCUR
  [11,0],//bottom and left nieghbor
  [18,18],//bottom and top neighbor--SHOULD NOT OCCUR
  [11,1],//bottom, top, and left neighbor
  [9,0],//bottom and right neighbor
  [10, 0],//bottom, right, and left neighbor
  [9,1],//bottom, right, and top neighbor
  [18,18],//all neighbor--SHOULD NOT HAVE TILE
];//look up codes for water

function getAnimatedTileFor(frameCount) {
  const animationSpeed = 20// How fast the animation cycles (lower is faster)
  const tileFrames = [[18,18], [18,19], [18,20], [19,20], [20, 20]]
  
  // Calculate the current index based on the frame count
  const index = Math.floor(frameCount / animationSpeed) % tileFrames.length;
  return tileFrames[index];
}

function drawContext(grid, i, j, target) {
  
  if (grid[i][j] === 't') {
    // If the current tile is "t", use the corresponding tile index
    placeTile(i, j, (floor(random(4))), 0);
    placeTile(i, j, 14, 0);
  } else if (grid[i][j] === '.') {
    // If the current tile is ".", use the corresponding tile index
    placeTile(i, j, (floor(random(4))), 0);
  } else if (grid[i][j] === 'w') {
    const [ti, tj] = getAnimatedTileFor(frameCount);
    placeTile(i, j, ti, tj);
    let code = gridCode(grid, i, j, target);
    if(code != 15 && code != 7 && code != 0 && code != 2 && code != 5 && code != 8 && code != 10){
      let tile = lookup[code];
      placeTile(i, j, tile[0], tile[1]);
    }
  } else {
    // If no matching tile is found, use a default tile
    placeTile(i, j, (floor(random(4))), 0);
  }
}

