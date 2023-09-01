export function DFS(grid, startNode, finishnode) {
  const visitedNodesInOrder = [];

  const neighboursarray = [];

  neighboursarray.push(startNode);
  // startNode.isVisited = true;

  // const count = grid[0].length * grid.length;

  while (neighboursarray) {
    if(!neighboursarray) return;
    const adjusentnode = neighboursarray.pop();
    // if (!adjusentnode) continue;
    const getneighbours = getUnvisitedNeighbors(adjusentnode, grid);
    let selectedneighbour;
    
      for (let neighbour of getneighbours) {
        const check = neighbour.isWall && !neighbour.isFinish && !neighbour.isStart;
        if (check) continue;
          selectedneighbour = neighbour;
          neighboursarray.push(selectedneighbour);
          selectedneighbour.previousNode = adjusentnode;
          // console.log(adjusentnode);
        
      }
    
    adjusentnode.isVisited = true;
    visitedNodesInOrder.push(adjusentnode);
    
    if (adjusentnode === finishnode) {
      return visitedNodesInOrder;
    }

    if(neighboursarray.length===0){
      return visitedNodesInOrder;
    }
    console.log("RAM");
  }
  
  return visitedNodesInOrder;
}

// function getAllNodes(grid) {
//   const nodes = [];
//   for (const row of grid) {
//     for (const node of row) {
//       nodes.push(node);
//     }
//   }
//   return nodes;
// }

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  if (node) {
    const { col, row } = node;
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row > 0) neighbors.push(grid[row - 1][col]);
    return neighbors.filter((neighbor) => !neighbor.isVisited);
  }
}
