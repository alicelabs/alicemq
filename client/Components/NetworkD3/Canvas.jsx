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
      padding: 10
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