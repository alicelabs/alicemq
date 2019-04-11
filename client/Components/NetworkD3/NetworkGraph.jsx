import React from 'react';
import Producers from './Producers.jsx';
import Exchanges from './Exchanges.jsx';
import Queues from './Queues.jsx';
import Consumers from './Consumers.jsx';
import Links from './Links.jsx';
import Titles from './Titles.jsx'
import Legend from './Legend.jsx'
import * as d3 from 'd3';

const NetworkGraph =(props)=> {
    return (<svg width={props.width} height={props.height}>
      <Legend {...props} />
      {props.titles && <Titles {...props} />}
      {props.links && props.nodes && <Links {...props} />}
      {props.producers && <Producers className="node" {...props} />}
      {props.exchanges && <Exchanges popup={props.popup} popOff={props.popOff} className="node"{...props} />}
      {props.queues && <Queues className="node"{...props} />}
      {props.consumers && <Consumers className="node"{...props} />}
    </svg>)
  }

export default NetworkGraph;