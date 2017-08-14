import React from 'react'
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
              className="carousel-image-wrap"
              key={index}>
              <img src={image} alt={index} />
            </div>
          ))
        }
      </ReactSwipe>
    );
  }
}

export default SimpleCarousel;
