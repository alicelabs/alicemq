import React from 'react';
import Main from './Containers/Main.jsx';
import ErrorBoundary from './Components/ErrorBoundary.jsx';

const App = () => {
  return (
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  );
};

export default App;
