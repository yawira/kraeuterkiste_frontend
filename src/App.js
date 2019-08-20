import React, {Component} from 'react';
import './App.css';
import ColumnChart from './ColumnChart';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            moistureData: []
        }
    }


    generateWaterData = () => {
            return [{
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
            }]
    }

    fetchMoistureData = () => {
        const data = []
        // "credentials: include" configures js to append user-credentials into request-headers sent via fetch
        fetch("http://localhost:6060/dataview/moisture",
            {method: 'get', credentials: 'include',})
            .then(response => response.json())
            .then(moistureData => moistureData.moistureList.map(dataPoint => {
                const percentage = dataPoint.moisturePercentage
                const datetime =  dataPoint.moistureDateTime
                data.push({dateTime: datetime.toString(), percentage: parseInt(percentage)})
            }))

        this.setState({
            moistureData: data,
        })
    }

    render() {
        const moistureData = this.state.moistureData.slice()

        const waterData = this.generateWaterData()
        return (
            <div className="App">
                {/* everything passed inside the curly braces is passed to the "props" */}
                <ColumnChart xAxisName={"dateTime"} yAxisName={"percentage"} div={"moistureChart"} data={moistureData}/>
                <ColumnChart xAxisName={"country"} yAxisName={"visits"} div={"waterChart"} data={waterData}/>
            </div>
        );
    }
}

