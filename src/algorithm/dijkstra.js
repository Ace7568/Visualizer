//Through Dijsktra algoritm we will return all the nodes in visited order by the algorithm
export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  //Set the distance of starting node to be zero
  startNode.distance = 0;
  //Getting all the nodes
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    //shift will remove the first element and return it,Hence closest element by distance
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we will skip all the steps, Hence distance is infinity .
    const check = closestNode.isWall && !closestNode.isFinish && !closestNode.isStart;
    if (check) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (closestNode === finishNode) return visitedNodesInOrder;

    //after each visite the closest neighbour should be updated to get the next closest node
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    if(node.isWeight){
      neighbor.distance = node.distance + 20;
    }
    else{
    neighbor.distance = node.distance + 1;
    }
    neighbor.previousNode = node;
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

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    // unshift add the element to the object/array at a[0] location
    //so by backtraking we add the element previous node to the array till start node which has no previous node
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
