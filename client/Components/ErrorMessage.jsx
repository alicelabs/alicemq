import React from 'react';
import Typography from '@material-ui/core/Typography'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const redTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#6200EE',
    },
    secondary: {
      main: '#e1e1dd',
    },
    error: {
      main: '#aa0000',
    }
  },
  spacing: 10
})

function ErrorMessage(props){
    return(
    <MuiThemeProvider theme={redTheme}>
        <div className={props.msg ? 'displayError' : 'hideError'}>
            <Typography color='error'>{props.msg}</Typography>
            <div><Typography>Please check <a href="https://github.com/alicelabs/alicemq/blob/master/README.md#troubleshooting" target="_blank">troubleshooting</a> page</Typography></div>
        </div>
    </MuiThemeProvider>
    )
}

export default ErrorMessage;