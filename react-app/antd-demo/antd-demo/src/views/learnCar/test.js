import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import './test.less'


 class Test extends React.Component {
  state = {
    txt: 'car test 1'
  }
  componentDidMount() {
    const { store} = this.context;
    this.setState({
      txt: store.getState().chooseTestLevels
    })
  }
  render() {

    return(
      <div className="test">
        {this.state.txt}
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