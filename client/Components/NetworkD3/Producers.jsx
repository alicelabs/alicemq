import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const renderProducers = (props) => {
  return (coords, index) => {
    let lineColor = "blue";
    let rate = props.nodes[index].message_stats.publish_details === undefined ? 0 : props.nodes[index].message_stats.publish_details.rate;
    
    if(props.trafficMode)
      lineColor = props.setColors(rate);

    const producerProps = {
      x: props.nodes[index].x,
      y: props.nodes[index].y,
      rx: 10,
      ry: 10,
      width: 50,
      height: 50,
      key: index,
      stroke: 'black',
      strokeWidth: 5,   // 3, from colornodes branch
      fill: lineColor
    }
    return (
      <Tooltip key={index} title={props.nodes[index].name}>
      <rect {...producerProps} onClick={(e)=>props.updateNodeCards(props.nodes[index])}/>
      </Tooltip>
      ) // <rect> is d3 function
  }
}

export default (props) => {
  return <g>{ props.nodes.filter(el => el.group === 1).map(renderProducers(props))}</g>
}