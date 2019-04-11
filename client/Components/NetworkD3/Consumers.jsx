import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const renderConsumers = (props) => {
  return (coords, index) => {
    const consumerProps = {
      x: props.nodes[props.producers+props.exchanges+props.queues+index].x,
      y: props.nodes[props.producers+props.exchanges+props.queues+index].y,
      rx: 10,
      ry: 10,
      width: 50,
      height: 50,
      key: 19+index,
      strokeWidth: 5,
      fill: "#ba68c8",
      stroke: "black",
      mute: coords.visibility
    }
    return (
      <g>
        <Tooltip title={props.nodes[props.producers+props.exchanges+props.queues+index].name}>
          <rect {...consumerProps} className={coords.visibility ? 'class23' : 'disappear'} onClick={(e)=>props.updateNodeCards(props.nodes[props.producers+props.exchanges+props.queues+index])} />
        </Tooltip>
      </g>
    ) // <rect> is d3 function)
  }
}

export default (props) => {
  return <g>{ props.nodes.filter(el => el.group === 4).map(renderConsumers(props))}</g>
}