import React, { Component } from "react";
import Node from "./Node/node";
import "./PathfindingVisualizer.css";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithm/dijkstra";
import { DFS } from "../algorithm/DFS";
import { speedfun } from "../header/Dropdown/Speed_dropdown";
import { BFS } from "../algorithm/BFS";
import { A_star } from "../algorithm/A_star";

//testing
//Ram
let Column = 57;
let Row = 22;

let START_NODE_ROW = 10;
let START_NODE_COL = 8;
let FINISH_NODE_ROW = 10;
let FINISH_NODE_COL = 30;

let waiting_time = false;

const column = window.matchMedia("(max-width: 780px)");
if (column.matches) {
  Column = 14;
  Row = 18;
  FINISH_NODE_COL = 11;
  START_NODE_COL = 3;
}

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      Mousepressed: false,
      StartKey: false,
      FinishKey: false,
      Wispressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialgrid();
    this.setState({ grid });
  }

  onMouseDown(row, col) {
    
    // this.wispressed(true);
    window.addEventListener("keydown", (e)=>{
      if(e.code==="KeyW"){
        this.setState({Wispressed: true})
        return;
      }
    })  
    window.removeEventListener("keydown",()=>{})
    window.addEventListener("keyup", (e)=>{
      if(e.code==="KeyW"){
        this.setState({Wispressed: false})
        return;
      }
    }) 

    window.removeEventListener("keyup",()=>{})

    if(this.state.Wispressed){
      const NewGrid = getnewGridwithWeight(this.state.grid, row, col);
      this.setState({ grid: NewGrid, Mousepressed: true });
      return console.log("RAM RAM")
    }
    if (
      this.state.grid[row][col] ===
      this.state.grid[START_NODE_ROW][START_NODE_COL]
    ) {
      this.setState({ StartKey: true });
      return;
    }
    if (
      this.state.grid[row][col] ===
      this.state.grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    ) {
      this.setState({ FinishKey: true });
      return;
    }
    const NewGrid = getnewGridwithWalls(this.state.grid, row, col);
    this.setState({ grid: NewGrid, Mousepressed: true });
    console.log("RAM MOUSEDOWN");
  }
  onMouseEnter(row, col) {

    // console.log("RAM")
    // console.log(`Enter - ${row} - ${col}`)
    if(this.state.Wispressed){
      const NewGrid = getnewGridwithWeight(this.state.grid, row, col);
      this.setState({ grid: NewGrid });
      return console.log("RAM RAM")
    }
    if (this.state.StartKey) {
      const NewGrid = getnewGridwithStart(this.state.grid, row, col);
      this.setState({ grid: NewGrid });
      return;
    }
    if (this.state.FinishKey) {
      const NewGrid = getnewGridwithFinish(this.state.grid, row, col);
      this.setState({ grid: NewGrid });
      return;
    }
    if (!this.state.Mousepressed) return;
    const NewGrid = getnewGridwithWalls(this.state.grid, row, col);
    this.setState({ grid: NewGrid });
    console.log("RAM MOUSEenter");
  }
  onMouseUp(row, col) {
    // this.wispressed(false);
    this.setState({ Mousepressed: false, StartKey: false, FinishKey: false, Wispressed: false });
    console.log("RAM MOUSEup");
    console.log(this.state.Wispressed)

  }

  onMouseLeave(row, col) {
    // console.log(`Leave - ${row} - ${col}`)
    if (this.state.StartKey) {
      const NewGrid = getnewGridwithStart(this.state.grid, row, col);
      console.log("RAM");
      this.setState({ grid: NewGrid });
    }
    if (this.state.FinishKey) {
      const NewGrid = getnewGridwithFinish(this.state.grid, row, col);
      console.log("RAM");
      this.setState({ grid: NewGrid });
    }
  }

  // wispressed() {
  //   window.addEventListener("keydown", (e)=>{
  //     // console.log(e.code)
  //     if(e.code==="KeyW"){
  //       this.Wispressed = true;
  //     }
  //   })
  //   if(this.Wispressed) return true;
  //   else false;
  // }

  // wispressed(bool){
  //   // console.log(bool)
  //   if(bool){
  //     window.addEventListener("keydown", (e)=>{
  //       if(e.code==="KeyW"){
  //         this.setState({Wispressed: true})
  //         return;
  //       }
  //     })  
  //     window.addEventListener("keyup", (e)=>{
  //       if(e.code==="KeyW"){
  //         this.setState({Wispressed: false})
  //         return;
  //       }
  //     }) 
  //     window.removeEventListener("keydown",()=>{})
  //     window.removeEventListener("keyup",()=>{})
  //   }
  //   else{
  //     this.setState({Wispressed:false})
  //     return;
  //   }
  // }
  
  animateDijkstraNode(VisitedNodesInOrder) {
    const { grid } = this.state;
    for (let i = 0; i < VisitedNodesInOrder.length; i++) {
      const node = VisitedNodesInOrder[i];

      setTimeout(() => {
        if (i === VisitedNodesInOrder.length - 1) {
          // const ShortestPath = getNodesInShortestPathOrder(node);
          // document.getElementById(`node-${node.row}-${node.col}`).className =
          //   "node node-visited";
          if (grid[FINISH_NODE_ROW][FINISH_NODE_COL] === node) {
            // console.log("RAM");
            this.animateShortestPath(getNodesInShortestPathOrder(node));
          } else visualize_button();
        }
        
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";

          if(node.isWeight){
            document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited node-weight";
          }
      }, speedfun() * i);
    }
  }

  animateShortestPath(ShortestPath) {
    for (let i = 0; i < ShortestPath.length; i++) {
      const shortnode = ShortestPath[i];

      setTimeout(() => {
        document
          .getElementById(`node-${shortnode.row}-${shortnode.col}`)
          .classList.add("ShortestPath");
        if (i === ShortestPath.length - 1) {
          visualize_button();
          waiting_time = false;
        }
      }, 50 * i);
    }
  }

 

  visualize_dfs() {
    const { grid } = this.state;
    const STARTNODE = grid[START_NODE_ROW][START_NODE_COL];
    const FINISHNODE = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const VisitedNodesInorder = DFS(grid, STARTNODE, FINISHNODE);
    console.log("RAM");
    this.animateDijkstraNode(VisitedNodesInorder);
  }

  visualize_astar() {
    const { grid } = this.state;
    const STARTNODE = grid[START_NODE_ROW][START_NODE_COL];
    const FINISHNODE = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const VisitedNodesInorder = A_star(grid, STARTNODE, FINISHNODE);
    console.log("RAM");
    this.animateDijkstraNode(VisitedNodesInorder);
  }


  visualize_bfs() {
    const { grid } = this.state;
    const STARTNODE = grid[START_NODE_ROW][START_NODE_COL];
    const FINISHNODE = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const VisitedNodesInorder = BFS(grid, STARTNODE, FINISHNODE);
    console.log("RAM");
    this.animateDijkstraNode(VisitedNodesInorder);
  }

  visualize_dijkstra() {
    // this.setState({WaitingTime:true})
    const { grid } = this.state;
    const STARTNODE = grid[START_NODE_ROW][START_NODE_COL];
    const FINISHNODE = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const VisitedNodesInOrder = dijkstra(grid, STARTNODE, FINISHNODE);
    this.animateDijkstraNode(VisitedNodesInOrder);
  }

  clear() {
    if (waiting_time) return;
    const new_grid = [];
    for (let row = 0; row < Row; row++) {
      const currentrow = [];
      for (let col = 0; col < Column; col++) {
        currentrow.push(createNewNode(col, row));
        document
          .getElementById(`node-${row}-${col}`)
          .classList.remove("node-visited", "ShortestPath");
      }
      new_grid.push(currentrow);
    }
    document
      .getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`)
      .classList.add("node-start");
    document
      .getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`)
      .classList.add("node-finish");
    this.setState({ grid: new_grid });
  }

  clear_visitednodes() {
    if(waiting_time) return;
    for (let row = 0; row < Row; row++) {
      for (let col = 0; col < Column; col++) {
        const { grid } = this.state;
        grid[row][col].isVisited = false;
        grid[row][col].previousNode = null;
        grid[row][col].distance = Infinity;
        grid[row][col].huristicvalue = Infinity;
        document
          .getElementById(`node-${row}-${col}`)
          .classList.remove("node-visited", "ShortestPath");
      }
    }
    document
      .getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`)
      .classList.add("node-start");
    document
      .getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`)
      .classList.add("node-finish");
  }

  buttonhandler() {
    const visualize = document.getElementById("button");
    const clearboard = document.getElementById("clearboard");
    const redbutton = document.getElementById("redbutton");
    const clearpath = document.getElementById("Clearpath");

    if (clearboard) {
      clearboard.onclick = () => {
        // this.setState({ WaitingTime: false });
        this.clear(this.state.grid);
      };
    }

    if (visualize) {
      visualize.onclick = () => {
        
        const visualizetext = visualize.innerHTML;
        this.clear_visitednodes();
        waiting_time = true;
        // console.log(visualizetext);

        if (visualizetext === "visualize") {
          alert("Please select an algo");
          visualize.textContent = "pick an algorithm";
        }
        else if (visualizetext === "Visualize Dijkstra!") {
          // console.log("RAM");
          this.visualize_dijkstra();
          visualize.style.display = "none";
          redbutton.style.display = "block";
        }
        // this.setState({WaitingTime: false})

        else if (visualizetext === "Visualize DFS!") {
          // console.log("RAM");
          this.visualize_dfs();
          visualize.style.display = "none";
          redbutton.style.display = "block";
        }
        else if (visualizetext === "Visualize BFS!") {
          this.visualize_bfs();
          visualize.style.display = "none";
          redbutton.style.display = "block";
        }
        else if (visualizetext === "Visualize A*!"){
          this.visualize_astar();
          visualize.style.display = "none";
          redbutton.style.display = "block";
        }
      };
    }

    if (clearpath) {
      clearpath.onclick = () => {
        console.log("RAM");
        this.clear_visitednodes();
      };
    }
  }

  render() {
    const { grid } = this.state;
    // console.log(speedfun())
    this.buttonhandler();

    return (
      <>
        {/* <button onClick={() => this.visualize_dijkstra()}>
          Visualize dijkstra
        </button> */}
        <div className="grid">
          {/* RAM RAM */}
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="row">
                {row.map((node, nodeIdx) => {
                  const {
                    row,
                    col,
                    isStart,
                    isFinish,
                    isWall,
                    isVisited,
                    previousnode,
                    isWeight,
                  } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isVisited={isVisited}
                      isWall={isWall}
                      isWeight={isWeight}
                      test={"ram"}
                      // test={'ram'}
                      row={row}
                      previousNode={previousnode}
                      onMouseEnter={(row, col) => this.onMouseEnter(row, col)}
                      onMouseDown={(row, col) => this.onMouseDown(row, col)}
                      onMouseUp={() => this.onMouseUp()}
                      onMouseLeave={() => this.onMouseLeave(row, col)}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialgrid = () => {
  const grid = [];

  // console.log(ram)
  for (let row = 0; row < Row; row++) {
    const currentrow = [];
    for (let col = 0; col < Column; col++) {
      currentrow.push(createNewNode(col, row));
    }
    grid.push(currentrow);
  }
  return grid;
};

const createNewNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isVisited: false,
    distance: Infinity,
    isWall: false,
    previousNode: null,
    isWeight:false,
    huristicvalue:Infinity,
  };
};

const getnewGridwithWalls = (grid, row, col) => {
  const Newgrid = grid.slice();
  const node = grid[row][col];
  const New_node = {
    ...node,
    isWall: !node.isWall,
  };
  Newgrid[row][col] = New_node;
  return Newgrid;
};

const getnewGridwithStart = (grid, row, col) => {
  START_NODE_ROW = row;
  START_NODE_COL = col;
  const Newgride = grid.slice();
  const node = grid[row][col];
  const New_node = {
    ...node,
    isStart: !node.isStart,
  };

  Newgride[row][col] = New_node;
  return Newgride;
};

const getnewGridwithFinish = (grid, row, col) => {
  FINISH_NODE_ROW = row;
  FINISH_NODE_COL = col;
  const Newgride = grid.slice();
  const node = grid[row][col];
  const New_node = {
    ...node,
    isFinish: !node.isFinish,
  };
  Newgride[row][col] = New_node;
  return Newgride;
};

const getnewGridwithWeight = (grid, row, col) => {
  const Newgrid = grid.slice();
  const node = grid[row][col];
  const New_node = {
    ...node,
    isWeight: !node.isWeight,
  };
  Newgrid[row][col] = New_node;
  return Newgrid;
}

const visualize_button = () => {
  const visualize = document.getElementById("button");
  const redbutton = document.getElementById("redbutton");
  visualize.style.display = "block";
  redbutton.style.display = "none";
};

