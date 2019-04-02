import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { red, purple } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import { sizing } from '@material-ui/system';

const styles = theme => ({
  sizing: "75%"
});

function ContainedButtons(props) {
  const { classes } = props;
  return (
      <Button width='75%' margin="normal" variant="contained" color="primary" id="signIn" onClick={props.visualize} >
        Visualize
      </Button>
  );
}


export default withStyles(styles)(ContainedButtons);