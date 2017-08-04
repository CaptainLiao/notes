import React, { Component } from 'react';

/**
* Mounting：已插入真实 DOM
* Updating：正在被重新渲染
* Unmounting：已移出真实 DOM
* React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数。
* componentWillMount()
* componentDidMount()
* componentWillUpdate(object nextProps, object nextState)
* componentDidUpdate(object prevProps, object prevState)
* componentWillUnmount()

* componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
* shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用
*/
class Clock extends Component {

  constructor(props) {
    super(props);
    // 初始化state
    // 只有在构造函数中才能对 state 直接赋值
    // 在其他地方改变 state 必须使用 this.setState() 方法
    this.state = { date: new Date() }
    // This binding is necessary to make `this` work in the callback
    this.onPrevState = this.onPrevState.bind(this);
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

  // 处理用户事件
  // 使用箭头函数把 this 绑定到 Clock 类上
  // 原因：事件是异步的，若使用函数声明，this => undefined
  onPrevState2 = (e) => {
    console.log(this)
    console.log(e)
  }

  onPrevState(e) {
    console.log(this)
    console.log(e)
  }

  // for、if 是语句块，而不是 javascript 表达式
  // 因此，它们不能用在 JSX 中
  // 但可以将它们放在周围的代码中
  render() {
    function showHello() {
      return false;
    };
    return (
      <div onClick={this.onPrevState}>
        {
          !showHello() && <h1>hello, {this.props.name}</h1>
        }
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
};

export default Clock