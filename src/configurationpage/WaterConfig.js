import React from "react";
import MyCalender from "./Calender";
import MyClock from "./Clock";

// component to be selected from configuration page
export default function WaterConfig(props) {
    return (
        <div hidden={!props.show} className="container col-lg-12">
            <p className="waterText">
                Here you can select the time frame for <span className="waterWatering">watering</span> your plant
            </p>
            <div className={"row"} style={{marginTop: "20px"}}>
                <div className="col-md-6">
                    <MyCalender/>
                </div>
                <div className="col-md-6">
                    <MyClock/>
                </div>
            </div>
        </div>
    );
}
