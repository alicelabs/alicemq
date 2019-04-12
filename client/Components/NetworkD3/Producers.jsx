import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const renderProducers = (props) => {
  return (coords, index) => {
    let lineColor;
    let rate = props.nodes[index].message_stats.publish_details === undefined ? 0 : props.nodes[index].message_stats.publish_details.rate
     if (rate === 0) {
   lineColor = '#bdbdbd'
  } else if (rate > 0 && rate <= 50) {
   lineColor = '#b9f6ca'
  } else if (rate > 50 && rate <= 150) {
   lineColor = '#ffeb3b'
  } else if (rate > 150 && rate <= 500) {
   lineColor = '#f9a825'
  } else if (rate > 500 && rate <= 2000) {
   lineColor = '#ff5722'
  } else if (rate > 2000) {
  lineColor = '#b71c1c'
  }
    const producerProps = {
      x: props.nodes[index].x,
      y: props.nodes[index].y,
      rx: 10,
      ry: 10,
      width: 50,
      height: 50,
      key: index,
      stroke: 'black',
      strokeWidth: 3,
      fill: lineColor
    }
    return (
      <Tooltip title={props.nodes[index].name}>
      <rect {...producerProps} onClick={(e)=>props.updateNodeCards(props.nodes[index])}/>
      </Tooltip>
      ) // <rect> is d3 function
  }
}

export default (props) => {
  return <g>{ props.nodes.filter(el => el.group === 1).map(renderProducers(props))}</g>
}