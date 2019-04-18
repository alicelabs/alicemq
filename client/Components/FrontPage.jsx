import React from 'react';
import Button from './Button.jsx'
import Typography from '@material-ui/core/Typography'
import {TextField} from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import ErrorMessage from './ErrorMessage.jsx'

const purpleTheme = createMuiTheme({
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


function FrontPage(props) {
  document.body.classList.remove('background-vis');

  return (
    <MuiThemeProvider theme={purpleTheme}>
    <div className='login-box'>
    <Typography variant = 'h4' color="primary" >AliceMQ</Typography>
      <TextField
        id='host'
        label='Host'
        variant='outlined'
        type='text'
        name='host'
        placeholder='RabbitMQ IP Address'
        onChange={ props.updateHostname }
        onBlur={ props.validateHostname }
        margin='dense'
        autoFocus={true}
        error={props.errorHostname ? true : false}
      />
      <TextField
        id='username'
        type='text'
        name='username'
        placeholder='Username'
        onChange={ props.updateUsername }
        onBlur={ props.validateUsername }
        label='Username'
        variant='outlined'
        margin="dense"
        required={true}
        error={props.errorUsername ? true : false}
      />
      <TextField
        id='password'
        type='password'
        name='password'
        variant='outlined'
        label='Password'
        onChange={ props.updatePassword }
        onBlur={ props.validatePassword }
        margin="dense"
        required={true}
        error={props.errorPassword ? true : false}
      />
      <TextField
        id='port'
        type='text'
        name='port'
        placeholder='Default: 15672'
        onChange={ props.updatePort }
        onBlur={ props.validatePort }
        variant='outlined'
        label='Port'
        margin='dense'
        required={true}
        error={props.errorPort ? true : false}
      />
    </div>
    <div id='frontPage'>
      <Button
          visualize={ props.visualize }
      >
      Visualize
      </Button>
    </div>
    <div id='errorMessage'>
      <ErrorMessage  msg={props.errorConnection} /> 
    </div>
    </MuiThemeProvider>)
}


export default FrontPage;