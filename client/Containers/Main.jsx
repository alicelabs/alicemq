import React, { Component } from 'react';
import Settings1 from '../Components/Settings1.jsx'
import Settings2 from '../Components/Settings2.jsx'
import Display from '../Components/Display.jsx'

class Main extends React.Component{
constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div className="the-grid">
        <Display />
        <Settings1 />
        <Settings2 />
      </div>
    )
  }
}

export default Main