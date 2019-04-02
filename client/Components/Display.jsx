import React, { Component } from 'react';
import Canvas from './NetworkD3/Canvas.jsx'




const Display = (props) => {
  
  return (
    <div className="viz"> 
      <Canvas {...props} />
    </div>
  )
}

export default Display
