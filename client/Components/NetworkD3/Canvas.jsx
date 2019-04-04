import React from 'react';
import NetworkGraph from './NetworkGraph.jsx'
import Typography from '@material-ui/core/Typography'

const Canvas = (props) => {
    return (
      <div className="cluster">
        <NetworkGraph {...props} />
      </div>
    )
}

export default Canvas;