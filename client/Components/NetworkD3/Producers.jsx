import React from 'react';

const renderProducers = (props) => {
  return (coords, index) => {
    const producerProps = {
      x: props.nodes[index].x,
      y: props.nodes[index].y,
      rx: 10,
      ry: 10,
      width: 50,
      height: 50,
      key: index,
      stroke: 'black',
      strokeWidth: 5,
      fill: "blue"
    }
    return <rect {...producerProps} onClick={(e)=>props.updateNodeCards(props.nodes[index])}/> // <rect> is d3 function
  }
}

export default (props) => {
  return <g>{ props.nodes.filter(el => el.group === 1).map(renderProducers(props))}</g>
}