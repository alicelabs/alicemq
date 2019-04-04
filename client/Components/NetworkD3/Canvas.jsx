import React from 'react';
import NetworkGraph from './NetworkGraph.jsx'
import Typography from '@material-ui/core/Typography'

const Canvas = (props) => {
    return (
      <div className="cluster">
        <Typography variant="h3" color="inherit">RabbitMQ Cluster: {props.cluster_name} </Typography>
        <NetworkGraph {...props} popup={props.popup} popOff={props.popOff}/>
      </div>
    )
}

export default Canvas;