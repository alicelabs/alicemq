import React from 'react';
import { Button } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const buttonTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#e1e1dd', // gray
    },
  },
  spacing: 10
});

const TrafficButton = (props) => {
    return(
        <MuiThemeProvider theme={buttonTheme}>
        <div className="traffic">
            <Button classes={{ label: 'material-button' }} fullWidth={true} variant="contained" size='large' color="primary" onClick={props.toggleMode} >{props.trafficMode ? "Normal" : "Traffic"}</Button>
        </div>
        </MuiThemeProvider>
    )
};

export default TrafficButton;