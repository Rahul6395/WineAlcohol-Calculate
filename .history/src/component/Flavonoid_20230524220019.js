import React,{useState,useEffect} from 'react';
import data from "../json/data.json"
// import "./css/style.css"


function Flavonoid() {

const [value ,setValue] = useState([])

useEffect(()=>{
    for(let i=0;i<data.length;i++){
        setValue(value=>[...value,data[i].Alcohol])
    }
},[])
//Get All Alcohol
const alcohol = new Set(value);
console.log("Alcohol",[...alcohol])

  const classNames = [...alcohol]; // Replace with your actual class names

//Mean Rahul
function mean(data,classN){
  let dataFilter=data.filter((data)=>data.Alcohol === classN)
  console.log("reduce",dataFilter)
  let reduce = dataFilter.reduce((a,b)=>a+b,0)
  return reduce/dataFilter.length
}
mean(data,classNames)

 classNames.map((classN)=>{
 console.log("mean(data,classN)",mean(data,classN).toFixed(3)) 
} )










  //Mean
  function calculateMean(data, className) {
    const filteredData = data.filter(item => item.Alcohol === className);
    const sum = filteredData.reduce((acc, item) => acc + item.Flavanoids, 0);
    return parseInt(sum) / filteredData.length;
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

  return (
    <> <h2 className='heading'>Flavanoids</h2>
    <table>
      <thead>
        <tr>
          <th>Measure</th>
          {classNames.map(className => <th key={className}>Class {className}</th>)}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Flavanoids Mean</td>
          {classNames.map(className => <td key={className}>{calculateMean(data, className).toFixed(3)}</td>)}
        </tr>
        <tr>
          <td>Flavanoids Median</td>
          {classNames.map(className => <td key={className}>{calculateMedian(data, className)}</td>)}
        </tr>
        <tr>
          <td>Flavanoids Mode</td>
          {classNames.map(className => <td key={className}>{calculateMode(data, className)}</td>)}
        </tr>
      </tbody>
    </table>
    </>
  );
}

export default Flavonoid;
