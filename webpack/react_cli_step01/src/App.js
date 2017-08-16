import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({
      counter: this.state.counter + this.props.increment
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <h1 style={{ color: this.props.myColor }}>
        Counter ({this.props.increment}): {this.state.counter}
      </h1>
    );
  }
}



export default class App extends Component {
  render() {
    return (
      <div>

        <h1 className="lists">hello, word</h1>
        

        <Counter increment={100} myColor="red" />
        <Link to="/article">Article</Link>
        <br />
        <br />
        <br />
        <Link to="/lists">Listss</Link>
      </div>
    );
  }
}