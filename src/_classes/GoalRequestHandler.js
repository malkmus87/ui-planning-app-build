import generateGoal from '../_functions/generateGoal';
import {jsonRequestHandler} from '../settings';
class GoalRequestHandler {
    constructor() {
        this.requestHandler = jsonRequestHandler;
    }
    async post(value) {
        const newGoal = generateGoal(value);
        const response = await this.requestHandler.post('shorttermgoal', value);
        const newData = await response.json();
        return(
            response.status===200 ? 
                {
                    ...newGoal,
                    _id: newData['_id']
                }
                :
                false
        )
    }
    
}

export default new GoalRequestHandler();