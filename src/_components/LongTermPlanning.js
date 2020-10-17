import React from "react";
import "./LongTermPlanning.css";
import { months, goalTypesToArrayName, jsonRequestHandler } from "../settings.js";
import { MonthOverview, YearOverview, EndOverview } from '../_components/OverviewSetup';
import MonthlyWeekOverview from '../_components/MonthlyWeekOverview';
import { range, assignToArray, filterBy } from '../_functions/general';
import generateEvaluation from '../_functions/generateEvaluation';
import StickyList from '../_components/_lowlevel/StickyList';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updateVisibleYear,updateVisibleMonth,updateLongTermPlanningID} from '../_redux/actions.js';

var date = new Date();

class LongTermPlanning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleYear: date.getFullYear(),
      visibleMonth: date.getMonth(),
      mounted: false
    };
  }
  addGoal = async (newGoal, key) => {
    const arrayStateKey = goalTypesToArrayName[newGoal.type];
    const goalList = this.state[arrayStateKey];
    this.setState({
      [arrayStateKey]: [
        ...goalList,
        { ...newGoal }
      ]
    });
  };

  componentDidMount = async () => {
    await this.setInitialState();
  };

  onGoalChange = async (type, goalID, newValue) => {
    const arrayStateKey = goalTypesToArrayName[type];
    const response = await jsonRequestHandler.patchID('shorttermgoal', goalID, newValue);
    if (response.status === 200) {
      const goals = this.state[arrayStateKey];
      this.setState({
        [arrayStateKey]: assignToArray(goals, { _id: goalID }, newValue)
      });
    }
  };

  onStateChange = (newState) => {
    this.setState({ ...newState });
  }

  addEvaluation = async (type, newValue) => {
    const evaluationList = this.state.evaluations;
    const addedValue = generateEvaluation(
      {
        ...newValue,
        type: type,
        month: this.props.visibleMonth,
        year: this.props.visibleYear,
        longTermPlanningID: this.state['_id']
      }
    );
    const response = await jsonRequestHandler.post('evaluation', addedValue);
    const newData = await response.json();
    this.setState({
      evaluations: [...evaluationList, { ...addedValue, _id: newData.id }]
    })
  }

  onEvaluationChange = async (type, evaluationID, newValue) => {
    if (evaluationID === false) {
      this.addEvaluation(type, newValue);
    } else {
      const response = await jsonRequestHandler.patchID('evaluation', evaluationID, newValue);
      const evaluationList = this.state.evaluations;
      if (response.status === 200) {
        this.setState({
          evaluations: assignToArray(evaluationList, { _id: evaluationID }, newValue)
        })
      }
    }
  }

  setInitialState = async () => {
    
    this.props.onUpdateVisibleYear(date.getFullYear());
    const response = await jsonRequestHandler.get('longtermplanning/' + this.props.id + '?detailed=true');
    if (response.status === 200) {
      const longTermPlanning = await response.json();
      const goals = longTermPlanning.goals;
      console.log(goals);
      this.setState({
        ...longTermPlanning,
        endGoals: filterBy(goals, { type: "endgoal" }),
        yearlyGoals: filterBy(goals, { type: "yearlygoal" }),
        monthlyGoals: filterBy(goals, { type: "monthlygoal" }),
        dailyGoals: filterBy(goals, { type: "dailygoal" }),
        weeklyGoals: filterBy(goals, { type: "weeklygoal" }),
        mounted: true
      });
    }
  };

  render() {
    const state = this.state;
    const years = this.state.mounted ?
      range(parseInt(state.startYear), parseInt(state.expectedEndYear)) :
      []
    ;
    const identifier = {
      year: this.props.visibleYear,
      month: this.props.visibleMonth,
      longTermPlanningID: this.state['_id']
    }
    return (
      this.state.mounted === true ?
        <div className="LongTermPlanning">
          <div className="LongTermPlanningTop">
            <div className="LongTermPlanningTopInner">
              <EndOverview
                addGoalToMainState={this.addGoal}
                onGoalChange={this.onGoalChange}
                onEvaluationChange={this.onEvaluationChange}
                goals={state.endGoals}
                evaluation={filterBy(state.evaluations, { type: "end" })[0]}
                identifier={identifier}
              />
            </div>

          </div>
          <div className="LongTermPlanningInner">
            <StickyList
              labels={years}
              activeIndex={years.indexOf(this.props.visibleYear)}
              height={49}
              style={{ paddingTop: 20 }}
              stickAtHeight={-1}
              onButtonClick={(newActiveIndex) =>
                this.props.onUpdateVisibleYear(years[newActiveIndex])
              }
            />
            <div style={{ background: "steelblue", height: 5, width: "90%", margin: "0 5% 0 5%" }} />
            <YearOverview
              addGoalToMainState={this.addGoal}
              onGoalChange={this.onGoalChange}
              onEvaluationChange={this.onEvaluationChange}
              goals={filterBy(state.yearlyGoals, { year: this.props.visibleYear })}
              evaluation={filterBy(state.evaluations,{ year: this.props.visibleYear, type: "yearly" })[0]}
              identifier={identifier}
            />
            <StickyList
              labels={months}
              activeIndex={this.props.visibleMonth}
              buttonStyle={{ fontSize: 19 }}
              height={49}
              stickAtHeight={48}
              // onButtonClick={(newActiveIndex) => this.onStateChange({ visibleMonth: newActiveIndex })}
              onButtonClick={(newActiveIndex)=>this.props.onUpdateVisibleMonth(newActiveIndex.toString())}
            />
            <div style={{ minHeight: "100%" }}>
              <MonthOverview
                addGoalToMainState={this.addGoal}
                onGoalChange={this.onGoalChange}
                onEvaluationChange={this.onEvaluationChange}
                goals={filterBy(state.monthlyGoals, { year: this.props.visibleYear, month: this.props.visibleMonth })
                }
                evaluation={
                  filterBy(state.evaluations, { year: this.props.visibleYear, month: this.props.visibleMonth, type: "monthly" })[0]
                }
                identifier={identifier}
              />
              <div className="StandardCenteredRow">
                <button
                  onClick={() => this.setState({ isWeekPlanningVisible: true })}
                  style={{ fontSize: 16, fontWeight: 600, borderBottom: "2px darkorange solid", color: "darkorange" }}
                >
                  Gå till veckoplanering för månad
              </button>
              </div>
            </div>


            {this.state.isWeekPlanningVisible ?
              <div className="LargeComponent"><div className="LargeComponentInner">
                <div className="StandardCenteredRow">
                  <button
                    onClick={() => this.setState({ isWeekPlanningVisible: false })}
                  >
                    Tillbaka till översikt
                </button>
                </div>
                <MonthlyWeekOverview
                  addGoalToMainState={this.addGoal}
                  onGoalChange={this.onGoalChange}
                  onEvaluationChange={this.onEvaluationChange}
                  dailyGoals={
                    filterBy(state.dailyGoals, { year: this.props.visibleYear, month: this.props.visibleMonth })
                  }
                  weeklyGoals={
                    filterBy(state.weeklyGoals, { year: this.props.visibleYear, month: this.props.visibleMonth })
                  }
                  evaluation={
                    filterBy(state.evaluations, { year: this.props.visibleYear, month: this.props.visibleMonth, type: "weekly" })[0]
                  }
                  identifier={identifier}
                />
              </div></div> :
              null
            }

          </div>
        </div>
        : null
    );
  }
}

const mapStateToProps= (state,props) => {
  return{
      visibleYear:state.visibleYear,
      visibleMonth:state.visibleMonth,
      longTermPlanningID:state.longTermPlanningID
  }
};

const mapActionToProps = (dispatch,props) =>{
  return bindActionCreators(
      {
        onUpdateVisibleYear:updateVisibleYear,
        onUpdateVisibleMonth:updateVisibleMonth,
        onUpdateLongTermPlanningID:updateLongTermPlanningID
      },
      dispatch
  );
}
export default connect(mapStateToProps,mapActionToProps)(LongTermPlanning);
