const generateGoal=({type,month,year,week,day,todo,longTermPlanningID})=>{
    const generalAttributes={
      todo:todo!==undefined ? todo:"",
      longTermPlanningID:longTermPlanningID,
      type:type
    }
    switch(type){
        case "endgoal":
            return {...generalAttributes}
        case "yearlygoal":
            return {...generalAttributes,year:year};
        case "monthlygoal":
            return {...generalAttributes,month:month,year:year}
        case "weeklygoal":
            return {...generalAttributes,year:year,month:month,week:week}
        case "dailygoal":
            return {...generalAttributes,year:year,month:month,week:week,day:day} 
        default:
            return {...generalAttributes,month:month,year:year};
    }
}
export default generateGoal;