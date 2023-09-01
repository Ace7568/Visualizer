import React from 'react'

export const A_star = (grid,startNode,finishNode) => {
    const visitedNodesInOrder = [];
    //Set the distance of starting node to be zero
    startNode.distance = 0;
    startNode.huristicvalue = 0 
    //Getting all the nodes
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
      sort_huristic_manhatan(unvisitedNodes);
      //shift will remove the first element and return it,Hence closest element by distance
      const closestNode = unvisitedNodes.shift();
      console.log(closestNode)
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
      updateUnvisitedNeighborsdistance(closestNode, grid, finishNode);
  }
}
function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }

function sort_huristic_manhatan(unvisitedNodes){
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.huristicvalue - nodeB.huristicvalue);
}

function updateUnvisitedNeighborshurictic(node,grid,finishNode){
    updateUnvisitedNeighborsdistance(node, grid);
    const unvisitedNeighbors = getUnvisitedNeighbors(node , grid)
    console.log(unvisitedNeighbors)
    if(unvisitedNeighbors===[]){
        for(const neighbor of unvisitedNeighbors){
            neighbor.huristicvalue = neighbor.distance + ((finishNode.row - neighbor.row) + (finishNode.col - neighbor.col))
        }
    }
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


function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter((neighbor) => !neighbor.isVisited);
  }


  function updateUnvisitedNeighborsdistance(node, grid,finishNode){
    const unvisitedNeighbors = getUnvisitedNeighbors(node,grid);
    
    for(const neighbor of unvisitedNeighbors){
        if(node.isWeight){
            neighbor.distance = node.distance + 20;
          }
          else{
          neighbor.distance = node.distance + 0.01;
          }
          neighbor.previousNode = node;
    }

    for(const neighbor of unvisitedNeighbors){
        neighbor.huristicvalue = neighbor.distance + (Math.abs(finishNode.row - neighbor.row) + Math.abs(finishNode.col - neighbor.col))
        console.log((finishNode.row - neighbor.row) + (finishNode.col - neighbor.col))
    }
  }
  
