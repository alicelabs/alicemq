import React, { Component } from 'react'
import Toggle from './Toggle.jsx'


const Settings2 = (props) => {
  let producers = []
  for (let i = 0; i < props.producers; i++){
    producers.push(<Toggle identifier="producers" key={i} decrementTarget={props.decrementTarget}/>)
  }
  return (
    <div className="settings2"> 
     <p>Producers</p>
     {producers}
    </div>
  )
}

export default Settings2;