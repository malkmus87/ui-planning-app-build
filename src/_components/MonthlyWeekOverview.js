import React, { useState } from 'react';
import './MonthlyWeekOverview.css';
import MonthHelper from '../_classes/MonthHelper';
import { months } from '../settings'
import ButtonList from '../_components/_lowlevel/StickyList';
import { filterBy, groupBy, onlyUnique } from '../_functions/general';
import generateGoal from '../_functions/generateGoal';
import Goal from '../_components/_midlevel/Goal';
import { AddButton } from '../_components/_lowlevel/Buttons';
import goalRequestHandler from '../_classes/GoalRequestHandler';
import Evaluation from '../_components/_midlevel/Evaluation';


const MonthlyWeekOverview = ({ dailyGoals, weeklyGoals, addGoalToMainState, onGoalChange, identifier, onEvaluationChange, evaluation }) => {

    var dayDistribution = new MonthHelper(identifier.year, identifier.month).getDayDistribution();

    const includedWeeks = dayDistribution
        .map(day => day.weekNumber)
        .filter(onlyUnique)
        ;
    const [indexOfVisibleWeek, setIndexOfVisibleWeek] = useState(0);

    const addGoal = async (day) => {
        const newGoal = await goalRequestHandler.post(
            generateGoal({
                ...identifier,
                ...day,
                week: includedWeeks[indexOfVisibleWeek]
            })

        );
        if (newGoal !== false) {
            addGoalToMainState(newGoal);
        }
    }

    return (
        <div className="WeekOverview">
            <h3>Veckoplanering för {months[identifier.month]}</h3>
            <ButtonList
                labels={includedWeeks.map(weekNumber => "v." + weekNumber.toString())}
                onButtonClick={setIndexOfVisibleWeek}
                activeIndex={indexOfVisibleWeek}
                buttonStyle={{ fontSize: 16 }}
            />
            <WeekPlanning
                dailyGoals={filterBy(dailyGoals, { week: includedWeeks[indexOfVisibleWeek] })}
                weekGoals={filterBy(weeklyGoals, { week: includedWeeks[indexOfVisibleWeek] })}
                weekDays={
                    dayDistribution.filter(day => day.weekNumber === includedWeeks[indexOfVisibleWeek]
                )}
                onGoalChange={onGoalChange}
                addGoal={addGoal}
                week={includedWeeks[indexOfVisibleWeek]}
                onEvaluationChange={onEvaluationChange}
                identifier={{ ...identifier, week: includedWeeks[indexOfVisibleWeek] }}
            />
            <Evaluation
                evaluation={evaluation !== undefined ? evaluation : { text: "" }}
                type='weekly'
                onEvaluationChange={onEvaluationChange}
                style={{ width: "calc(70% - 200px)", paddingRight: "30%", marginTop: 10, minWidth: 300, overflow: "hidden" }}
            />
        </div>

    )
}
// Daily goals data only gets saved if they have been saved once
const WeekPlanning = ({ dailyGoals, weekGoals, addGoal, onGoalChange, weekDays, onEvaluationChange }) => {
    return (
        <div className="Week">
            <div className="WeeklyGoals">
            <h3>Veckomål</h3>
            {
                weekGoals.map(goal =>
                    <div className="StandardRow">
                        <Goal
                            {...goal}
                            onGoalChange={onGoalChange}
                            placeHolder={
                                'Beskriv aktivitet'
                            }
                        />
                    </div>
                )
            }
            <AddButton
                onClick={() => addGoal({ type: 'weeklygoal' })}
                style={{ color: "green", fontSize: 12 }}
                label="Lägg till"
            />
            </div>
            
            <h3>Veckokalender</h3>
            <div>
            {weekDays.map((weekDay, dayNumber) =>
                <div className="WeekDay">
                    <div className="Column">
                        <p className="DayName">{weekDay.name}</p>
                        <p>
                            {weekDay.date + "/" + (weekDay.month + 1)}
                        </p>
                    </div>
                    <div className="Column2">
                        {
                            filterBy(dailyGoals, { day: weekDay.day }).map(goal =>
                                <div className="StandardRow">
                                    <Goal
                                        {...goal}
                                        onGoalChange={onGoalChange}
                                        placeHolder={
                                            'Beskriv aktivitet'
                                        }
                                    />
                                </div>
                            )
                        }
                        <div className="StandardCenteredRow">
                            <AddButton
                                onClick={() => addGoal({ day: weekDay.day, type: 'dailygoal' })}
                                style={{ color: "green", fontSize: 12 }}
                                label="Lägg till"
                            />
                        </div>

                    </div>

                </div>
            
            )}
            </div>
        </div>
    )
}

export default MonthlyWeekOverview;