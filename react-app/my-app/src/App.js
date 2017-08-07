import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
 Link,
} from 'react-router-dom'

/**
 * 找出哪一个是 state。每个数据只要考虑三个问题：
它是通过 props 从父级传来的吗？如果是，他可能不是 state。
它随着时间推移不变吗？如果是，它可能不是 state。
你能够根据组件中任何其他的 state 或 props 把它计算出来吗？如果是，它不是 state。
 */

class Avatar extends Component {
  render() {
    return (
      // <img
      //   src={this.props.user.avatarUrl}
      //   alt={this.props.user.name}
      // />
      <p>sss </p>
    )
  }
}

// let user = {
//   avatarUrl: '111',
//   name: '55556'
// }


class App extends Component {
  render() {
    return (
      <div className="App" id="foo">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>liao da 5ye</p>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default App;
