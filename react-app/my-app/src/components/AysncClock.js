import Loadable from 'react-loadable';
import React, { Component } from 'react';

function MyLoadingComponent({ error }) {
  if (error) {
    return <div>Error!</div>;
  } else {
    return <div>Loading...</div>;
  }
}

const LoadableAnotherComponent = Loadable({
  loader: () => import('./Clock.js'),
  loading: MyLoadingComponent
});

class MyClock extends Component {
  render() {
    return <LoadableAnotherComponent/>;
  }
}

export default MyClock;