import React, { Component, useState, useEffect } from 'react';
import LoginContainer from './container/loginContainer.jsx';
import MainContainer from './container/MainContainer.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Checks to see if the user is logged in
  useEffect(() => {
    fetch('/verify')
    .then(res => {
      console.log("OUR RESPONSE IS: ", res)
      if (res.status === 200) {
        // console.log("WE GOT HERE and are setting the state")

        setIsLoggedIn(isLoggedIn => isLoggedIn = true)
        
        // console.log("THIS IS THE STATE", isLoggedIn) 
      } 
      // else console.log("we failed to verify the JWT")
    })
  })

  // If the user is successfully logged in: show main page
  // If not, show login page
  // if(0){
    
    return (
      <Router>
      <div className='containers'>
      <Route exact path="/"> {isLoggedIn ? <Redirect to="/game" /> : <LoginContainer/>}</Route>
          <Route exact path="/game" component={MainContainer} />
      </div>
      </Router>
    )
}


// const PrivateRoute = ({ isLoggedIn, ...props }) =>
//   isLoggedIn
//     ? <Route { ...props } />
//     : <Redirect to="/login" />


// <Switch>
//   <PrivateRoute isLoggedIn={ this.state.loggedIn } path="/protected" component={Protected} />
//   <Route path="/login" component={Login}/>
// </Switch>
export default App;