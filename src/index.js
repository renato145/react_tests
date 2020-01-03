import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import App from './App';

const App = () => {
  const [ x, setX ] = useState(0);
  const changeNumber = () => setTimeout(() => {
    setX(Math.random());
  }, 200);
  useEffect(() => { changeNumber() } );
  return <span>{x}</span>;
};

ReactDOM.render(<App />, document.getElementById('root'));
