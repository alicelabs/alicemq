import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';



const Toggle = (props) => {

  return (
  <Typography color="inherit"><li>{props.content}</li></Typography>
  )
}

export default Toggle;