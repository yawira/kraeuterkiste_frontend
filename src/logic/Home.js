import React, { Component } from "react";
import "../App.css";
import LineChart from "../charts/LineChart";
import "../charts/charts.css";
import { Button } from "react-bootstrap";
import GanttChart from "../charts/GanttChart";
import Photo from "./Photo"
import plant from "../pictures/plant.jpg"

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moistureData: [],
      pumpData: [],
      photoData: plant,
      exposureData: [],
      ledOn: false,
      pumpOn: false
    };
  }

  componentDidMount() {
    this.fetchMoistureData();
    this.fetchExposureData();
    this.fetchPumpData();
  }

  // "credentials: include" configures js to append user-credentials into request-headers sent via fetch
  fetchPumpData = () => {
    fetch("http://localhost:6060/pump/data", { credentials: "include" })
      .then(response => response.json())
      .then(pumpData => {
        this.setState({
          pumpData: pumpData,
        });
      });
  };

  fetchMoistureData = () => {
    fetch("http://localhost:6060/moisture/data", { credentials: "include" })
      .then(response => response.json())
      .then(moistureData => {
        this.setState({
          moistureData: moistureData,
        });
      });
  };

  fetchExposureData = () => {
    fetch("http://localhost:6060/exposure/data", { credentials: "include" })
      .then(response => response.json())
      .then(exposureData => {
        this.setState({
          exposureData: exposureData,
        });
      });
  };

  toggleExposure = () => {
    fetch("http://localhost:6060/exposure/toggle", { credentials: "include" })
      .then(result => result.json())
      .then(result => {
        if (!result.active) {
          this.fetchExposureData();
        }
        this.setState({
          ledOn: result.active
        });
      });
  };

  togglePump = () => {
    fetch("http://localhost:6060/pump/toggle", { credentials: "include" })
      .then(result => result.json())
      .then(result => {
        if (!result.active) {
          this.fetchPumpData();
        }
        this.setState({
          pumpOn: result.active
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
              // data:image etc. ist die notwendige Syntax von HTML um ein Base64 kodierten String zu entpacken
          photoData: "data:image/jpg;base64," + photoData.encodedImage
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
        dateTime: new Date(data.dateTime),
        percentage: parseInt(data.percentage)
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

    const photoData = this.state.photoData;

    return (
      <div className="App">
        <div className="container col-lg-12">
          <div className={"row"} style={{ marginTop: "20px" }}>
            <div className="col-md-6">
              <h5>Moisture Data</h5>
            </div>
            <div className="col-md-6">
              <h5>Photo of Kräuterkiste</h5>
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
              <Photo data={photoData}/>
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
                Refresh Data{" "}
              </Button>
            </div>
            <div className="col col-md-6">
              <Button
                id="photoButton"
                onClick={() => {
                  this.takePhoto();
                }}
              >
                Take a Photo{" "}
              </Button>
            </div>
          </div>

          <div className={"row"} style={{ marginTop: "50px" }}>
            <div className="col-md-6">
              <h5>Watering Data</h5>
            </div>
            <div className="col-md-6">
              <h5>Exposure Data</h5>
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
                Watering: {pumpOn ? "on" : "off"}
              </Button>
            </div>

            <div className="col col-md-6">
              <Button
                id="exposureButton"
                onClick={() => {
                  this.toggleExposure();
                }}
              >
                Light: {ledOn ? "on" : "off"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
