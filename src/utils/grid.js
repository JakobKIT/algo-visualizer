export const initializeGrid = (rowCount = 20, colCount = 50) => {
  const grid = [];
  for (let row = 0; row < rowCount; row++) {
    const currentRow = [];
    for (let col = 0; col < colCount; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

export const setFinishAndStart = (grid, start, finish) => {
  grid[start.row][start.col].isStart = true;
  grid[finish.row][finish.col].isFinish = true;

  return grid;
};

export const setWall = (grid, row, col) => {
  if (!grid[row][col].isFinish && !grid[row][col].isStart) {
    grid[row][col].isWall = !grid[row][col].isWall;
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: false,
    isFinish: false,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};