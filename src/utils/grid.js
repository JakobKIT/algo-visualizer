export const initializeGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push({col, row});
    }
    grid.push(currentRow);
  }
  return grid;
};