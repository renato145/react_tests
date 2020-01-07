import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useAuData } from './useAuData';
const d3 = require('d3');

const width = 960;
const height = 500;

const Test = ({ data, age }) => {
  const filteredData = useMemo(() => ( data.filter(d => d.Age===age) ), [data, age]);
  return (
    <div>
      {filteredData.map((d,i) => (
        <div key={i}>{d.Year} {d.Sex} {d.n}</div>
      ))}
    </div>
  );
}

const App = () => {
  const data = useAuData();
  const [ age, setAge ] = useState('');

  useEffect(() => {
    if(data){
      setAge('All ages');
    }
  }, [data]);

  if(!data){
    return <pre>Loading...</pre>;
  }
  const { allData, years, sexs, ages } = data;

  return (
    <div>
      <div className="title">Skin cancer on Australia</div>
      <div className="selector">
        <label>Age</label>
        <select onChange={e => setAge(e.target.value)} value={age}>
          {ages.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
      <Test data={allData} age={age} />
      <div>Query: {age}</div>
      <svg width={width} height={height}>
      </svg>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
