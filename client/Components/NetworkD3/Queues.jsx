import React from 'react';

const renderQueues = (props) => {
  return (coords, index) => {
    const queuesProps = {
      x: props.nodes[props.producers+props.exchanges+index].x,
      y: props.nodes[props.producers+props.exchanges+index].y,
      rx: 10,
      ry: 10,
      width: 80,
      height: 50,
      key: 14+index,
      stroke: 'black',
      strokeWidth: 5,
      fill: "#4caf50"
     }
    return <rect {...queuesProps} onClick={(e)=>props.updateNodeCards(props.nodes[props.producers+props.exchanges+index])}/> // <rect> is d3 function
  }
}

export default (props) => {
  return <g>{ props.nodes.filter(el => el.group === 3).map(renderQueues(props))}</g>
}