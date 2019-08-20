import React, { Component } from "react";
import "./App.css";
import ColumnChart from "./ColumnChart";
import Button from "react-bootstrap/Button";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import LineChart from "./LineChart";

export default class App extends Component {
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
  };

  generateExposureData = () => {
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
  };

  generateMoistureData = () => {
    let data = [];
    let value = 50;
    for (let i = 0; i < 300; i++) {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(i);
      value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: date, value: value });
    }
    return data;
  };

  render() {
    const exposureData = this.generateExposureData();
    const waterData = this.generateWaterData();
    const moistureData = this.generateMoistureData();
    return (
      <div className="App">

        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Configuration</Nav.Link>
            </Nav>
            <Button variant="outline-danger">Sign Out</Button>
          </Navbar.Collapse>
        </Navbar>

        {/* everything passed inside the curly braces is passed to the "props" */}
        {/* we need 2 "divs", because amChart needs a div in the create method, where the charts are rendered */}
        <ColumnChart div={"exposureChart"} data={exposureData} />
        <ColumnChart div={"waterChart"} data={waterData} />
        <Button variant="primary">Primary</Button>
        <LineChart div={"lineChart"} abc={moistureData} />
      </div>
    );
  }
}
