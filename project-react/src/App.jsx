import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Landing from './pages/landing';
import Login from './pages/login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Login />
        <Landing />
      </div>
    );
  }
}

export default hot(module)(App);
