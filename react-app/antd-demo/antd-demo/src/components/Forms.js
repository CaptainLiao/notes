import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { chooseTestLevel } from '../actions'
import './Forms.less'
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const PropTypes = require('prop-types');

const style = {
  margin: 6,
};
const CBtns = ['A1', 'A2', 'A3', 'B1', 'B2', 'C1', 'C2', 'C3', 'D', 'E', 'F'];
const ABtns = ['科目一', '科目二'];
/**
 * Vertical steppers are designed for narrow screen sizes. They are ideal for mobile.
 *
 * To use the vertical stepper with the contained content as seen in spec examples,
 * you must use the `<StepContent>` component inside the `<Step>`.
 *
 * <small>(The vertical stepper can also be used without `<StepContent>` to display a basic stepper.)</small>
 */
class VerticalLinearStepper extends React.Component {

  state = {
    choosedTexts: [],
    finished: false,
    stepIndex: 0,
  };

  handleNext = (currentTarget) => {
    const { stepIndex, choosedTexts } = this.state;
    choosedTexts.push(currentTarget);
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
      choosedTexts
    });
  };

  handlePrev = () => {
    const { stepIndex, choosedTexts } = this.state;
    if (stepIndex > 0) {
      choosedTexts.pop();
      this.setState({ 
        stepIndex: stepIndex - 1,
        choosedTexts
       });
    }
  };

  handleBegin = () => {
    let {dispatch} = this.props
    let { stepIndex, choosedTexts } = this.state;
    dispatch(chooseTestLevel(this.state.choosedTexts))
    this.context.router.history.push('./car/test');
    console.log(this.state.choosedTexts)
  };

  renderStepActions(step) {
    const { stepIndex } = this.state;

    return (
      <div style={{ margin: '12px 0' }}>
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const { finished, stepIndex } = this.state;
    console.log(this.props)
    return (
      <div>
        <h5 style={{paddingLeft: 12, paddingTop: 12}}>驾考题库宝典</h5>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>选择驾照等级</StepLabel>
            <StepContent>
              {
                CBtns.map((btn, index) => (
                  <RaisedButton 
                    label={btn} 
                    key={index} 
                    primary={true} 
                    style={style} 
                    onTouchTap={this.handleNext.bind(this, btn)} />
                ))
              }
            </StepContent>
          </Step>
          <Step>
            <StepLabel>选择科目</StepLabel>
            <StepContent>
              <div>
                {
                  ABtns.map((btn, index) => (
                    <RaisedButton 
                      label={btn} 
                      key={index} 
                      primary={true} 
                      style={style} 
                      onTouchTap={this.handleNext.bind(this, btn)} />
                  ))
                }
                {this.renderStepActions(2)}
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>开始答题</StepLabel>
            <StepContent>
              <RaisedButton 
                label='Begin' 
                primary={true} 
                style={style} 
                onTouchTap={this.handleBegin} />
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <p style={{ margin: '20px 0', textAlign: 'center' }}>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                console.log(this.context)
                //this.context.router.history.push('./car/test')
              }}
            >
              Click here
            </a> to reset the example.
          </p>
        )}
      </div>
    );
  }
}

VerticalLinearStepper.contextTypes = {
  router: PropTypes.object
}

function mapStateToProps(state) {
  console.log(state)
  
  return {
    carParams: state.chooseTestLevels,
    visibilityFilter: '5555'
  }
}

export default connect(mapStateToProps)(VerticalLinearStepper);