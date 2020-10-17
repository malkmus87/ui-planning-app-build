import React from 'react';
import GoalOverview from '../_components/GoalOverview';
import {filterBy} from '../_functions/general';

const MonthOverview = (props) =>
    <div>
        <GoalOverview
            {...props}
            type="monthly"
            label={"Mål för månad: "}
        />      
    </div>
    ;

export default MonthOverview;