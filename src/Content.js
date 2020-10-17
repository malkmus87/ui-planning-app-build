import React from 'react';
import {connect} from 'react-redux';
import {jsonRequestHandler} from './settings.js';
import LongTermPlanning from './_components/LongTermPlanning';
import PlanningCreator from './_components/PlanningCreator';
import {updateLongTermPlanningID} from './_redux/actions';
import {bindActionCreators} from 'redux';
class Content extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        longTermPlanningID: null,
        mounted: false
      }
    }
  
    setInitialState = async () => {
      const response=await jsonRequestHandler.get('longtermplanning/search?q='+this.props.username);
      if (response.status === 200) {
       
        const longTermPlannings = await response.json();
        if (longTermPlannings.length > 0) {
         this.props.onUpdateLongTermPlanningID(longTermPlannings[0].id);
          this.setState({
            longTermPlanningID: longTermPlannings[0].id
          });
        }
      }
    }
    componentDidMount = async () => {
      await this.setInitialState();
      this.setState({mounted:true});
    }
    createPlanning = async (planning) => {
      const newPlanning = Object.assign(planning, { user: this.props.username });
      await jsonRequestHandler.post('longtermplanning', newPlanning);
      this.setInitialState();
  
    }
    render() {
      const state = this.state;
      return (
        state.mounted ?
          <div className="Content">
            <button 
              name="logout" 
              className="LogoutButton" 
                onClick={
                  (event)=>{
                    event.preventDefault();
                    console.log("logout");
                    this.props.onLogout();
              }}
            >Logga ut</button>
            {state.longTermPlanningID === null ?
              <div className="StandardRow" style={{ marginTop: "25vh" }}>
                <p style={{ marginBottom: 30 }}>Du har inte skapat någon planering</p>
                <PlanningCreator
                  onFinalSubmit={this.createPlanning}
                />
              </div> :
              <LongTermPlanning
                id={this.state.longTermPlanningID}
              />
            }
          </div>
          : null
      )
    }
  }
const mapActionToProps = (dispatch,props) =>{
    return bindActionCreators(
        {
          onUpdateLongTermPlanningID:updateLongTermPlanningID
        },
        dispatch
    );
  }
const mapStateToProps= (state,props) => {
    return{
        longTermPlanningID:state.longTermPlanningID
    }  
};

export default connect(mapStateToProps,mapActionToProps)(Content);