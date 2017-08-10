import React from 'react';
import './Forms.less'
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const style = {
  margin: 6,
  color: '#fff'
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
    finished: false,
    stepIndex: 0,
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  renderStepActions(step) {
    const { stepIndex } = this.state;

    return (
      <div style={{ margin: '12px 0' }}>
        {/* <RaisedButton
          label={stepIndex === 2 ? 'Begin' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{ marginRight: 12 }}
        /> */}
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

    return (
      <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
        <h5>驾考题库宝典</h5>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>选择驾照等级</StepLabel>
            <StepContent>
        
                {
                  CBtns.map((btn, index) => (
                    <RaisedButton label={btn} key={index} primary={true} style={style} onTouchTap={this.handleNext} />
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
                    <RaisedButton label={btn} key={index} primary={true} style={style} onTouchTap={this.handleNext} />
                  ))
                }
              {this.renderStepActions(2)}
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>开始答题</StepLabel>
            <StepContent>
               <RaisedButton label='Begin' primary={true} style={style} onTouchTap={this.handleNext} />
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
                this.setState({ stepIndex: 0, finished: false });
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

export default VerticalLinearStepper;