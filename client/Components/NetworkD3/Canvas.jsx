import React from 'react';
import d3Data from '../../graph/d3Data';
import NetworkGraph from './NetworkGraph.jsx'


export default class Canvas extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      ...d3Data,
      width: 800,
      height: 500,
      padding: 10,
      titles: [
        {
          name: 'Producers', 
          x: (800 / 4) * 1 - (800 * 0.1),
          y: 10
        },
        {
          name: 'Exchanges', 
          x: (800 / 4) * 2 - (800 * 0.1),
          y: 10
        },
        {
          name: 'Queues', 
          x: (800 / 4) * 3 - (800 * 0.1),
          y: 10
        },
        {
          name: 'Consumers', 
          x: (800 / 4) * 4 - (800 * 0.1),
          y: 10
        },
      ]
    }
  }
  componentWillMount(){

  }
  render() {
    return (
      <div>
        <h1>RabbitMQ Instance: {this.state.cluster_name}</h1>
        <NetworkGraph {...this.state} />
      </div>
    )
  }
}