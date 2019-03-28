console.log('index.js')

import React  from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
    return (
        <div>Hello World</div>
    );
};

const element = document.getElementById('app');
ReactDOM.render(<Hello />, element);
