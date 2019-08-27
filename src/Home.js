import React, {Component} from "react";
import "./App.css";
import ColumnChart from "./ColumnChart";
import LineChart from "./LineChart";
import "./charts.css";
import {Button} from "react-bootstrap";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moistureData: [],
            pumpData: [],
            photoData: [],
            ledOn: false,
            pumpOn: false
        };
    }

    componentDidMount() {
        this.fetchPumpData();
        this.fetchMoistureData();
    }

    // "credentials: include" configures js to append user-credentials into request-headers sent via fetch
    fetchPumpData = () => {
        fetch("http://localhost:6060/dataview/pump", {credentials: "include"})
            .then(response => response.json())
            .then(pumpData => {
                this.setState({
                    pumpData: pumpData.pumpList
                });
            });
    };

    fetchMoistureData = () => {
        fetch("http://localhost:6060/dataview/moisture", {credentials: "include"})
            .then(response => response.json())
            .then(moistureData => {
                this.setState({
                    moistureData: moistureData.moistureList
                });
            });
    };


    toggleLight = () => {
        fetch("http://localhost:6060/led/toggle", {credentials: "include"})
            .then(result => result.json())
            .then(result => {
                this.setState({
                    ledOn: result.on,
                })
            })
    }


    togglePump = () => {
        fetch("http://localhost:6060/pump/toggle", {credentials: "include"})
            .then(result => result.json())
            .then(result => {
                this.setState({
                    pumpOn: result.on,
                })
            })
    }


    showPhoto = () => {
        fetch("http://localhost:6060/readImage", {credentials: "include"})
        // response - was wir vom Server bekommen => Umwandeln in json-Format
            .then(response => response.json())
            // photoData = response.json() als Parameter
            .then(photoData => {
                this.setState({
                    photoData: photoData
                })
            })
    }


    render() {
        const moistureData = this.state.moistureData.map(data => {
            // map-function generates an Array and the return statement maps the data
            return {
                dateTime: data.moistureDateTime,
                percentage: parseInt(data.moisturePercentage)
            };
        });
        const pumpData = this.state.pumpData.map(data => {
            return {
                dateTime: data.startWatering,
                duration: parseInt(data.stopWatering) - parseInt(data.stopWatering)
            };
        });
        const ledOn = this.state.ledOn

        const pumpOn = this.state.pumpOn

        // data:image etc. ist die notwendige Syntax von HTML um ein Base64 kodierten String zu entpacken
        const img = "data:image/jpg;base64," + this.state.photoData.encodedImage

        return (


            <div className="App">


                <div className="container col-lg-12">


                    <div className={"row"} style={{marginTop:"20px"}}>
                        <div className="col-md-6">
                            <h5>Feuchtigkeitsprofil</h5>
                        </div>
                        <div className="col-md-6">
                            <h5>Bild der Kräuterkiste</h5>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col col-md-6">
                            <LineChart
                                div={"moistureChart"}
                                data={moistureData}
                                xAxisName={"dateTime"}
                                yAxisName={"percentage"}
                            />
                        </div>
                        <div className="col col-md-6">
                            <img className="image" src={img} alt="error" style={{width: "inherit", height: "inherit"}}/>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col col-md-6">
                            <Button
                                id="moistureButton"
                                onClick={() => {
                                    this.fetchMoistureData();
                                }}
                            >
                                refresh
                            </Button>
                        </div>
                        <div className="col col-md-6">
                            <Button
                                id="photoButton"
                                onClick={() => {
                                    this.showPhoto();
                                }}
                            >
                                picture
                            </Button>
                        </div>
                    </div>


                    <div className={"row"} style={{marginTop:"50px"}}>
                        <div className="col-md-6">
                            <h5>Bewässerungsprofil</h5>
                        </div>
                        <div className="col-md-6">
                            <h5>Lichtprofil</h5>
                        </div>
                    </div>


                    <div className="row">


                        <div className="col col-md-6">
                            <ColumnChart
                                div={"pumpChart"}
                                data={pumpData}
                                xAxisName={"dateTime"}
                                yAxisName={"duration"}
                            />
                        </div>
                        <div className="col col-md-6">
                            <ColumnChart
                                div={"exposureChart"}
                                data={moistureData}
                                xAxisName={"dateTime"}
                                yAxisName={"percentage"}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-md-6">
                            <Button
                                id="pumpButton"
                                onClick={() => {
                                    this.togglePump();
                                }}
                            >
                                Watering is {pumpOn ? "on" : "off"}
                            </Button>
                        </div>

                        <div className="col col-md-6">
                            <Button
                                id="exposureButton"
                                onClick={() => {
                                    this.toggleLight();
                                }}
                            >
                                Light is {ledOn ? "on" : "off"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
