import React from 'react';
import Typography from '@material-ui/core/Typography'

const Legend = (props) => {
  //ranges give the string in first element, and color in second element of sub arrays
  let ranges = [['0', '#bdbdbd'], ['1-50', '#b9f6ca'], ['50-150', '#ffeb3b'], ['150-500', '#f9a825'], ['500-2000', '#ff5722'], ['> 2000', '#b71c1c']];
  let rangeIcons = [];
  let rangeValues = [];

  for (let i = ranges.length-1; i >= 0; i--) {
    let rangeIconProps = {
      x: (props.width / ranges.length) * i + 70,
      y: 10,
      width: 17,
      height: 17,
      fill: ranges[i][1]
    }
    let rangeValueProps = {
      x: (props.width / ranges.length) * i + 90,
      y: 25
    }
    rangeIcons.push(<rect key={i+1} {...rangeIconProps}/>)
    rangeValues.push(<text key={i+1} fontFamily="roboto" {...rangeValueProps}> {ranges[i][0]} </text>,)
  }
  let msgs = <text fontFamily="roboto" x='12.5' y='25' >Msg/s</text>

  return (<g>{msgs}{rangeIcons} {rangeValues}</g>)
}

export default Legend;