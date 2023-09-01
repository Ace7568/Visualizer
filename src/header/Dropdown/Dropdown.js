import React, { useState } from "react";
import { algos } from "./Dropdown_elements";
import "./Dropdown.css";

export const Dropdown = () => {
  const [dropdown, setdropdown] = useState(false);

  
  function changebutton_name(id){
    if(id === "Dijkstra_Algorithm"){
      setdropdown(false)
      document.getElementById("button").innerHTML = "Visualize Dijkstra!"
    }
    if(id === "BFS"){
      setdropdown(false)
      document.getElementById("button").innerHTML = "Visualize BFS!"
    }
    if(id === "DFS"){
      setdropdown(false)
      document.getElementById("button").innerHTML = "Visualize DFS!"
    }
    if(id === "Astar"){
      setdropdown(false)
      document.getElementById("button").innerHTML = "Visualize A*!"
    }
  }

  // if(dropdown){
  //   document.getElementById("algos").classList.add("clicked")
  // }
  
  return (
    <>
      {/* <div>RAM</div> */}
      <ul
        className={dropdown ? "algos clicked":"algos"}
        onClick={() => setdropdown(!dropdown)}
      >
        {algos.map((algo) => {
          return (
            <li
              key={algo.id}
              className="options"
              id={algo.id}
              // onClick={() => setdropdown(false)}
              onClick={() => changebutton_name(algo.id)}
            >
              {algo.title}
            </li>
          );
        })}
      </ul>
    </>
  );
};
