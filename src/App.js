import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Main from './components/Main';

export class App extends Component {

  render() {
    return (
      <div>
        <Nav />
        <Main />
      </div>
    );
  }
}

export default App;
