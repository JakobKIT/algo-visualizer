export const dijkstra = (grid, start) => {
  // Initialize visited array empty!
  const visitedOrdered = [];

  // Set Start distance to 0
  start.distance = 0;

  // Get all nodes from grid
  const unvisited = getAllNodes(grid);

  // While there are unvisited Nodes go through the algorithm
  while (unvisited.length > 0) {
    // First Sort unvisted Array
    sortArrayByDistance(unvisited);

    // Get closest and delete it from unvisited
    const closest = unvisited.shift();

    // If distance of closest is Infinity then stop
    if (closest.distance === Infinity) return visitedOrdered;

    // If its a wall skip!
    if (closest.isWall) continue;

    // Mark closest as visited and push it into visited-Array
    closest.isVisited = true;
    visitedOrdered.push(closest);

    // If closest is finish node then stop
    if (closest.isFinish) return visitedOrdered;

    updateUnvisitedNeighborsDistance(closest, grid);
  };
};

export const getShortestPathArray = (finish) => {
  // Initialize empty array and start from finish Node
  const shortestPath = [];
  let current = finish;

  // As long as there is a previous node
  while (current !== null) {
    // Add current to shortestPath[0]
    shortestPath.unshift(current);

    // Get next
    current = current.previousNode;
  }
  return shortestPath;
};

const updateUnvisitedNeighborsDistance = (closest, grid) => {
  // Get an array of all neighbor-nodes that werent visited
  const neighbors = getUnvisitedNeighbors(closest, grid);

  // Loop through them and update distance and "previous"
  for (const neighbor of neighbors) {
    neighbor.distance = closest.distance + 1;
    neighbor.previousNode = closest;
  }
};

const getUnvisitedNeighbors = (closest, grid) => {
  // Initialize array and deconstruct column and row of closest
  const neighbors = [];
  const { col, row } = closest;

  // Get all neighbors possible for closest 
  // ignore if they are visited or not at first
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  // Filter out already visited nodes
  return neighbors.filter(nodes => !nodes.isVisited);
};

const getAllNodes = (grid) => {
  const allNodes = []
  grid.forEach(row => {
    row.forEach(node => {
      allNodes.push(node);
    });
  });
  return allNodes;
};

const sortArrayByDistance = (grid) => {
  grid.sort((a, b) => a.distance - b.distance);
};