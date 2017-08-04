import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Clock extends Component {

  constructor(props) {
    super(props);
    // 初始化state
    // 只有在构造函数中才能对 state 直接赋值
    // 在其他地方改变 state 必须使用 this.setState() 方法
    this.state = { date: new Date() }
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>hello, {this.props.name}</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
};

class Avatar extends Component {
  render() {
    return (
      <img
        src={this.props.user.avatarUrl}
        alt={this.props.user.name}
      />
    )
  }
}

let user = {
  avatarUrl: '111',
  name: '55556'
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.

        </p>
        <p>liao da 5ye</p>
        <Avatar user={user} />
        <Clock name="大爷" />
      </div>
    );
  }
}

export default App;
