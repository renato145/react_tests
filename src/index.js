import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useAuData } from './useAuData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
const d3 = require('d3');

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

const App = () => {
  const xAxisLabel = 'Year';
  const xValue = d => +d.Year;
  const yAxisLabel = 'Deaths';
  const yValue = d => +d.n;
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const data = useAuData();
  const [ age, setAge ] = useState('All ages');
  const procData = useMemo(() => {
    if(data){
      const { allData, years, sexs, ages } = data;
      const filteredData = allData.filter(d => d.Age===age);
      const maxN = d3.max(filteredData.map(d => +d.n));

      const xScale = d3.scaleLinear()
        .domain(d3.extent(years))
        .range([0, innerWidth])
        .nice();

      const yScale = d3.scaleLinear()
        .domain([0,maxN])
        .range([innerHeight, 0])
        .nice();

      return {
        filteredData, years, sexs, ages, xScale, yScale,
      };
    }
  }, [data, age]);

  if(!data){
    return <pre>Loading...</pre>;
  }
  const { filteredData, years, sexs, ages, xScale, yScale } = procData;

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
      <div>Query: {age}</div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickOffset={7}
          />
          <text
            className='axis-label'
            textAnchor='middle'
            transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
          >
            {yAxisLabel}
          </text>
          <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={7} />
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            {xAxisLabel}
          </text>
          <Marks
            data={filteredData}
            sex="Male"
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
          />
          <Marks
            data={filteredData}
            sex="Female"
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
          />
        </g>
      </svg>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
