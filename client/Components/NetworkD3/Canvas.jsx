import React from 'react';
import NetworkGraph from './NetworkGraph.jsx';

const Canvas = (props) => {
  return (
    <div className="cluster">
      <NetworkGraph {...props} popup={props.popup} popOff={props.popOff} />
    </div>
  );
};

export default Canvas;
