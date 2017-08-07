import Loadable from 'react-loadable';
import React, { Component } from 'react';

import Loading from './loading.js'

const LoadableAnotherComponent = Loadable({
  loader: () => import('./Clock.js'),
  loading: Loading,
  delay: 200 
});

// class MyClock extends Component {
//   render() {
//     return <LoadableAnotherComponent/>;
//   }
// }

export default LoadableAnotherComponent;