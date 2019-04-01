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
          x: (d3Data.width / 4) * 1 - (d3Data.width * 0.1),
          y: 10
        },
        {
          name: 'Exchanges', 
          x: (d3Data.width / 4) * 2 - (d3Data.width * 0.1),
          y: 10
        },
        {
          name: 'Queues', 
          x: (d3Data.width / 4) * 3 - (d3Data.width * 0.1),
          y: 10
        },
        {
          name: 'Consumers', 
          x: (d3Data.width / 4) * 4 - (d3Data.width * 0.1),
          y: 10
        }
      ]
    }
  }

  componentWillMount(){
    
  }

  render() {
    return (
      <div>
        <h1>RabbitMQ Instance: {this.props.cluster_name}</h1>
        <NetworkGraph {...this.state} />
      </div>
    )
  }
}