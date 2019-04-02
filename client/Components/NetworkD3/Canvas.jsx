import React from 'react';
import NetworkGraph from './NetworkGraph.jsx'


export default class Canvas extends React.Component{
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    
  }

  render() {
    return (
      <div>
        <h1>RabbitMQ Instance: {this.props.cluster_name}</h1>
        <NetworkGraph {...this.props} />
      </div>
    )
  }
}