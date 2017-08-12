import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Question from '../../components/question.js'
// import './test.less'

let api = 'http://jisujiakao.market.alicloudapi.com/driverexam/query';
class Test extends React.Component {
  state = {
    txt: 'car test 1'
  }

  componentDidMount() {
    const { store} = this.context;
    let txt = store.getState().chooseTestLevels;
    txt[0] && this.setState({
      txt: txt[0] + txt[1]
    })

    let subject = 2;
    if(txt[1] && txt[1].indexOf('一') >= 0) subject = 1;
    txt[1] && axios({
      method: 'get',
      url: api,
      params: {
        pagenum: 1,
        pagesize: 10,
        sort: 'normal',
        subject,
        type: txt[0]
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

    return(
      <div className="test">
        {this.state.txt}
        
        <Question />

      </div>
    )
  }
}

Test.contextTypes = {
  store: PropTypes.object
}

function mapStateToProps(state) {
  
  return {
    carParams: state.chooseTestLevels,
    visibilityFilter: '5555'
  }
}

export default connect(mapStateToProps)(Test);