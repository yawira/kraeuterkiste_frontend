import React from "react";

export default function Photo(props) {

    return (
        <div className="image">
            <img src={props.data} alt="" style={{ width: "700px", height: "500px" }}/>
        </div>
    );
}
