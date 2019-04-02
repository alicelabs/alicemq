import React from 'react';
import NetworkGraph from './NetworkGraph.jsx'

const Canvas = (props) => {
    return (
      <div>
        <h1>RabbitMQ Instance: {props.cluster_name}</h1>
        <NetworkGraph {...props} />
      </div>
    )
}

export default Canvas;