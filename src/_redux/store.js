import {compose,combineReducers,createStore} from 'redux';
import {visibleYearReducer,visibleMonthReducer,longTermPlanningIDReducer} from './reducers';
const allStoreEnhancers=compose(
    window.devToolsExtension && window.devToolsExtension()
);
const allReducers=combineReducers({
        visibleYear:visibleYearReducer,
        longTermplanningID:longTermPlanningIDReducer,
        visibleMonth:visibleMonthReducer
});

export const store=createStore(
    allReducers,
    {
        visibleMonth:"",
        longTermPlanningID:null,
        visibleYear:""
    },
    allStoreEnhancers
);