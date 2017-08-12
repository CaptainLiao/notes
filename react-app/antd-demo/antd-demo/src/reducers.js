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

const myApp = function() {
  return [1,5,6]
}

const carTest = combineReducers({
  chooseTestLevels,
  myApp
})

export default carTest