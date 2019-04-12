import React from 'react';

const Legend = (props) => {
  //ranges give the string in first element, and color in second element of sub arrays
  let ranges = [['0', '#bdbdbd'], ['1-50', '#4caf50'], ['50-150', '#ffeb3b'], ['150-500', '#f9a825'], ['500-2000', '#ff5722'], ['> 2000', '#b71c1c']];
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
    rangeIcons.push(<rect key={i+1} {...rangeIconProps}/>)
    rangeValues.push(<text key={i+1} fontFamily="roboto" {...rangeValueProps}> {ranges[i][0]} </text>,)
  }

  return (<g>{rangeIcons} {rangeValues}</g>)
}

export default Legend;