import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter,
  Route,
  Router
} from 'react-router-dom'
import Clock from './components/Clock.js'
import EssayForm from './components/EssayForm';
ReactDOM.render((
  <BrowserRouter>
    <Route path="/" componet={App}>

    </Route>
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();

      // <div>
      //   <Route path="about" component={Clock} />
      //   <Route path="inbox" component={EssayForm} /> 
      // </div>


