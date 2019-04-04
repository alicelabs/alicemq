import React from 'react';
import Button from './Button.jsx'
import Typography from '@material-ui/core/Typography'
import {TextField} from '@material-ui/core'

function SignIn(props) {
    
  return <React.Fragment>
   
    
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
        margin="dense"
      />
      <TextField
        id='username'
        type='text'
        name='username'
        placeholder='Username'
        onChange={ props.updateUsername }
        label='Username'
        variant='outlined'
        margin="dense"
      />
      <TextField
        id='password'
        type='password'
        name='password'
        variant='outlined'
        label='Password'
        onChange={ props.updatePassword }
        margin="dense"
      />
      <TextField
        id='port'
        type='text'
        name='port'
        placeholder='Default: 15672'
        onChange={ props.updatePort }
        variant='outlined'
        label='Port'
        margin="dense"
      />
    </div>
    <div id='signIn'>
      <Button
          visualize={ props.visualize }
      >
      Visualize
      </Button>
    </div>
 </React.Fragment> 
}

export default SignIn;