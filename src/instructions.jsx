import React from 'react'


const Instructions = () => {


  
  const buttonHtml = document.getElementById("button");
  

  return (
    <>
    <div className='Instructions'>
        <ul>
          <li>
            <div className="start"></div>
            Start Node
          </li>
          <li>
            <div className="target"></div>
            Target Node
          </li>
          <li>
            <div className="weight"></div>
            Weight Node
          </li>
          <li>
            <div className="Unvisited"></div>
            Unvisited Node
          </li>
          <li>
            <div className="shortest"></div>
            Shortest Node
          </li>
          <li>
            <div className="wall"></div>
            Wall Node
          </li>
          <li>
            <div className="visited"></div>
            Visited Node
          </li>
        </ul>
    </div>
    
    <div className="line">
      Pick an algorithm and visualize it!
    </div>
    </>
  )
}

export default Instructions
