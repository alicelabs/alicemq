import React from 'react';

const renderLinks = (props) => {
  return (coords, index) => {
    const linksProps = {
      x1: props.nodes[props.links[index].source].x,
      y1: props.nodes[props.links[index].source].y,
      x2: props.nodes[props.links[index].target].x,
      y2: props.nodes[props.links[index].target].y,
      strokeWidth: props.links[index].weight,
      key: index,
      stroke: "gray"
    }
    return <line {...linksProps} /> // <rect> is d3 function
  }
}

export default (props) => {
  return <g>{ props.links.map(renderLinks(props))}</g>
}