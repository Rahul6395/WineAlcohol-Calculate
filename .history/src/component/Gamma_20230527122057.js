import React from 'react';
import data from "../json/data.json"

const GammaTable = () => {
    const gammaByClass = {};
    console.log("gammaStats",gammaByClass)
    data.forEach((point) => {
      const { Alcohol, Ash, Hue, Magnesium } = point;
      const gamma = (Ash * Hue) / Magnesium;

      if (gammaByClass[Alcohol]) {
        gammaByClass[Alcohol].push(gamma);
      } else {
        gammaByClass[Alcohol] = [gamma];
      }
    });

    function calculateMean( className,data) {
        // const filteredData = data.filter(item => item.Alcohol === className);
      //  console.log("data",data)
        const sum = data.reduce((acc, item) => acc + item, 0) / data.length;
      //  console.log("calculateMean",sum)
        return sum;
      }
      
    //   Median
      function calculateMedian( className,data,) {
        // const filteredData = data.filter(item => item.Alcohol === className);
        const sortedData = data.sort((a, b) => a - b);
        const midIndex = Math.floor(sortedData.length / 2);
        if (sortedData.length % 2 === 0) {
          return (sortedData[midIndex - 1] + sortedData[midIndex]) / 2;
        } else {
          return sortedData[midIndex];
        }
      }
    
    //   Mode
      function calculateMode( className,data,) { 
        const counts = {};
      data.forEach(item => {
          counts[item] = counts[item]  + 1 || 1;
        });
 
        let maxCount = 0;
        let mode = -Infinity;
        for (const value in counts) {
          const item = counts[value];
          if (item >= maxCount && Number(value) > mode) {
            maxCount = item;
            mode =Number(value);
         
          }
        }
        // if(mode.length === Object.keys(counts).length) mode =[];
        return mode.toFixed(3);
      }
     

  return (
    <div>
    <h2 className='heading'>Gamma</h2>
    <table>
      <thead>
        {/* <tr>
          <th>Measure</th>
          {gammaByClass.map((className, gammaValues) => (
            <th key={stat}>Class {stat.className}</th>
          ))}
        </tr> */}
      </thead>
      <tbody>
        <tr>
          <td>Gamma Mean</td>
          {/* {red.map((className) => (
            <td>{calculateMean(green, className).toFixed(3)}</td>
          ))} */}
        {
          Object.entries(gammaByClass).map(([className, gammaValues])=>(
            <td>{calculateMean( className,gammaValues).toFixed(3)}</td>
          ))
        }
        </tr>
        <tr>
          <td>Gamma Median</td>
          {
          Object.entries(gammaByClass).map(([className, gammaValues])=>(
            <td>{calculateMedian( className,gammaValues).toFixed(3)}</td>
          ))
        }
        </tr>
        <tr>
          <td>Gamma Mode</td>
          {
          Object.entries(gammaByClass).map(([className, gammaValues])=>(
            <td>{calculateMode( className,gammaValues)}</td>
          ))
        }
        </tr>
      </tbody>
    </table>
    </div>
  );
}


export default GammaTable;
