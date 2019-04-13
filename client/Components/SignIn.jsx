import React from 'react';
import Button from './Button.jsx'
import Typography from '@material-ui/core/Typography'
import {TextField} from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl';


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
      main: '#ffffff',
    }
  },
  spacing: 10
})


function SignIn(props) {
  document.body.classList.remove('background-vis');

  return (
    <MuiThemeProvider theme={purpleTheme}>
    <div className='login-box'>
    <Typography variant = 'h4' color="primary" >Alice Visualizer</Typography>
      <TextField
        id='host'
        variant='outlined'
        label='Host'
        type='text'
        name='host'
        placeholder='RabbitMQ HTTP Hostname'
        onChange={ props.updateHostname }
        onBlur={ props.validateHostname }
        margin='dense'
        required='true'
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
        required='true'
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
        required='true'
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
        required='true'
      />
    </div>
    <div id='signIn'>
      <Button
          visualize={ props.visualize }
      >
      Visualize
      </Button>
    </div>
    </MuiThemeProvider>)
}

export default SignIn;