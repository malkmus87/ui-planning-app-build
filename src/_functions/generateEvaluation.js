const generateEvaluation=({type,month,year,week,day,text,longTermPlanningID})=>{
    const generalAttributes={
      text:text!==undefined ? text:"", 
      longTermPlanningID:longTermPlanningID,
      type:type
    }
    switch(type){
        case "end":
            return {...generalAttributes}
        case "yearly":
            return {...generalAttributes,year:year};
        case "monthly":
            return {...generalAttributes,month:month,year:year}
        case "weekly":
            return {...generalAttributes,year:year,month:month,week:week}
        case "daily":
            return {...generalAttributes,year:year,month:month,week:week,day:day} 
        default:
            return {...generalAttributes,month:month,year:year};
    }
}
export default generateEvaluation;