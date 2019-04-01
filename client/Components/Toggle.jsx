import React, { Component } from 'react';


const Toggle = (props) => {


  return (
    <div>
      <form><input type="checkbox" label="name" mute={"false"} onChange={props.decrementTarget} /> placeholder</form>
    </div>
  )

}

export default Toggle;