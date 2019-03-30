import React from 'react';
import Producers from './Producers.jsx';
import Exchanges from './Exchanges.jsx';
import Queues from './Queues.jsx';
import Consumers from './Consumers.jsx';
import Links from './Links.jsx';
import * as d3 from 'd3';

const NetworkGraph = (props) => {
  return  <svg width={props.width} height={props.height}>
      <Links {...props} />
      <Producers {...props} />
      <Exchanges {...props} />
      <Queues {...props} />
      <Consumers {...props} />
    </svg>
}

export default NetworkGraph;