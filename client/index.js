import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import Main from './Containers/Main.jsx'


const Hello = (props) => {
    return (
      <h1> hello world </h1>
    );
};

const App = (props) => {
    return (
        <Main />
    )
}

const el = document.getElementById('app');
ReactDOM.render(<App/ >, el )

module.hot.accept();
