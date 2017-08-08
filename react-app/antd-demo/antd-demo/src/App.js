import React, { Component } from 'react';
import './App.less';

import AppBarIcon from './components/AppBarIcon.js'
import MAvatar from './components/MAvatar.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBarIcon />
        <MAvatar />
      </div>
    );
  }
}

export default App;
