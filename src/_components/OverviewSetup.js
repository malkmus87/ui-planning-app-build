import React from 'react';
import GoalOverview from './GoalOverview';

const EndOverview = (props) =>
    <div>
        <div className="EndTitle">
            <h2>{"Huvudmål"}</h2>
        </div>
        <GoalOverview
            {...props}
            type="end"
        />
    </div>
    ;

const MonthOverview = (props) => 
        <GoalOverview
            {...props}
            type="monthly"
            label={"Mål för månad: "}
        />
    ;

const YearOverview = (props) =>
    <div style={{ marginBottom: 80}}>
        <GoalOverview
            {...props}
            type="yearly"
        />
    </div>
;

const DayOverview = (props) => 
    <div>
        <GoalOverview
            {...props}
            type="daily"
            label={"Mål för månad: "}
        />
    </div>
;
export {MonthOverview, YearOverview, EndOverview, DayOverview };