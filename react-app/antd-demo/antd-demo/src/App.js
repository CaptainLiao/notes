// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Routers from './router/index'

function mapStateToProps(state) {
  return {
    carParams: state.carParams
  }
}

const App = connect(mapStateToProps)(Routers)

export default App