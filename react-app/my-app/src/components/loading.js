import React from 'react';

function LoadingComponent({ error }) {
  if (error) {
    return <div>Error!</div>;
  } else {
    return <div>Loading...</div>;
  }
}

export default LoadingComponent