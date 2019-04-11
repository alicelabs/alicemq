import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = theme => ({
  sizing: "75%"
});

function ContainedButtons(props) {
  return (
      <Button width='75%' margin="normal" variant="contained" color="primary" id="signIn" onClick={props.visualize} >
        Visualize
      </Button>
  );
}


export default withStyles(styles)(ContainedButtons);