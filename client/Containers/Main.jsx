import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Settings1 from '../Components/Settings1.jsx'
import Settings2 from '../Components/Settings2.jsx'
import Settings3 from '../Components/Settings3.jsx'
import Settings4 from '../Components/Settings4.jsx'
import Display from '../Components/Display.jsx'
import SignIn from '../Components/SignIn.jsx'
import d3Data from '../graph/d3Data'

// import 'typeface-roboto'
import "@babel/polyfill";
// import d3Data from '../graph/d3Data';
import BlueBottle from '../../server/blueBottle.js';
import { Base64 } from 'js-base64'

const lib = new BlueBottle({
    host: '192.168.0.236',
    username: 'test',
    password: 'test',
    port: 15672,
    isWeb: true
});

// d3Data reference

// "cluster_name": cluster_name,
// "nodes": [],
// "links": [],
// "producers": producers.length,
// "exchanges": exchanges.length,
// "queues": queues.length,
// "consumers": consumers.length

const purpleTheme = createMuiTheme({ 
    palette: {
      primary: {
        main: '#6200EE',
      },
      secondary: {
        main: '#f44336',
      },
    },
    spacing: 10
})

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hostname: "",
      username: "",
      password: "",
      port: "",
      ...d3Data,
      width: 800,
      height: 500,
      padding: 10,
      visualizer: false
      }    
    this.updateHostname = this.updateHostname.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updatePort = this.updatePort.bind(this);
    this.visualize = this.visualize.bind(this)
    // this.decrementTarget = this.decrementTarget.bind(this);
    
  }
     

        

    async componentDidMount() {
      console.log('MOUNT');
      const d3Data = await lib.getData()
      this.setState({...d3Data});
      await console.log(d3Data);
      // let host = '192.168.0.236';
        // let username = 'test';
        // let password = 'test';
        // let port = 15672;
        // let uri = `http://${host}:${port}/api/bindings`
  
    
        // const headers = new Headers();
        // // headers.set('Access-Control-Request-Headers', '*');
        // let options = {
        //   credentials: 'include',
        //   method: 'GET',
        //   headers: headers,
        // }
         
        // fetch(uri, options)
        // .then(data => data.json())
        // .then(data => console.log(data))
  
    }

  updateHostname(e) {
    this.setState({ hostname: e.target.value });
  };

  updateUsername(e) {
    this.setState({ username: e.target.value });
  };

  updatePassword(e) {
    this.setState({ password: e.target.value });
  };

  updatePort(e) {
    this.setState({ port: e.target.value });
  };

  visualize(e) {
    this.setState({ visualizer: true })
  }

  // decrementTarget(e) {
  //   console.log(this.state)
  //   let target = e.target.identifier;
  //   let mute = e.target.mute;
  //   if (e.target.mute === "false") {
  //     e.target.mute = "true";
  //     console.log('triggered with false')
  //     this.setState({ [target]: this.state[target]-- })
  //   } else if (e.target.mute === "true") {
  //     e.target.mute = "false"
  //     console.log('triggered with true')
  //     this.setState({ [target]: this.state[target]++ })
  //   }
  // }

  render() {
    if (!this.state.visualizer) {
      return (
      <MuiThemeProvider theme={purpleTheme}>
        <SignIn className="container"
        updateHostname={ this.updateHostname }
        updateUsername={ this.updateUsername }
        updatePassword={ this.updatePassword }
        updatePort={ this.updatePort }
        visualize={this.visualize}
      />
      </MuiThemeProvider>)
    } else {
      return (
        <div className="the-grid">
          <Display {...this.state} />
          <Settings1 {...this.state} decrementTarget={this.decrementTarget} />
          <Settings2 {...this.state} decrementTarget={this.decrementTarget} />
          <Settings3 {...this.state} decrementTarget={this.decrementTarget} />
          <Settings4 {...this.state} decrementTarget={this.decrementTarget} />
        </div>
      )
    }

  }
}

export default Main
