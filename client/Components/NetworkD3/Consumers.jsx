import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const renderConsumers = (props) => {
  return (coords, index) => {
    let lineColor = '#ba68c8';
    let rate = props.nodes[props.producers+props.exchanges+props.queues+index].message_stats.deliver_get_details.rate;
    
    if(props.trafficMode)
      lineColor = props.setColors(rate);
     
    const consumerProps = {
      x: props.nodes[props.producers+props.exchanges+props.queues+index].x,
      y: props.nodes[props.producers+props.exchanges+props.queues+index].y,
      rx: props.width / 200,
      ry: props.width / 200,
      width: props.width / 20,
      height: props.width / 20,
      key: 19+index,
      strokeWidth: props.width / 250,
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