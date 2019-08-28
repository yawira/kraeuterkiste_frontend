import React, { Component } from "react";
import ReactLightCalendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css'

// https://reactjsexample.com/a-lightweight-calendar-for-react/
export default class MyCalendar extends Component {
  constructor(props) {
    super(props)
    const date = new Date()
    const startDate = date.getTime()
    this.state = {
      startDate, // Today
      endDate: new Date(startDate).setDate(date.getDate() + 3) 
    }
  }

  onChange = (startDate, endDate) => this.setState({ startDate, endDate })

  render = () => {
    const { startDate, endDate } = this.state

    return (
        <div className="calender">
            
            <ReactLightCalendar startDate={startDate} endDate={endDate} onChange={this.onChange} range />
        </div>
    )
  }
}