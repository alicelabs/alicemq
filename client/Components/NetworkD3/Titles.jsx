import React from 'react';

const renderTitles = (props) => {
  return (coords, index) => {
    const titlesProps = {
      x: props.titles[index].x - 12.5,
      y: props.titles[index].y,
      fontSize: 15,
      key: index,
      fill: "black"
    }

    return <text fontFamily="roboto" {...titlesProps} >{props.titles[index].name} </text> // <rect> is d3 function
  }
}

export default (props) => {
  return <g>{ props.titles.map(renderTitles(props)) }</g>
}