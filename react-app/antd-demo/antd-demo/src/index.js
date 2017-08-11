import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';

import registerServiceWorker from './registerServiceWorker';
import routers from './router/index';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import carTest from './reducers'
import App from './App'

// 使用 google materail-ui 需要添加react-tap-event-plugin
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

let store = createStore(carTest);

ReactDOM.render( 
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
