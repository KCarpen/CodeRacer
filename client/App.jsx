import React, { Component, useState, useEffect } from 'react';
import LoginContainer from './container/loginContainer.jsx';
import MainContainer from './container/MainContainer.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Checks to see if the user is logged in
  useEffect(() => {
    fetch('/verify')
    .then(res => {
      if (res.status === 200) {
        // console.log("WE GOT HERE and are setting the state")
        setIsLoggedIn(loggedIn => loggedIn = true)
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
        <Switch>
          <Route exact path="/" component={LoginContainer} />
          <Route exact path="/game" component={MainContainer} />
        </Switch>
      </div>
      </Router>
    )
}

export default App;