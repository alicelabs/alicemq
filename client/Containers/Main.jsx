import React, { useState, useEffect, useRef, useCallback } from 'react';
import Settings1 from '../Components/Settings1.jsx';
import Display from '../Components/Display.jsx';
import FrontPage from '../Components/FrontPage.jsx';
import SignOut from '../Components/SignOut.jsx';
import Spinner from '../Components/Spinner.jsx';
import OverviewCards from '../Components/OverviewCards.jsx';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import BlueBottle from '../../server/blueBottle.js';
import NodeCards from '../Components/NodeCards.jsx';

function makeTitles(d3Data) {
  const titles = [];
  const nameTitles = ['Producers', 'Exchanges', 'Queues', 'Consumers'];

  for (let i = 0; i < nameTitles.length; i++)
    titles.push({
      name: nameTitles[i],
      y: (d3Data.height / 4) * (i + 1) - d3Data.height * 0.1 - 40,
      x: 25,
    });

  return titles;
}

const initialState = {
  hostname: '',
  username: '',
  password: '',
  port: '',
  d3Data: {},
  width: window.innerWidth,
  height: window.innerHeight,
  padding: 10,
  nodecards: [],
  visualizer: false,
  loggedIn: false,
  toggled: {},
  nodes: [],
  links: [],
  pause: false,
  trafficMode: false,
  errorHostname: '',
  errorUsername: '',
  errorPassword: '',
  errorPort: '',
  errorConnection: '',
};

const Main = () => {
  const [state, setState] = useState(initialState);
  const blueBottleRef = useRef(null);
  const timerRef = useRef(null);

  const tick = useCallback(async () => {
    if (blueBottleRef.current === null) return;
    try {
      const d3Data = await blueBottleRef.current.getData();

      d3Data.nodes.forEach((x) => {
        if (state.toggled[x.identifier]) {
          x.visibility = false;
        } else {
          x.visibility = true;
        }
      });

      const dataTitles = makeTitles(d3Data);
      setState((prev) => ({ ...prev, ...d3Data, titles: dataTitles, visualizer: true }));
    } catch (e) {
      const error = e.message.replace(/^TypeError: /, '');
      setState((prev) => ({
        ...prev,
        errorConnection: error,
        loggedIn: false,
        pause: true,
      }));
    }
  }, [state.toggled]);

  useEffect(() => {
    document.body.classList.add('background');

    timerRef.current = setInterval(() => {
      if (!state.pause) {
        tick();
      }
    }, 900);

    return () => {
      blueBottleRef.current = null;
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.pause, tick]);

  const updateHostname = (e) => {
    setState((prev) => ({ ...prev, hostname: e.target.value }));
  };

  const updateUsername = (e) => {
    setState((prev) => ({ ...prev, username: e.target.value }));
  };

  const updatePassword = (e) => {
    setState((prev) => ({ ...prev, password: e.target.value }));
  };

  const updatePort = (e) => {
    setState((prev) => ({ ...prev, port: e.target.value }));
  };

  const toggleVisibility = (e) => {
    const nodes = state.nodes;
    const newToggled = { ...state.toggled };

    nodes.forEach((x) => {
      if (x.identifier === e.target.id && x.group === 2) {
        newToggled[x.identifier] = !newToggled[x.identifier];
      }
    });

    setState((prev) => ({ ...prev, toggled: newToggled }));
  };

  const toggleStartStop = () => {
    setState((prev) => ({ ...prev, pause: !prev.pause }));
  };

  const toggleMode = () => {
    setState((prev) => ({ ...prev, trafficMode: !prev.trafficMode }));
  };

  const configureInstance = () => {
    setState({ ...initialState, pause: true });
  };

  const validateAll = () => {
    if (state.errorHostname !== '') return false;
    if (state.errorUsername !== '') return false;
    if (state.errorPassword !== '') return false;
    if (state.errorPort !== '') return false;
    return true;
  };

  const validateHostname = (e) => {
    if (e.target.value) {
      setState((prev) => ({ ...prev, errorHostname: '' }));
      return;
    }
    setState((prev) => ({ ...prev, errorHostname: 'Invalid IP Address' }));
  };

  const validateUsername = (e) => {
    if (e.target.value) {
      setState((prev) => ({ ...prev, errorUsername: '' }));
      return;
    }
    setState((prev) => ({ ...prev, errorUsername: 'Invalid Username' }));
  };

  const validatePassword = (e) => {
    if (e.target.value) {
      setState((prev) => ({ ...prev, errorPassword: '' }));
      return;
    }
    setState((prev) => ({ ...prev, errorPassword: 'Invalid Password' }));
  };

  const validatePort = (e) => {
    const numRegex = /^[0-9]*$/;
    if (numRegex.test(e.target.value) && e.target.value) {
      setState((prev) => ({ ...prev, errorPort: '' }));
      return;
    }
    setState((prev) => ({ ...prev, errorPort: 'Invalid Port' }));
  };

  const visualize = () => {
    if (!validateAll()) return;

    const userConfig = {
      host: state.hostname,
      username: state.username,
      password: state.password,
      port: state.port,
      isWeb: false,
    };

    blueBottleRef.current = new BlueBottle(userConfig);
    setState((prev) => ({ ...prev, pause: false, loggedIn: true }));
  };

  const updateNodeCards = (node) => {
    let nodecards = [];

    switch (node.group) {
      case 1:
        nodecards = [
          { Type: 'Producer' },
          { 'Total Published': node.message_stats.publish },
          { 'Publishes/s': node.message_stats.publish_details.rate },
          { state: node.state },
        ];
        break;
      case 2:
        nodecards = [
          { Type: node.type },
          { 'Publishes/s': node.message_stats.publish_in_details.rate },
          { 'Messages Sent': node.message_stats.publish_out },
          { 'Sent/s': node.message_stats.publish_out_details.rate },
        ];
        break;
      case 3:
        nodecards = [
          { 'Total Received': node.message_stats.publish },
          { 'Recieved/s': node.message_stats.publish_details.rate },
          {
            'Total Sent':
              node.message_stats.deliver_get === undefined ? '0' : node.message_stats.deliver_get,
          },
          {
            'Sent/s':
              node.message_stats.deliver_get_details === undefined
                ? '0'
                : node.message_stats.deliver_get_details.rate,
          },
        ];
        break;
      case 4:
        nodecards = [
          { Type: 'Consumer' },
          { 'Total Received': node.message_stats.deliver_get },
          { 'Delivery Rate': node.message_stats.deliver_get_details.rate },
          { state: node.state },
        ];
        break;
      default:
        return;
    }

    setState((prev) => ({ ...prev, nodecards }));
  };

  // Render logic
  if (!state.visualizer && !state.loggedIn) {
    return (
      <FrontPage
        className="container"
        updateHostname={updateHostname}
        updateUsername={updateUsername}
        updatePassword={updatePassword}
        updatePort={updatePort}
        visualize={visualize}
        validateHostname={validateHostname}
        validateUsername={validateUsername}
        validatePassword={validatePassword}
        validatePort={validatePort}
        {...state}
      />
    );
  }

  if (!state.visualizer && state.loggedIn) {
    return <Spinner />;
  }

  document.body.classList.add('background-vis');
  return (
    <div className="grid-reloaded">
      <SignOut
        {...state}
        configureInstance={configureInstance}
        toggleStartStop={toggleStartStop}
        toggleMode={toggleMode}
      />
      <div className="instance">
        <span>
          Instance: <strong>{state.cluster_name}</strong>
          <br />
          ip: <strong>{state.hostname}</strong>
        </span>
      </div>
      <Display {...state} updateNodeCards={updateNodeCards} />
      {state.message_stats && <OverviewCards {...state} />}
      <NodeCards {...state} />
      <Settings1 {...state} mute={toggleVisibility} />
    </div>
  );
};

export default Main;
