import React from 'react';

const renderQueues = (props) => {
  return (coords, index) => {
    const queuesProps = {
      x: props.nodes[props.producers+props.exchanges+index].x,
      y: props.nodes[props.producers+props.exchanges+index].y,
      width: 40,
      height: 25,
      key: 14+index,
      stroke: 'black',
      strokeWidth: 2,
      fill: "green"
    }
    return <rect {...queuesProps} onClick={(e)=>props.updateNodeCards(props.nodes[props.producers+props.exchanges+index])}/> // <rect> is d3 function
  }
}

export default (props) => {
  return <g>{ props.nodes.filter(el => el.group === 3).map(renderQueues(props))}</g>
}