// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Routers from './router/index'

function mapStateToProps(state) {
  console.log(state)
  return {
    carParams: state.carParams
  }
}

const App = connect(mapStateToProps)(Routers)

export default App