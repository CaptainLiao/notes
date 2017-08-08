import React from 'react';

function LoadingComponent({ error }) {
  if (error) {
    return <div className="error">Error!</div>;
  } else {
    return <div className="loading">Loading...</div>;
  }
}

export default LoadingComponent