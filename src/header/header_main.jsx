import React, { useState } from "react";
import "./header_main.css";
import { Dropdown } from "./Dropdown/Dropdown";
import { Speed_dropdown } from "./Dropdown/Speed_dropdown";

export const Header_main = () => {
  const [dropdown, setdropdown] = useState(false);
  const [dropdown1, setdropdown1] = useState(false);

  return (
    <>
      <nav className="navbar">
        <a href="" className="name">
          Visualizer
        </a>

        <ul className="nav-items">
          <li
            className="nav-item"
            onMouseEnter={() => setdropdown(true)}
            onMouseLeave={() => setdropdown(false)}
          >
            Algorithm&#8595;
            {dropdown && <Dropdown></Dropdown>}
          </li>
          <li className="nav-item" id="Clearpath">ClearPath</li>
          <li
            className="nav-item"
            onMouseEnter={() => setdropdown1(true)}
            onMouseLeave={() => setdropdown1(false)}
            id = "speed"
          >
            Speed
            {dropdown1 && <Speed_dropdown></Speed_dropdown>}
          </li>
          <li className="nav-item" id="clearboard">
            ClearBoard
          </li>
        </ul>
        <button className="button" id="button">
          visualize
        </button>
        <button className="redbutton" id="redbutton">
          Please Wait
        </button>
      </nav>
    </>
  );
};
