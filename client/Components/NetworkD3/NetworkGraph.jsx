import React from 'react';
import Producers from './Producers.jsx';
import Exchanges from './Exchanges.jsx';
import Queues from './Queues.jsx';
import Consumers from './Consumers.jsx';
import Links from './Links.jsx';
import Titles from './Titles.jsx'
import * as d3 from 'd3';

const NetworkGraph = (props) => {
  console.log('TITLES: ', props.titles)
  return  <svg width={props.width} height={props.height}>
      {props.titles && <Titles {...props} />}
      {props.links && props.nodes && <Links {...props} />}
      {props.producers && <Producers {...props} />}
      {props.exchanges && <Exchanges {...props} />}
      {props.queues && <Queues {...props} />}
      {props.consumers && <Consumers {...props} />}
    </svg>
}

export default NetworkGraph;