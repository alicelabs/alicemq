import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import css from './static/style.css';
import App from './App.jsx'



const el = document.getElementById('app');
ReactDOM.render(<App/ >, el )

module.hot.accept();
