import React, { Component } from "react";
import "../App.css";
import LineChart from "../charts/LineChart";
import "../charts/charts.css";
import { Button } from "react-bootstrap";
import GanttChart from "../charts/GanttChart"

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moistureData: [],
      pumpData: [],
      photoData: [],
      exposureData: [],
      ledOn: false,
      pumpOn: false
    };
  }

  componentDidMount() {
    this.fetchPumpData();
    this.fetchMoistureData();
    this.fetchExposureData();
  }

  // "credentials: include" configures js to append user-credentials into request-headers sent via fetch
  fetchPumpData = () => {
    fetch("http://localhost:6060/pump/data", { credentials: "include" })
      .then(response => response.json())
      .then(pumpData => {
        this.setState({
          pumpData: pumpData.pumpList
        });
      });
  };

  fetchMoistureData = () => {
    fetch("http://localhost:6060/moisture/data", { credentials: "include" })
      .then(response => response.json())
      .then(moistureData => {
        this.setState({
          moistureData: moistureData.moistureList
        });
      });
  };

  fetchExposureData = () => {
    fetch("http://localhost:6060/exposure/data", { credentials: "include" })
      .then(response => response.json())
      .then(exposureData => {
        this.setState({
          exposureData: exposureData.exposureList
        });
      });
  };

  toggleExposure = () => {
    fetch("http://localhost:6060/exposure/toggle", { credentials: "include" })
      .then(result => result.json())
      .then(result => {
        if (!result.on) {
          this.fetchExposureData();
        }
        this.setState({
          ledOn: result.on
        });
      });
  };

  togglePump = () => {
    fetch("http://localhost:6060/pump/toggle", { credentials: "include" })
      .then(result => result.json())
      .then(result => {
        if (!result.on) {
          this.fetchPumpData();
        }
        this.setState({
          pumpOn: result.on
        });
      });
  };

  takePhoto = () => {
    fetch("http://localhost:6060/camera/photo", { credentials: "include" })
      // response - was wir vom Server bekommen => Umwandeln in json-Format
      .then(response => response.json())
      // photoData = response.json() als Parameter
      .then(photoData => {
        this.setState({
          photoData: photoData
        });
      });
  };

  toDateStr = date => {
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("-");
  };

  toTimeStr = date => {
    let hour = ("0" + date.getHours()).slice(-2);
    let minute = ("0" + date.getMinutes()).slice(-2);
    let sec = ("0" + date.getSeconds()).slice(-2);
    return [hour, minute, sec].join(":");
  };

  render() {
    const moistureData = this.state.moistureData.map(data => {
      // map-function generates an Array and the return statement maps the data
      return {
        dateTime: new Date(data.moistureDateTime),
        percentage: parseInt(data.moisturePercentage)
      };
    });

    const pumpData = this.state.pumpData.map(data => {
      const start = new Date(data.start);
      const stop = new Date(data.stop);

      return {
        date: this.toDateStr(start),
        start: this.toDateStr(start) + " " + this.toTimeStr(start),
        stop: this.toDateStr(stop) + " " + this.toTimeStr(stop)
      };
    });

    const exposureData = this.state.exposureData.map(data => {
      const start = new Date(data.start);
      const stop = new Date(data.stop);

      return {
        date: this.toDateStr(start),
        start: this.toDateStr(start) + " " + this.toTimeStr(start),
        stop: this.toDateStr(stop) + " " + this.toTimeStr(stop)
      };
    });

    const ledOn = this.state.ledOn;

    const pumpOn = this.state.pumpOn;

    // data:image etc. ist die notwendige Syntax von HTML um ein Base64 kodierten String zu entpacken
    const img = "data:image/jpg;base64," + this.state.photoData.encodedImage;

    return (
      <div className="App">
        <div className="container col-lg-12">
          <div className={"row"} style={{ marginTop: "20px" }}>
            <div className="col-md-6">
              <h5>Moisture profile</h5>
            </div>
            <div className="col-md-6">
              <h5>Picture of Kräuterkiste</h5>
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
              <img
                className="image"
                src={img}
                alt="error"
                style={{ width: "inherit", height: "inherit" }}
              />
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
                refresh{" "}
              </Button>
            </div>
            <div className="col col-md-6">
              <Button
                id="photoButton"
                onClick={() => {
                  this.takePhoto();
                }}
              >
                picture{" "}
              </Button>
            </div>
          </div>

          <div className={"row"} style={{ marginTop: "50px" }}>
            <div className="col-md-6">
              <h5>Water statistics</h5>
            </div>
            <div className="col-md-6">
              <h5>Exposure data</h5>
            </div>
          </div>

          <div className="row">
            <div className="col col-md-6">
              <GanttChart
                div={"pumpChart"}
                data={pumpData}
                xAxisName={"date"}
                yOpenDate={"start"}
                yCloseDate={"stop"}
              />
            </div>
            <div className="col col-md-6">
            <GanttChart
                div={"exposureChart"}
                data={exposureData}
                xAxisName={"date"}
                yOpenDate={"start"}
                yCloseDate={"stop"}
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
                  this.toggleExposure();
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
