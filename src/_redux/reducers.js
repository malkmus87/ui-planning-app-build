import {UPDATE_VISIBLEYEAR,UPDATE_VISIBLEMONTH,UPDATE_LONGTERMPLANNINGID} from './actions.js';
export function visibleYearReducer(state="",{type,payload}) {
    switch(type){
        case UPDATE_VISIBLEYEAR:
            return payload.visibleYear;
        default:
            return state;
    }
}
export function visibleMonthReducer(state="",{type,payload}){
    switch(type){
        case UPDATE_VISIBLEMONTH:
            return payload.visibleMonth;
        default:
            return state;
    }
}
export function longTermPlanningIDReducer(state="",{type,payload}){
    switch(type){
        case UPDATE_LONGTERMPLANNINGID:
            return payload.longTermPlanningID;
        default:
            return state;
    }
}