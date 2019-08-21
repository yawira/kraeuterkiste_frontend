import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import './App.css';
import "./charts.css"
import MyNavbar from "./Navbar";


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