import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '../../components/carousel/Carousel';
import Forms from '../../components/Forms';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { connect } from 'react-redux'


let images = [' http://dwz.cn/6nr63E', 'http://dwz.cn/6nr59m', 'http://dwz.cn/6nr4JF'];
let api = 'http://jisujiakao.market.alicloudapi.com/driverexam/query';

class LearnCar extends React.Component {
  componentDidMount() {
  
  }
  render() {
    return (
      <div>
        <Carousel images={images} /> 
        <MuiThemeProvider>
          <Forms />
        </MuiThemeProvider>

      <div className="empty"></div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    carParams: state.carParams
  }
}

export default connect(mapStateToProps)(LearnCar);
