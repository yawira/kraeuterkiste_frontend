import React, { Component } from "react";
import Select from "react-select";
import WaterConfig from "./WaterConfig";
import ExposureConfig from "./ExposureConfig";

const options = [
  { value: "water", label: "Watering Schedule" },
  { value: "exposure", label: "Periods of exposure" }
];

export default class Configuration extends Component {
  state = {
    selectedOption: "",
    showExposure: false,
    showWater: false,
  };
  handleChange = selectedOption => {
    switch (selectedOption.value) {
      case "exposure":
        this.setState({
          showExposure: true,
          showWater: false
        });
        break;
      case "water":
        this.setState({
          showExposure: false,
          showWater: true
        });
        break;
      default:
    }
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    return (
      <div className="container">
        <div>
          <label>Please select an option: </label>
          <Select onChange={this.handleChange} options={options} />
        </div>
        <WaterConfig show={this.state.showWater} />
        <ExposureConfig show={this.state.showExposure} />
      </div>
    );
  }
}
