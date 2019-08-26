import React, { Component } from "react";
import Select from 'react-select';

const options = [
  { value: 'water', label: 'Watering Schedule' },
  { value: 'exposure', label: 'Periods of exposure' },
];
 
export default class Configuration extends Component {

    state = {
      selectedOption: '',
    };
    handleChange = selectedOption => {
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption);
    };
    render() {
   
      return (
        <div className="container">
        <label>Please select an option: </label>
        <Select
         
          onChange={this.handleChange}
          options={options}
        />
        </div>
      );
    }
  }