import React from 'react';
import plant from './plant.jpg'; 
import './charts.css'

export default function Photo(props) {
  
  return(
        <img className="plant" src={plant} alt="error" style={{width: "inherit", height: "inherit"}}/>
  );
}