import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const renderConsumers = (props) => {
  return (coords, index) => {
    let lineColor;
    let rate = props.nodes[props.producers+props.exchanges+props.queues+index].message_stats.deliver_get_details.rate;
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
    const consumerProps = {
      x: props.nodes[props.producers+props.exchanges+props.queues+index].x,
      y: props.nodes[props.producers+props.exchanges+props.queues+index].y,
      rx: 10,
      ry: 10,
      width: 50,
      height: 50,
      key: 19+index,
      strokeWidth: 3,
      fill: lineColor,
      stroke: "black",
      mute: coords.visibility
    }
    return (
      <g>
        <Tooltip title={props.nodes[props.producers+props.exchanges+props.queues+index].name}>
          <rect {...consumerProps} className={coords.visibility ? '' : 'disappear'} onClick={(e)=>props.updateNodeCards(props.nodes[props.producers+props.exchanges+props.queues+index])} />
        </Tooltip>
      </g>
    ) // <rect> is d3 function)
  }
}

export default (props) => {
  return <g>{ props.nodes.filter(el => el.group === 4).map(renderConsumers(props))}</g>
}