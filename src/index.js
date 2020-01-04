import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useAuData } from './useAuData';
const d3 = require('d3');

const App = () => {
  const data = useAuData();
  if(!data){
    return <pre>Loading...</pre>;
  }
  const { allData, years, sexs, ages } = data;
  console.log(allData[0]);
  console.log(sexs);
  console.log(ages);
  return (
    <div>
      <div>
        <h1>Year</h1>
        {years.map(d => (
          <span>{d}<br /></span>
        ))}
      </div>
      <div>
        <h1>Sex</h1>
        {sexs.map(d => (
          <span>{d}<br /></span>
        ))}
      </div>
      <div>
        <h1>Age</h1>
        {ages.map(d => (
          <span>{d}<br /></span>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
