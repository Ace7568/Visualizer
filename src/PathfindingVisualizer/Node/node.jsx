import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  
  render() {
    const { isFinish, isStart, col, row, isWall, isWeight,onMouseEnter,onMouseDown,onMouseUp,onMouseLeave} = this.props;
    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWeight
      ? "node-weight"
      : isWall
      ? "node-wall"
      : "";

      // console.log(row ,col)
      

    return (
      <div 
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseEnter = {() => onMouseEnter(row,col)}
      onMouseDown = {() => onMouseDown(row,col)}
      onMouseUp = {() => onMouseUp()}
      onMouseLeave={() => onMouseLeave(row,col)}></div>
    );
  }
}

// export const DEAFULT_NODE = {
//   row: 0,
//   col: 0,
// };
