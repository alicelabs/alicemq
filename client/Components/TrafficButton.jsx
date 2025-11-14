import React from 'react';
import { Button } from '@mui/material';
import { ThemeProvider, createMuiTheme } from '@mui/material/styles';

const buttonTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#e1e1dd', // gray
    },
  },
  spacing: 10,
});

const TrafficButton = (props) => {
  return (
    <ThemeProvider theme={buttonTheme}>
      <div className="traffic">
        <Button
          classes={{ label: 'material-button' }}
          fullWidth={true}
          variant="contained"
          size="large"
          color="primary"
          onClick={props.toggleMode}
        >
          {props.trafficMode ? 'Normal' : 'Traffic'}
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default TrafficButton;
