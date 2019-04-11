import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

const Toggle = (props) => {

  if (props.ex && props.content !== ""){
    return (
    <Typography color="inherit"><li><form><input type="checkbox" id={props.content} onChange={props.mute}/>{props.content}</form></li></Typography>
    )
  }
  
  else return (
   <Typography color="inherit"><li>{props.content}</li></Typography>
  )
}

export default Toggle;