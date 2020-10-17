import React from 'react';
import { AddButton } from '../_components/_lowlevel/Buttons';
import GoalList from '../_components/GoalList';
import './GoalOverview.css';
import generateGoal from '../_functions/generateGoal';
import Evaluation from '../_components/_midlevel/Evaluation';
import ProgressMeter from '../_components/_lowlevel/ProgressMeter';
import goalRequestHandler from '../_classes/GoalRequestHandler';
import {connect} from 'react-redux';

const countProgress = (shortTermGoals) => {
    if (shortTermGoals === undefined) {
        return 0;
    }
    const shortTermGoalsWithText = shortTermGoals.filter(shortTermGoal =>
        shortTermGoal.todo.length > 0
    );
    const finishedGoals = shortTermGoalsWithText.filter(shortTermGoal =>
        shortTermGoal.finished === true
    );
    return finishedGoals.length / shortTermGoalsWithText.length;
}


const GoalOverview = ({ goals, addGoalToMainState, onGoalChange, onEvaluationChange, type, style, evaluation, identifier,visibleYear,visibleMonth }) => {
    const addGoal = async () => {
        console.log(visibleYear);
        const newGoal = await goalRequestHandler.post(
            generateGoal({
                month:visibleMonth,
                longTermPlanningID:identifier.longTermPlanningID,
                year:visibleYear,
                type: type + 'goal'
            })
        );
        if (newGoal !== false) {
            return addGoalToMainState(newGoal);
        }
    }
    return (
        <div className="GoalOverview" style={style}>
            <div className="GoalOverviewContent">
                <GoalList
                    shortTermGoals={goals}
                    onGoalChange={onGoalChange}
                />
                <div className="StandardCenteredRow">
                    <AddButton
                        onClick={addGoal}
                        style={{ color: "green", fontSize: 22 }}
                        label="Lägg till"
                    />
                </div>
            </div>
            <div className="StandardRow">
                <Evaluation
                    evaluation={evaluation !== undefined ? evaluation : { text: "" }}
                    type={type}
                    onEvaluationChange={onEvaluationChange}
                    style={{ width: "calc(70% - 200px)", paddingRight: "30%", marginTop: 10, minWidth: 300, overflow: "hidden" }}
                />
                <ProgressMeter
                    progress={countProgress(goals)}
                    style={{ width: 200, marginTop: 10, minWidth: 200, overflow: "hidden" }}

                />

            </div>
        </div>
    )
};
const mapStateToProps= (state,props) => {
    return{
        visibleYear:state.visibleYear,
        visibleMonth:state.visibleMonth
    }  
};
export default connect(mapStateToProps)(GoalOverview);