export function BFS(grid, startNode, finishnode) {
  const visitedNodesInOrder = [];

  const neighboursarray = [];
  neighboursarray.push(startNode);

  while (neighboursarray) {
    const node = neighboursarray.shift();

    node.isVisited = true;

    const neighbors = getUnvisitedNeighbors(node, grid);

    for (let neighbor of neighbors) {
      const check = neighbor.isWall && !neighbor.isFinish && !neighbor.isStart;
      if (check) continue;
    
        neighboursarray.push(neighbor);
        neighbor.previousNode = node;
        // visitedNodesInOrder.push(node);
        neighbor.isVisited = true;
      
    }

    visitedNodesInOrder.push(node);

    if (node === finishnode) {
      console.log(visitedNodesInOrder);
      return visitedNodesInOrder;
    }

    if(neighboursarray.length===0){
      return visitedNodesInOrder;
    }
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}
