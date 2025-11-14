import React from 'react';
import { createRoot } from 'react-dom/client';
import css from './static/style.css';
import App from './App.jsx';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);

if (module.hot) {
  module.hot.accept();
}
