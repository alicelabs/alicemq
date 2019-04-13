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
    primary: {main:'#00a300'}, // gray
    secondary: {main:'#cc0028'}, // red
  },
  spacing: 10
});


const SignOut = (props) => {
    return(
        <MuiThemeProvider theme={buttonTheme}>
            <div className="nonviz">
                <Button width='75%' variant="contained" color="primary" onClick={props.configureInstance} >Sign out</Button>
                <MuiThemeProvider theme={startStopTheme}>
                    <Button width='75%' variant="contained" color={props.pause ? "primary" : "secondary"} onClick={props.toggleStartStop}>{props.pause ? "START" : "STOP"}</Button>
                </MuiThemeProvider>
                <TrafficButton {...props} toggleMode={props.toggleMode} />
            </div>
        </MuiThemeProvider>
    )
}

export default SignOut;