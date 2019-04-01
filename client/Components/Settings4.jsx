import React, { Component } from 'react'
import Toggle from './Toggle.jsx'

const Settings4 = (props) => {
  let queues = []
  for (let i = 0; i < props.queues; i++){
    queues.push(<Toggle identifier="queues" key={i} decrementTarget={props.decrementTarget}/>)
  }
  return (
    <div className="settings4"> 
     <p>Queues</p>
     {queues}
    </div>
  )
}

export default Settings4;