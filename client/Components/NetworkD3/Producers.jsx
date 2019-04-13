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
      rx: props.width / 200,
      ry: props.width / 200,
      width: props.width / 20,
      height: props.width / 20,
      key: index,
      stroke: 'black',
      strokeWidth: props.width / 250,
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