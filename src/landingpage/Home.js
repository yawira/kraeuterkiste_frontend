import React, { Component } from "react";
import "../App.css";
import LineChart from "../landingpage/charts/LineChart";
import "../landingpage/charts/charts.css";
import { Button } from "react-bootstrap";
import GanttChart from "../landingpage/charts/GanttChart"
import ColumnChart from "../landingpage/charts/ColumnChart"
import Photo from "./Photo"
import plant from "./pictures/plant.jpg"

// Landing page of the project; Home Component utilizes the Fetch API to request data from Spring-Backend
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
    // converting server response into json-Format
      .then(response => response.json())
      // pumpData = response.json() as parameter
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
      .then(response => response.json())
      .then(photoData => {
        this.setState({
              // data:image etc. is the necessary HTML syntax to extract a Base64 encoded string
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
    // the following const variables receive data from backend and map it to x/y-axis of charts

    const moistureData = this.state.moistureData.map(data => {
      // map-function generates an array and the return statement maps the data
      return {
        dateTime: new Date(data.dateTime),
        percentage: parseInt(data.percentage)
      };
    });

    const pumpData = this.state.pumpData.map(data => {
      const start = new Date(data.start);
      const duration = data.duration;
      return {
        date: start,
        duration: duration,
        
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

    // TODO
    const ledOn = this.state.ledOn;
    const pumpOn = this.state.pumpOn;
    const photoData = this.state.photoData;

    // rendering of all components to show on landing page
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
              <ColumnChart
                div={"pumpChart"}
                data={pumpData}
                xAxisName={"date"}
                yAxisName={"duration"}
                
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
