import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

// styles is not working
const styles = theme => ({
  absolute: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    fontSize: 20
  },
})

const renderQueues = (props) => {
  return (coords, index) => {
    let lineColor = "#4caf50";
    let rate = props.nodes[props.producers+props.exchanges+index].message_stats.publish_details.rate;
    
    if(props.trafficMode)
      lineColor = props.setColors(rate);
     
    const queuesProps = {
      x: props.nodes[props.producers+props.exchanges+index].x,
      y: props.nodes[props.producers+props.exchanges+index].y,
      rx: 10,
      ry: 10,
      width: 80,
      height: 50,
      key: [props.producers+props.exchanges+index]+index,
      stroke: 'black',
      strokeWidth: 5,   // 3, from colornodes branch
      fill: lineColor,
      mute: coords.visibility
    }
    return (
      <Tooltip key={index} title={props.nodes[props.producers+props.exchanges+index].name}>
        <rect {...queuesProps} className={queuesProps.mute ? '' : 'disappear'} onClick={(e)=>props.updateNodeCards(props.nodes[props.producers+props.exchanges+index])}/> 
      </Tooltip>
    )
    //<rect> is d3 function
  }
}
const Queues = (props) => {
  return <g>{ props.nodes.filter(el => el.group === 3).map(renderQueues(props))}</g>
}
export default withStyles(styles)(Queues)