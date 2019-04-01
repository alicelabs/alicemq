import React, { Component } from 'react'
import Toggle from './Toggle.jsx'

// d3Data reference

// "cluster_name": cluster_name,
// "nodes": [],
// "links": [],
// "producers": producers.length,
// "exchanges": exchanges.length,
// "queues": queues.length,
// "consumers": consumers.length



const Settings1 = (props) => {

  let exchanges = []
  for (let i = 0; i < props.exchanges; i++){
    exchanges.push(<Toggle identifier="exchanges" key={i} mute={"false"} decrementTarget={props.decrementTarget}/>)
  }
  
  return (
    <div className="settings1"> 
    <p>Exchanges</p>
      {exchanges}
    </div>
  )
}

export default Settings1;