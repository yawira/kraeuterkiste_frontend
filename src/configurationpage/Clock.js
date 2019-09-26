import React from 'react';
import TimeKeeper from 'react-timekeeper';
import './logic.css'

// creates the clock widget on configuration page
export default class MyClock extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            time: '12:34 pm',
            displayTimepicker: true
        }
        this.handleTimeChange = this.handleTimeChange.bind(this)
    }
    // saves user's set time into state - for later usage
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
            </div>
        )
    }
} 