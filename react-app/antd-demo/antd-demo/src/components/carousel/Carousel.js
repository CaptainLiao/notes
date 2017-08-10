import React from 'react'
import { Link } from 'react-router-dom';
import './carousel.less'

import ReactSwipe from 'react-swipe';

class SimpleCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <ReactSwipe className="carousel" swipeOptions={{ continuous: true }}>
        {
          this.props.images.map((image, index) => (
            <div
              key={index}>
              {image}
            </div>
          ))
        }
      </ReactSwipe>
    );
  }
}

export default SimpleCarousel;