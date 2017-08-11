import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import './test.less'


 class Test extends React.Component {
  render() {
    console.log(this.context.store.getState())
    return(
      <div className="test">
        car test
      </div>
    )
  }
}

Test.contextTypes = {
  store: PropTypes.object
}

export default connect()(Test);