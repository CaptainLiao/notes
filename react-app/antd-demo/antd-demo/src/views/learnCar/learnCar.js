import React from 'react';
import Carousel from '../../components/carousel/Carousel';
import Forms from '../../components/Forms';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let images = ['PANE 1220', 'PANE 2', 'PANE 3'];
let api = 'http://jisujiakao.market.alicloudapi.com/driverexam/query';

class LearnCar extends React.Component {
  componentDidMount() {
    axios({
      method: 'get',
      url: api,
      params: {
        pagenum: 1,
        pagesize: 10,
        sort: 'normal',
        subject: 1,
        type: 'C1'
      },
      headers:{"Authorization": "APPCODE 8702e06255074019b33bb0a15f75e786"}
    })
      .then( (response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <Carousel images={images} /> 
        <MuiThemeProvider>
          <Forms />
        </MuiThemeProvider>
        
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
  
      </div>
    )
  }
}

export default LearnCar;