import React from 'react';
import Goal from './_midlevel/Goal';
import './GoalList.css';
const GoalList = ({shortTermGoals,onGoalChange,style,goalStyle}) =>
    <div className="GoalList">
        {shortTermGoals.length > 0 ? 
            shortTermGoals.map((shortTermGoal,i) =>
                <div className="StandardRow">
                <Goal
                    {...shortTermGoal}
                    onGoalChange={onGoalChange}
                    style={goalStyle} 
                />
                </div>
            ): 
            <div className="NoItemsComponent">Inga mål tillagda</div>
        }
    </div>
;
export default GoalList;