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
      strokeWidth: props.width / 250,
      fillOpacity: 0.8,
      fill: "red",
      mute: coords.visibility
    }
    return (
      <Tooltip key={index} title={props.nodes[props.producers+index].name || "default"}>
        <circle className={coords.visibility ? "" : "disappear"}  {...exchangeProps}onClick={(e)=>props.updateNodeCards(props.nodes[props.producers+index])}/>
      </Tooltip>
    ) // <rect> is d3 function
  }
}

  export default (props) => {

    let filtered = props.nodes.filter(el => el.group === 2)
    let mapped = filtered.map(renderExchanges(props))

    return <g>{mapped}</g>
}
