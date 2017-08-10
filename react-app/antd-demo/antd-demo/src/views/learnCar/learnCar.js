import React from 'react';
import Carousel from '../../components/carousel/Carousel';
import Forms from '../../components/Forms';

let images = ['PANE 1220', 'PANE 2', 'PANE 3']

class LearnCar extends React.Component {
  render() {
    return (
      <div>
        <Carousel images={ images } />
        <Forms />
        <div>sss</div>
      </div>
    )
  }
}

export default LearnCar;