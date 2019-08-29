import React, { Component } from "react";
import Select from "react-select";
import WaterConfig from "./WaterConfig";
import ExposureConfig from "./ExposureConfig";

const options = [
  { value: "water", label: "Watering Schedule" },
  { value: "exposure", label: "Periods of exposure" }
];

export default class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
      showExposure: false,
      showWater: false
    };
  }

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
  };

  render() {
    const showWater = this.state.showWater;
    const showExposure = this.state.showExposure;

    return (
      <div className={this.state.showExposure ? "exposure" : "water"}>
        <div className="container">
          <div>
            <label className="configurationLabel">Please select an option: </label>
            <Select onChange={this.handleChange} options={options} />
          </div>
          <WaterConfig show={showWater} />
          <ExposureConfig show={showExposure} />
        </div>
      </div>
    );
  }
}
