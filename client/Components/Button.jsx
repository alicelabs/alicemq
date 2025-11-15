import React from 'react';
import { withStyles } from '@mui/material/styles';
import { Button } from '@mui/material';

const styles = (_theme) => ({
  sizing: '75%',
});

function ContainedButtons(props) {
  return (
    <Button
      width="75%"
      margin="normal"
      variant="contained"
      color="primary"
      id="signIn"
      onClick={props.visualize}
    >
      Visualize
    </Button>
  );
}

export default withStyles(styles)(ContainedButtons);
