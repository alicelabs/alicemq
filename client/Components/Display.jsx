import React, { Component } from 'react';
import Canvas from './NetworkD3/Canvas.jsx'
import NetworkGraph from './NetworkD3/NetworkGraph.jsx'

const Display = (props) => {
  
  return (
    <div className="viz"> 
      <NetworkGraph {...props}/>
    </div>
  )
}

export default Display
