import React, {Component} from 'react';
import './App.css';
import ColumnChart from './ColumnChart';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            moistureData: [],
            pumpData: [],
        }
    }

    componentDidMount() {
        this.fetchPumpData()
        this.fetchMoistureData()
    }

    // "credentials: include" configures js to append user-credentials into request-headers sent via fetch
    fetchPumpData = () => {
        fetch("http://localhost:6060/dataview/pump", {credentials: 'include',})
            .then(response => response.json())
            .then(pumpData => {
                this.setState({
                    pumpData: pumpData.pumpList,
                })
            })
    }


    // "credentials: include" configures js to append user-credentials into request-headers sent via fetch
    fetchMoistureData = () => {
        fetch("http://localhost:6060/dataview/moisture", {credentials: 'include',})
            .then(response => response.json())
            .then(moistureData => {
                this.setState({
                    moistureData: moistureData.moistureList,
                })
            })
    }

    render() {
        const moistureData = this.state.moistureData.map(data => {
            return {dateTime: data.moistureDateTime, percentage: parseInt(data.moisturePercentage)}
        })
        const pumpData = this.state.pumpData.map(data => {
            return {dateTime: data.startWatering, duration: parseInt(data.stopWatering) - parseInt(data.stopWatering)}
        })

        console.log(moistureData)

        return (
            <div className="App">
                {/* everything passed inside the curly braces is passed to the "props" */}
                <ColumnChart div={"moistureChart"} data={moistureData} xAxisName={"dateTime"} yAxisName={"percentage"}/>
                <ColumnChart div={"pumpChart"} data={pumpData} xAxisName={"dateTime"} yAxisName={"duration"}/>
            </div>
        );
    }
}

