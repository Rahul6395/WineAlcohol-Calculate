import React from 'react';
import data from "../json/data.json"

const GammaTable = () => {

  // Function to calculate class-wise mean, median, and mode of Gamma
  const calculateGammaStats = () => {
    // Calculate Gamma for each point and group by class
    const gammaByClass = {};
    data.forEach((point) => {
      const { Alcohol, Ash, Hue, Magnesium } = point;
      const gamma = (Ash * Hue) / Magnesium;

      if (gammaByClass[Alcohol]) {
        gammaByClass[Alcohol].push(gamma);
      } else {
        gammaByClass[Alcohol] = [gamma];
      }
    });
console.log("gammaByClass",gammaByClass)
    // Calculate mean, median, and mode for each class
    const statsByClass = Object.entries(gammaByClass).map(([className, gammaValues]) => {
      // Mean
      const mean = gammaValues.reduce((sum, value) => sum + value, 0) / gammaValues.length;
      // Median
      let sortData = gammaValues.sort((a, b) => a - b);
      const median = sortData.length % 2 === 0 ? sortData[Math.floor((sortData.length / 2 )-1)] +  sortData[Math.floor(sortData.length / 2)] / 2 : sortData[Math.floor(sortData.length / 2)] 
 
      
      if (sortedData.length % 2 === 0) {
        return (sortedData[midIndex - 1]?.Flavanoids + sortedData[midIndex]?.Flavanoids) / 2;
      } else {
        return sortedData[midIndex].Flavanoids;
      };
      // Mode
      const mode = gammaValues.sort((a, b) =>
        gammaValues.filter((v) => v === a).length - gammaValues.filter((v) => v === b).length
      )[0];

      return {
        className,
        mean: mean.toFixed(3),
        median: median.toFixed(3),
        mode: mode.toFixed(3),
      };
    });

    return statsByClass;
  };

  const gammaStats = calculateGammaStats();

  return (
    <div>
    <h2 className='heading'>Gamma</h2>
    <table>
      <thead>
        <tr>
          <th>Measure</th>
          {gammaStats.map((stat) => (
            <th key={stat.className}>Class {stat.className}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Gamma Mean</td>
          {gammaStats.map((stat) => (
            <td key={stat.className}>{stat.mean}</td>
          ))}
        </tr>
        <tr>
          <td>Gamma Median</td>
          {gammaStats.map((stat) => (
            <td key={stat.className}>{stat.median}</td>
          ))}
        </tr>
        <tr>
          <td>Gamma Mode</td>
          {gammaStats.map((stat) => (
            <td key={stat.className}>{stat.mode}</td>
          ))}
        </tr>
      </tbody>
    </table>
    </div>
  );
}


export default GammaTable;
