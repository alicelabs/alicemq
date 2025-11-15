import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function Spinner() {
  return (
    <div className="spinner">
      <CircularProgress color="primary" size={100} id="spin" />
    </div>
  );
}

export default Spinner;
