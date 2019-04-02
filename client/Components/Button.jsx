import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
const {Button} = require('@material-ui/core');

// const buttonColor = purple['A700']

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: purple.A700
  },
  input: {
    display: 'none',
  },
});

function ContainedButtons(props) {
  const { classes } = props;
  return (
      <Button variant="contained" color="primary" id="signIn">
        Visualize
      </Button>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButtons);