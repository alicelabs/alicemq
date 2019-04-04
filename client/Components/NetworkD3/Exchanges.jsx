import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const renderExchanges = (props) => {
  return (coords, index) => {
    const exchangeProps = {

      cx: props.nodes[props.producers+index].x,
      cy: props.nodes[props.producers+index].y,
      r: props.nodes[props.producers+index].r + 10,
      key: props.producers + index,
      stroke: 'black',
      strokeWidth: 5,
      fillOpacity: 0.8,
      fill: "red"
    }
    return (
      <Tooltip title={props.nodes[props.producers+index].name || "default"}>
        <circle {...exchangeProps}onClick={(e)=>props.updateNodeCards(props.nodes[props.producers+index])}/>
      </Tooltip>
    ) // <rect> is d3 function
  }
}

export default (props) => {
  return <g>{ props.nodes.filter(el => el.group === 2).map(renderExchanges(props))}</g>
}