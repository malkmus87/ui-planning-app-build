export const UPDATE_VISIBLEYEAR='visibleYears:updateVisibleYear';
export function updateVisibleYear(newVisibleYear){
   return({
       type:UPDATE_VISIBLEYEAR,
       payload:{
           visibleYear:newVisibleYear
       }
   })
}
export const UPDATE_VISIBLEMONTH='visibleMonths:updateVisibleMonth';
export function updateVisibleMonth(newVisibleMonth){
    return({
        type:UPDATE_VISIBLEMONTH,
        payload:{
            visibleMonth:newVisibleMonth
        }
    })
}
export const UPDATE_LONGTERMPLANNINGID='longTermPlanningIDs:updateLongTermPlanningID';
export function updateLongTermPlanningID(newLongTermPlanningID){
    return({
        type:UPDATE_LONGTERMPLANNINGID,
        payload:{
            longTermPlanningID:newLongTermPlanningID
        }
    })
}
