import React from 'react'
import { Button } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import TrafficButton from '../Components/TrafficButton.jsx'

const buttonTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#e1e1dd', // gray
      light: '#cc0028', // red
    },
    secondary: {
      main: '#cc0028', // red
    },
    error: {
      main: '#00a300', // green
    }
  },
  spacing: 10
});

const startStopTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: { main: '#00a300' }, // gray
    secondary: { main: '#cc0028' }, // red
  },
  spacing: 10
});


const SignOut = (props) => {
  return (
    <React.Fragment>
      <div className="signout">
        <MuiThemeProvider theme={buttonTheme}>
          <Button classes={{ label: 'material-button' }} fullWidth={true} variant="contained" size='large'  color="primary" onClick={props.configureInstance} >Sign out</Button>
        </MuiThemeProvider>
      </div>
      <div className="traffic-mode">
                <TrafficButton {...props} toggleMode={props.toggleMode} />
            </div>

      <div className="stop">
        <MuiThemeProvider theme={startStopTheme}>
          <Button classes={{ label: 'material-button' }} fullWidth={true} variant="contained" size='large' color={props.pause ? "primary" : "secondary"} onClick={props.toggleStartStop}>{props.pause ? "START" : "STOP"}</Button>
        </MuiThemeProvider>
      </div>
      </React.Fragment>
  )
}

export default SignOut;