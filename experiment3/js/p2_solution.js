// project.js - purpose and description here
// Author: Gabriel Allen
// Date: 4/25/24

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
    
    // Choose a random width between 1 and 3
    let width = Math.floor(Math.random() * 3) + 1;

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
  if( i >= grid.length || j >= grid[0].length ){
    return false
  } else {
    if( grid[i][j] == target ){
      return true
    } else {
      return false
    }
  }
}

function gridCode(grid, i, j, target) {
  byte = 0;
  if( gridCheck(grid, i, j-1, target)){
    byte |= 1
  }
  if( gridCheck(grid, i+1, j, target)){
    byte |= 2
  }
  if( gridCheck(grid, i, j+1, target)){
    byte |= 4
  }
  if( gridCheck(grid, i-1, j, target)){
    byte |= 8
  }
  return byte
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
    //let code = gridCode(grid, i, j, target);
    //let tile = lookup[code];
    //placeTile(i, j, tile[0], tile[1]);
    placeTile(i, j, 20, 20);
  } else {
    // If no matching tile is found, use a default tile
    placeTile(i, j, (floor(random(4))), 0);
  }
}

const lookup = [
    
];
