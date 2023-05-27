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
        console.log("data",data)
        const sum = data.reduce((acc, item) => acc + item, 0) / data.length;
        console.log("calculateMean",data.length)
        return sum;
      }
      
    //   Median
      function calculateMedian(data, className) {
        const filteredData = data.filter(item => item.Alcohol === className);
        const sortedData = filteredData.sort((a, b) => a.Flavanoids - b.Flavanoids);
        const midIndex = Math.floor(sortedData.length / 2);
        if (sortedData.length % 2 === 0) {
          return (sortedData[midIndex - 1]?.Flavanoids + sortedData[midIndex]?.Flavanoids) / 2;
        } else {
          return sortedData[midIndex].Flavanoids;
        }
      }
    
    //   Mode
      function calculateMode(data, className) {
        const filteredData = data.filter(item => item.Alcohol === className);
        const counts = {};
        filteredData.forEach(item => {
          counts[item.Flavanoids] = counts[item.Flavanoids] ? counts[item.Flavanoids] + 1 : 1;
        });
        let mode;
        let maxCount = 0;
        for (const value in counts) {
          if (counts[value] > maxCount) {
            mode = value;
            maxCount = counts[value];
          }
        }
        return mode;
      }
      let red = [] ;
      let green = [] ;
      const statsByClass = Object.entries(gammaByClass).map(([className, gammaValues]) => {
        red.push(className);
        green.push(gammaValues)
        console.log(className,"calculateMeangammaValues",gammaValues,)
    })
 //console.log("statsByClass ",green )
// console.log("gammaByClassstatsByClass ",gammaByClass )

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
          {red.map((className) => (
            <td >{calculateMedian(green, className)}</td>
          ))}
        </tr>
        <tr>
          <td>Gamma Mode</td>
          {red.map((className) => (
            <td >{calculateMode(green, className)}</td>
          ))}
        </tr>
      </tbody>
    </table>
    </div>
  );
}


export default GammaTable;
