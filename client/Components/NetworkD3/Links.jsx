import React from 'react';

const renderLinks = (props) => {

  return (coords, index) => {
    let lineColor;
    let rate = props.links[index].weight;
     if (rate === 0) {
   lineColor = '#bdbdbd'
 } else if (rate > 0 && rate <= 50) {
   lineColor = '#4caf50'
 } else if (rate > 50 && rate <= 150) {
   lineColor = '#ffeb3b'
 } else if (rate > 150 && rate <= 500) {
   lineColor = '#f9a825'
 } else if (rate > 500 && rate <= 2000) {
   lineColor = '#ff5722'
 } else if (rate > 2000) {
  lineColor = '#b71c1c'
 }
    
    const linksProps = {
      x1: props.nodes[props.links[index].source].x + props.links[index].sourceXCenter,
      y1: props.nodes[props.links[index].source].y + props.links[index].sourceYCenter,
      x2: props.nodes[props.links[index].target].x + props.links[index].xCenter,
      y2: props.nodes[props.links[index].target].y + props.links[index].yCenter,
      strokeWidth: Math.floor(Math.log(props.links[index].weight)) * 2,
      key: index,
      fill: "#ffa500",
      stroke: lineColor,
      strokeLinecap: "round",
      mute: props.nodes[coords.source].visibility
    }
    return <line className={linksProps.mute ? '' : 'disappear'} {...linksProps} /> // <rect> is d3 function
  }
}

export default (props) => {
  return <g>{ props.links.map(renderLinks(props))}</g>
}