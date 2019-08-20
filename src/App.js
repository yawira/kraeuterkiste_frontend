import React, { Component } from "react";
import "./App.css";
import ColumnChart from "./ColumnChart";
import Button from "react-bootstrap/Button";
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import LineChart from "./LineChart";
import { Container, Row, Col } from 'react-grid-system';
import Card from "react-bootstrap/Card"
import "./charts.css"


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

        {/* <div className="bootstrap-wrapper">
          <Container className="app-container">
            <Row className="justify-content-md-center" >
              <Col md={{ span: 4 }}>{<ColumnChart div={"exposureChart"} data={exposureData} />}{<br></br>}{<Button variant="success">Update moisture</Button>}</Col>
              <Col md={{ span: 4, offset: 2 }}>{<ColumnChart div={"waterChart"} data={waterData} />}{<br></br>}{<Button variant="info">Take current photo</Button>}</Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md={{ span: 4 }}>{<Card border="secondary" />}{<br></br>}{<Button variant="primary">Pump water now</Button>}</Col>
              <Col md={{ span: 4, offset: 2 }}>{<LineChart div={"lineChart"} abc={moistureData} />}</Col>
            </Row>
          </Container>
        </div> */}

        <Container className="cont">
          <Row className="row">
            <Col sm={6}>
              <Col className="col" md={{ span: 4 }}>{<ColumnChart div={"exposureChart"} data={exposureData} />}{<br></br>}{<Button variant="success">Update moisture</Button>}</Col>
              <Col className="col" md={{ span: 4 }}>{<Card border="secondary" />}{<br></br>}{<Button variant="primary">Pump water now</Button>}</Col>
            </Col>
            <Col sm={6}>
              <Col className="col" md={{ span: 4, offset: 2 }}>{<ColumnChart div={"waterChart"} data={waterData} />}{<br></br>}{<Button variant="info">Take current photo</Button>}</Col>
              <Col className="col" md={{ span: 4, offset: 2 }}>{<LineChart div={"lineChart"} abc={moistureData} />}</Col>
            </Col>
          </Row>
        </Container>

      </div>
    );
  }
}
