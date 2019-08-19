import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Kräuter sind geil
        </p>
        <a
          className="App-link"
          href="https://www.drugcom.de/drogenlexikon/buchstabe-c/cannabis/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Kräuter
        </a>
      </header>
    </div>
  );
}

export default App;
