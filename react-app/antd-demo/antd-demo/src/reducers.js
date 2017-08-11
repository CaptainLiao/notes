import { combineReducers } from 'redux'
import { CHOOSE_TEST_LEVEL } from './actions'

function chooseTestLevels(state=[], action) {
  
  switch(action.type) {
    case CHOOSE_TEST_LEVEL:
      return [
        ...state,
        action.carParams
      ]
    default:
      return state;  
  }
}

const carTest = combineReducers({
  chooseTestLevels
})

export default carTest