import React from "react";
import MyCalender from "./Calender";
import MyClock from "./Clock";

export default function WaterConfig(props) {
    return (
        <div hidden={!props.show} className="container col-lg-12">
            <p>
                Here you can select the timeframe for <b>watering</b> your plant
            </p>
            <div className={"row"} style={{marginTop: "20px"}}>
                <div className="col-md-6">
                    <MyClock/>
                </div>
                <div className="col-md-6">
                    <MyCalender/>
                </div>
            </div>
        </div>
    );
}
