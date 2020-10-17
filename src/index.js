import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {jsonRequestHandler} from './settings.js';
import LongTermPlanning from './_components/LongTermPlanning';
import PlanningCreator from './_components/PlanningCreator';
import ProtectedRoute from './_components/ProtectedRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginComponent from './_components/LoginComponent';
import cookieHandler from './_classes/CookieHandler';
import {Provider} from 'react-redux';
import {store} from './_redux/store.js';
import Content from './Content.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: null,
      username:null,
      mounted: false
    }
  }
  componentDidMount = async () => {
    await this.verifyLoginStatus();
  }
  onLogout = () =>{
    console.log("Logout");
    cookieHandler.removeCookie('token');
    this.removeUser();

  }
  removeUser = () =>{
    this.setState({
      userID:null,
      username:null
    })
  }
  setUser = async (userID) => {

    const response=await jsonRequestHandler.get('user/'+userID);
    const userData=await response.json();
    if(response.status===200){
      this.setState({
        userID: userData.userID,
        username:userData.username
      })
    }
  }
  verifyLoginStatus = async () => {
    const response = await jsonRequestHandler.post('auth/verify', {});
    if (response.status === 200) {
      const data = await response.json();
      await this.setUser(data.authData.userID); 
    }
    this.setState({mounted:true})
  }
  render() {
    const isAuthorized=this.state.username !== null;
    return (
      this.state.mounted ?
        <div className="Body" style={{ width: "100%", textAlign: "center" }}>
          <Router>
            <Switch>
              <div style={{ display: "inline-block" }}>
                <ProtectedRoute
                  path="/"
                  component={
                    () => <Content username={this.state.username} onLogout={this.onLogout}/>
                  }
                  isAuthorized={isAuthorized}
                  fallback="/login"
                />
                <ProtectedRoute
                  path="/login"
                  component={
                    () => <LoginComponent onVerifiedLogin={this.setUser} />
                  }
                  fallback='/'
                  isAuthorized={!isAuthorized}
                />
              </div>
            </Switch>
          </Router>
        </div>
        : null
    )
  }
}

// class Content extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       longTermPlanningID: null,
//       mounted: false
//     }
//   }

//   setInitialState = async () => {
//     const response=await jsonRequestHandler.get('longtermplanning/search?q='+this.props.username);
//     if (response.status === 200) {
     
//       const longTermPlannings = await response.json();
//       if (longTermPlannings.length > 0) {
//         this.setState({
//           longTermPlanningID: longTermPlannings[0].id
//         });
//       }
//     }
//   }
//   componentDidMount = async () => {
//     await this.setInitialState();
//     this.setState({mounted:true});
//   }
//   createPlanning = async (planning) => {
//     const newPlanning = Object.assign(planning, { user: this.props.username });
//     await jsonRequestHandler.post('longtermplanning', newPlanning);
//     this.setInitialState();
//   }
//   render() {
//     const state = this.state;
//     return (
//       state.mounted ?
//         <div className="Content">
//           <button 
//             name="logout" 
//             className="LogoutButton" 
//               onClick={
//                 (event)=>{
//                   event.preventDefault();
//                   console.log("logout");
//                   this.props.onLogout();
//             }}
//           >Logga ut</button>
//           {state.longTermPlanningID === null ?
//             <div className="StandardRow" style={{ marginTop: "25vh" }}>
//               <p style={{ marginBottom: 30 }}>Du har inte skapat någon planering</p>
//               <PlanningCreator
//                 onFinalSubmit={this.createPlanning}
//               />
//             </div> :
//             <LongTermPlanning
//               id={this.state.longTermPlanningID}
//             />
//           }
//         </div>
//         : null
//     )
//   }
// }
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);


