import React,{Component} from 'react';
import './App.css';
import MoistureChart from "./MoistureChart";
import ColumnChart from './ColumnChart';

export default class App extends Component {
  

 generateMoistureData = () => {
     return [
      {
        country: "USA",
        visits: 23725
      },
      {
        country: "China",
        visits: 1882
      },
      {
        country: "Japan",
        visits: 1809
      },
      {
        country: "Germany",
        visits: 1322
      },
      {
        country: "UK",
        visits: 1122
      },
      {
        country: "France",
        visits: 1114
      },
      {
        country: "India",
        visits: 984
      },
      {
        country: "Spain",
        visits: 711
      },
      {
        country: "Netherlands",
        visits: 665
      },
      {
        country: "Russia",
        visits: 580
      },
      {
        country: "South Korea",
        visits: 443
      },
      {
        country: "Canada",
        visits: 441
      }
    ];

  } 

  generateWaterData = () => {
    return [
     {
       country: "USA",
       visits: 23725
     },
     {
       country: "China",
       visits: 1882
     },
     {
       country: "Japan",
       visits: 1809
     },
     {
       country: "Germany",
       visits: 1322
     },
     {
       country: "UK",
       visits: 1122
     },
     {
       country: "France",
       visits: 1114
     },
     {
       country: "India",
       visits: 984
     },
     {
       country: "Spain",
       visits: 711
     },
     {
       country: "Netherlands",
       visits: 665
     },
     {
       country: "Russia",
       visits: 580
     },
     {
       country: "South Korea",
       visits: 443
     },
     {
       country: "Canada",
       visits: 441
     }
   ];

 } 
  
render(){
  const moistureData = this.generateMoistureData()
  const waterData = this.generateWaterData()
    return (
      <div className="App">
          {/* everything passed inside the curly braces is passed to the "props" */}
          <ColumnChart div={"moistureChart"} data={moistureData}/>
          <ColumnChart div={"waterChart"} data={waterData}/>
      </div>
    );
  }
}

