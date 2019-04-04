import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Settings1 from '../Components/Settings1.jsx'
import Settings2 from '../Components/Settings2.jsx'
import Settings3 from '../Components/Settings3.jsx'
import Settings4 from '../Components/Settings4.jsx'
import Display from '../Components/Display.jsx'
import SignIn from '../Components/SignIn.jsx'
import OverviewCards from '../Components/OverviewCards.jsx'
import "@babel/polyfill";
import BlueBottle from '../../server/blueBottle.js';
import NodeCards from '../Components/NodeCards.jsx';
import Typography from '@material-ui/core/Typography';

// d3Data reference
// "cluster_name": cluster_name,
// "nodes": [],
// "links": [],
// "producers": producers.length,
// "exchanges": exchanges.length,
// "queues": queues.length,
// "consumers": consumers.length

const purpleTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#6200EE',
    },
    secondary: {
      main: '#f44336',
    },
    error: {
      main: '#ffffff',
    }
  },
  spacing: 10
})

function makeTitles(d3Data) {
  const titles = [];
  const nameTitles = ['Producers', 'Exchanges', 'Queues', 'Consumers']

  for (let i = 0; i < nameTitles.length; i++)
    titles.push({
      name: nameTitles[i],
      y: (d3Data.height / 4) * (i+1) - (d3Data.height * 0.1) - 40,
      x: 25
    });

  return titles;
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hostname: "192.168.0.236",
      username: "test",
      password: "test",
      port: "15672",
      width: (window.innerWidth * 60) / 100,
      height: (window.innerHeight * 95) / 100,
      padding: 10,
      nodecards: [],
      visualizer: false,
      hoverNode: false,
    }

    this.blueBottle = null;
    this.updateHostname = this.updateHostname.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updatePort = this.updatePort.bind(this);
    this.visualize = this.visualize.bind(this);
    this.updateNodeCards = this.updateNodeCards.bind(this);
    // this.decrementTarget = this.decrementTarget.bind(this);
  }
  
  
  async tick() {
    if (this.blueBottle === null) return;

    const d3Data = await this.blueBottle.getData();
    const dataTitles = makeTitles(d3Data);
    this.setState({ ...d3Data, titles: dataTitles });
  }
  componentWillMount() {
    document.body.classList.add('background')
  }
  componentDidMount() {
    this.timer = setInterval(
      () => {
        this.tick()
      }
      , 200)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
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
    const userConfig = {
      host: this.state.hostname,
      username: this.state.username,
      password: this.state.password,
      port: this.state.port,
      isWeb: true
    };

    this.blueBottle = new BlueBottle(userConfig);
    this.setState({ visualizer: true })
  }

  updateNodeCards(node) {
    console.log(node)
    switch (node.group) {
      case 1: {
       return this.setState({
          nodecards: [
            { "Type": "Producer" },
            { "Messages Published": node.message_stats.publish },
            { "Publishes/s": node.message_stats.publish_details.rate },
            { "state": node.state }
          ]
        })
      }
      case 2: {
       return this.setState({
          nodecards: [
            { "Type": node.type },
            { "Publishes/s": node.message_stats.publish_in_details.rate },
            { "Messages Sent": node.message_stats.publish_out },
            { "Sent/s": node.message_stats.publish_out_details.rate },
          ]
        })
      }
      case 3: {
       return this.setState({
          nodecards: [
            { "Messages Published": node.message_stats.publish },
            { "Publishes/s": node.message_stats.publish_details.rate },
            { "Messages Sent": node.message_stats.deliver_get },
            { "Sent/s": node.message_stats.deliver_get_details.rate },
          ]
        })
      }
      case 4: {
       return this.setState({
          nodecards: [
            { "Type": "Consumer" },
            { "Messages Recieved": node.message_stats.deliver_get },
            { "Delivery Rate": node.message_stats.deliver_get_details.rate },
            { "state": node.state }
          ]
        })
      }
      default: return;
    }
  }

  popup(popuprect) {
    console.log('HOVERING')

  }

  popOff(node) {
    console.log('UNHOVERING')
    // this.setState({hoverNode: true})
    const div = d3.select('div')

    div.transition()
    .duration(300)
    .style('opacity', 0)
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
      document.body.classList.remove('background')
      return (
        <MuiThemeProvider theme={purpleTheme}>
          <SignIn className="container"
            updateHostname={this.updateHostname}
            updateUsername={this.updateUsername}
            updatePassword={this.updatePassword}
            updatePort={this.updatePort}
            visualize={this.visualize}
            {...this.state}
          />
        </MuiThemeProvider>)
    } else {
      document.body.classList.add('background-vis')
      return (
        <div className="grid-reloaded">
          <Typography variant="h1" color="inherit" className="instance">RabbitMQ Instance: {this.state.cluster_name}</Typography>
          <Display {...this.state} updateNodeCards={this.updateNodeCards} popup={this.popup} popOff={this.popOff}/>
          {this.state.message_stats && <OverviewCards {...this.state} />}
          <NodeCards {...this.state} />
          <Settings1 {...this.state} decrementTarget={this.decrementTarget} />
        </div>
       )
    }
  }
}

export default Main
