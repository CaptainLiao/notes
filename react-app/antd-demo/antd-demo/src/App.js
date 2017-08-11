import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './App.less';


class App extends Component {
  render() {
    return (
      <div className="App">
        <ul>
          <li><NavLink activeClassName="selected" to="/locations/5">名胜古迹</NavLink></li>
          <li><NavLink activeClassName="selected" to="/about">关于我们</NavLink> </li>
          <li><NavLink activeClassName="selected" to="/about">关于我们</NavLink> </li>
          <li><NavLink activeClassName="selected" to="/about">关于我们</NavLink> </li>
          <li><NavLink activeClassName="selected" to="/about">关于我们</NavLink> </li>
          <li><NavLink activeClassName="selected" to="/about">关于我们</NavLink> </li>
        </ul>
      </div>
    );
  }
}

export default App;
