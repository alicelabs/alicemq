import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

const Toggle = (props) => {

  if (props.ex){
    return (
    <Typography color="inherit"><li><form><input type="checkbox" id={props.content == "" ? 'default' : props.content } onChange={props.mute}/>{props.content === "" ? 'default' : props.content}</form></li></Typography>
    )
  }
  
  else return (
   <Typography color="inherit"><li>{props.content}</li></Typography>
  )
}

export default Toggle;