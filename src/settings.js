import JsonRequestHandler from './_classes/JsonRequestHandler';

//const APP_API_URL=process.env.REACT_APP_LOCAL_API_PATH;
const APP_API_URL='https://planning-app-backend.azurewebsites.net';
const months = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
];
const goalTypesToArrayName={
    shorttermgoal:"shortTermGoals",
    endgoal:"endGoals",
    yearlygoal:"yearlyGoals",
    monthlygoal:"monthlyGoals",
    dailygoal:"dailyGoals",
    weeklygoal:"weeklyGoals",
    evaluation:"evaluations"
}

const jsonRequestHandler=new JsonRequestHandler({mainPath:APP_API_URL});

const ignite=()=>{
    const planningCreator=require('./_components/PlanningCreator');
    module.exports = require("./index.js").BrowserRouter;   
}


export {months,goalTypesToArrayName,ignite,jsonRequestHandler};