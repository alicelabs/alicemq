import React from 'react';
import Button from './Button.jsx'
import Typography from '@material-ui/core/Typography'

function SignIn(props) {
    
  return <React.Fragment>
    <Typography variant = 'title' color="inherit">Sign In RabbitMQ:</Typography>
    <div className='login-box'>
      <input
        id='host'
        type='text'
        name='host'
        placeholder='RabbitMQ HTTP Hostname'
        onChange={ props.updateHostname }
      />
      <input
        id='username'
        type='text'
        name='username'
        placeholder='Username'
        onChange={ props.updateUsername }
      />
      <input
        id='password'
        type='password'
        name='password'
        placeholder='Password'
        onChange={ props.updatePassword }
      />
      <input
        id='port'
        type='text'
        name='port'
        placeholder='Default: 15672'
        onChange={ props.updatePort }
      />
      <button
        onClick={ props.visualize }
      >
        Visualize
      </button>
    </div>
  </React.Fragment>
  
}

export default SignIn;