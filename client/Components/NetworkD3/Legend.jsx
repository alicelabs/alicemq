import React from 'react';

const Legend = (props) => {
  //ranges give the string in first element, and color in second element of sub arrays
  let ranges = [['0 msg/s', '#bdbdbd'], ['1-50 msg/s', '#4caf50'], ['50-150 msg/s', '#ffeb3b'], ['150-500 msg/s', '#f9a825'], ['500-2000 msg/s', '#ff5722'], ['> 2000 msg/s', '#b71c1c']];
  let rangeIcons = [];
  let rangeValues = [];

  for (let i = ranges.length-1; i >= 0; i--) {
    let rangeIconProps = {
      x: (props.width / ranges.length) * i,
      y: 10,
      width: 15,
      height: 15,
      fill: ranges[i][1]
    }
    let rangeValueProps = {
      x: (props.width / ranges.length) * i + 20,
      y: 25
    }
    rangeIcons.push(<rect {...rangeIconProps}/>)
    rangeValues.push(<text fontFamily="roboto" {...rangeValueProps}> {ranges[i][0]} </text>,)
  }

  return (<g>{rangeIcons} {rangeValues}</g>)
}

export default Legend;