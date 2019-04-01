import React, { Component } from 'react'
import Toggle from './Toggle.jsx'

const Settings3 = (props) => {
  let consumers = []
  for (let i = 0; i < props.consumers; i++){
    consumers.push(<Toggle identifier="consumers" key={i} decrementTarget={props.decrementTarget}/>)
  }
  return (
    <div className="settings3"> 
     <p>Hi I'm settings 3</p>
     {consumers}
    </div>
  )
}

export default Settings3