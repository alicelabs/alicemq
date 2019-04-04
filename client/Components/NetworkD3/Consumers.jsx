import React from 'react';

const renderConsumers = (props) => {
  return (coords, index) => {
    const consumerProps = {
      x: props.nodes[props.producers+props.exchanges+props.queues+index].x,
      y: props.nodes[props.producers+props.exchanges+props.queues+index].y,
      rx: 10,
      ry: 10,
      width: 50,
      height: 50,
      key: 19+index,
      strokeWidth: 5,
      fill: "#ba68c8",
      stroke: "black",
    }
    return (
      <g>
        <rect {...consumerProps} onClick={(e)=>props.updateNodeCards(props.nodes[props.producers+props.exchanges+props.queues+index])} />
      </g>
    ) // <rect> is d3 function)
  }
}

export default (props) => {
  return <g>{ props.nodes.filter(el => el.group === 4).map(renderConsumers(props))}</g>
}