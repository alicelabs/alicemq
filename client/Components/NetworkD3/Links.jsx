import React from 'react';

const renderLinks = (props) => {
  return (coords, index) => {
    const linksProps = {
      x1: props.nodes[props.links[index].source].x + props.links[index].sourceXCenter,
      y1: props.nodes[props.links[index].source].y + props.links[index].sourceYCenter,
      x2: props.nodes[props.links[index].target].x + props.links[index].xCenter,
      y2: props.nodes[props.links[index].target].y + props.links[index].yCenter,
      strokeWidth: props.links[index].weight + 5,
      key: index,
      fill: "#ffa500",
      stroke: "black",
      strokeLinecap: "round"
    }
    return <line {...linksProps} /> // <rect> is d3 function
  }
}

export default (props) => {
  return <g>{ props.links.map(renderLinks(props))}</g>
}