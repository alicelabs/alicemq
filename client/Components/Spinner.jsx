import React from 'react';
import { withStyles } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

const styles = (theme) => ({
  // progress: {
  //     margin: theme.spacing.unit * 2
  // },
  // root: {
  //     flexGrow: 1,
  //   },
});

function Spinner(props) {
  return (
    <div className="spinner">
      <CircularProgress color="primary" size={100} id="spin" />
      {/* <LinearProgress color="primary" /> */}
    </div>
  );
}

export default withStyles(styles)(Spinner);
