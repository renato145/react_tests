import { useState, useEffect } from 'react';
import { csv } from 'd3';
import src from './skin_cancer_au.csv';

export const useAuData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(src).then(csvdata => {
      setData({
        allData: csvdata,
        years: [...new Set(csvdata.map(d => d.Year))],
        sexs: [...new Set(csvdata.map(d => d.Sex))],
        ages: [...new Set(csvdata.map(d => d.Age))],
      });
    });
  }, []);
  
  return data;
};
