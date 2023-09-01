import React, { useState } from "react";
import { speed } from "./Dropdown_elements";
import "./Dropdown.css";


let animatespeed = 15;
export const Speed_dropdown = () => {
  const [dropdown, setdropdown] = useState(false);


  function speedset(id){
    if(id === "FAST"){
      setdropdown(false)
      animatespeed = 5
      // console.log(animatespeed)
    }
    if(id === "MED"){
      setdropdown(false)
      animatespeed = 20
    }
    if(id === "SLOW"){
      setdropdown(false)
      animatespeed = 500
    }
  }
  // if(dropdown){
  //   document.getElementById("algos").classList.add("clicked")
  // }
  
  return (
    <>
    
      <ul
        className={dropdown ? "algos clicked":"algos"}
        onClick={() => setdropdown(!dropdown)}
      >
        {speed.map((speed) => {
          return (
            <li
              key={speed.id}
              className="options"
              id={speed.id}
              // onClick={() => setdropdown(false)}
              onClick={() => speedset(speed.id)}
            >
              {speed.title}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export const speedfun = () =>{
    return animatespeed;
}

