import React from 'react';
import TimeKeeper from 'react-timekeeper';
import './logic.css'

export default class MyClock extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            time: '12:34 pm',
            displayTimepicker: true
        }
        this.handleTimeChange = this.handleTimeChange.bind(this)
    }
    handleTimeChange(newTime){
        this.setState({ time: newTime.formatted})
    }
    toggleTimekeeper(val){
        this.setState({displayTimepicker: val})
    }
    render(){
        return (
            <div className="clock">
                <TimeKeeper
                    time={this.state.time}
                    onChange={this.handleTimeChange}
                    switchToMinuteOnHourSelect={true}
                />
                <br></br>
                <span>Time is {this.state.time}</span>
            </div>
        )
    }
} 