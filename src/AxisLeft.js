import React, { useRef, useEffect } from 'react';
const d3 = require('d3');

// export const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) => {
//   const g = useRef(null);
//   useEffect(() => {
//     // const yAxis = d3.svg.axis().scale(yScale).orient('left');
//     const axis = d3.select(g.current).append('g')
//       .transition().duration(200)
//       .call(d3.axisLeft(yScale));
//       // .attr('font-size', '1em');
//     axis.selectAll('.domain, .tick line').remove();;
//   }, [yScale]);

//   return (<g ref={g}>
//   </g>);
// };

export const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) =>
  yScale.ticks().map((tickValue, i) => (
    <g key={i} className='tick' transform={`translate(0,${yScale(tickValue)})`}>
      <line x2={innerWidth} />
      <text
        key={tickValue}
        style={{ textAnchor: 'end' }}
        x={-tickOffset}
        dy='.32em'
      >
        {tickValue}
      </text>
    </g>
  ));
