import React from "react";
import { TextInput } from './_lowlevel/TextInput';
import './PlanningCreator.css';
import { BackwardsButton } from '../_components/_lowlevel/Buttons';
const order = [
  { name: "name", description: "Namnge din planering", label: "Name" },
  { name: "description", description: "Beskriv din planering kort", label: "Description" },
  { name: "expectedEndYear", description: "Vilket år vill du uppnå slutmålet?", label: "Expected end year" }
];

export default class PlanningCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      value: "",
      submitted: []
    };
  }
  onChange = (newValue) => {
    this.setState({ ...newValue });
  };

  onKeyDown = (event, active) => {
    if (event.key === "Enter") {
      const submitted = [...this.state.submitted, { name: active.name, value: this.state.value, label: active.label }];
      const nextStep = this.state.step >= order.length - 1 ? this.state.step : this.state.step + 1;
      this.setState({ step: nextStep, value: "", submitted: submitted });
      if (this.state.step === nextStep) {
        this.onFinalSubmit(submitted);
      }
    }
  }

  goBackward = () => {
    const lastStep = this.state.step - 1;
    const submitted = this.state.submitted.slice(0, -1);
    const lastValue = this.state.submitted[this.state.submitted.length - 1].value;
    this.setState({ step: lastStep, submitted: submitted, value: lastValue });
  }

  onFinalSubmit = (submitted) => {
    let submittedObject = {};
    submitted.forEach(submit => {
      const tempSubmittedObject = submittedObject;
      submittedObject = {...tempSubmittedObject, [submit.name]: submit.value };
    })
    this.props.onFinalSubmit(submittedObject);
  }

  render() {
    const active = order[this.state.step];
    return (
      <div
        className="Creator"
        onKeyDown={(event) => this.onKeyDown(event, active)}
      >
        <div>
          <label>{active.description}</label>
          <TextInput
            name="value"
            value={this.state.value}
            onChange={this.onChange}
          />
        </div>
        {this.state.step > 0 ?
          <BackwardsButton
            onClick={this.goBackward}
          />
          : null
        }
      </div>
    );
  }
}
