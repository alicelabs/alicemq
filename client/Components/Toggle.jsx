import React from 'react';
import Typography from '@material-ui/core/Typography';

const Toggle = (props) => {

  if (props.ex){
    return (
    <li><form><input type="checkbox" id={props.content == "" ? 'default' : props.content } onChange={props.mute}/><Typography inline={true} color="inherit">{props.content === "" ? 'default' : props.content}</Typography></form></li>
    )
  }
  
  else return (
   <Typography color="inherit"><li>{props.content}</li></Typography>
  )
}

export default Toggle;