import React from 'react';
import NetworkGraph from './NetworkGraph.jsx'

const Canvas = (props) => {
    return (
      <div>
        <NetworkGraph {...props} />
      </div>
    )
}

export default Canvas;