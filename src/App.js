import React, {Component} from 'react';
import './App.css';
import "./charts/charts.css"
import MyNavbar from "./Logic/Navbar";


export default class App extends Component {

    render() {
        return (
            <div className="App">
                <div>
                    <MyNavbar/>
                </div>
            </div>         
        );
    }


}