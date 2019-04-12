import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const renderExchanges = (props) => {
  return (coords, index) => {
    let lineColor;
    let rate = props.nodes[props.producers+index].message_stats.publish_out_details.rate;
     if (rate === 0) {
    lineColor = '#bdbdbd'
  } else if (rate > 0 && rate <= 50) {
    lineColor = '#b9f6ca'
  } else if (rate > 50 && rate <= 150) {
    lineColor = '#ffeb3b'
  } else if (rate > 150 && rate <= 500) {
    lineColor = '#f9a825'
  } else if (rate > 500 && rate <= 2000) {
    lineColor = '#ff5722'
  } else if (rate > 2000) {
    lineColor = '#b71c1c'
  }
    const exchangeProps = {

      cx: props.nodes[props.producers+index].x,
      cy: props.nodes[props.producers+index].y,
      r: props.nodes[props.producers+index].r + 10,
      key: props.producers + index,
      stroke: 'black',
      strokeWidth: 3,
      fill: lineColor,
      mute: coords.visibility
    }
    return (
      <Tooltip title={props.nodes[props.producers+index].name || "default"}>
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
