import React from 'react'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import FlatButton from 'material-ui/FlatButton';

import ReactSwipe from 'react-swipe';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  block: {
    maxWidth: 250,
  },
  floatLeft: {
    float: 'left',
    position: 'relative'
  },
  radioButton: {
    marginBottom: 16,
  },
};

function CarQuestion() {
  return (
    <div className="question" style={styles.floatLeft}>

      <p>
        <b>Question：</b>
        驾驶机动车应当随身携带哪种证件？身携带哪种证件？
      </p>

      <MuiThemeProvider>
        <RadioButtonGroup name="shipSpeed" defaultSelected="">
          <RadioButton
            value="not_light"
            label="Selected by default"
            style={styles.radioButton}
          />
          <RadioButton
            value="light"
            label="Simple"
            style={styles.radioButton}
          />
          <RadioButton
            value="light2"
            label="Simple"
            style={styles.radioButton}
          />
        </RadioButtonGroup>
      </MuiThemeProvider>

    </div>
  )
}



class Question extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <ReactSwipe className="carousel" swipeOptions={{ continuous: true }}>
        
        <CarQuestion />
        <CarQuestion />
      </ReactSwipe>
    );
  }
}

export default Question