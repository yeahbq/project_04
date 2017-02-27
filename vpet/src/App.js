import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
//add component that you are going to import
import Monster from './monster.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Monster />
      </div>
    );
  }
}

export default App;
