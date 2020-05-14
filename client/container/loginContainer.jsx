import React, { Component} from 'react';
import {Link} from 'react-router-dom';
// const [isLoggedIn, setIsLoggedIn] = useState(false);

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      usernameLogin: '',
      passwordLogin: '',
      usernameRegister: '',
      passwordRegister: ''
    }
    this.doLog = this.doLog.bind(this);
    this.doReg = this.doReg.bind(this);
    this.handleChangeLoginUser = this.handleChangeLoginUser.bind(this);
    this.handleChangeLoginPassword = this.handleChangeLoginPassword.bind(this);
    this.handleChangeRegisterUser = this.handleChangeRegisterUser.bind(this);
    this.handleChangeRegisterPassword = this.handleChangeRegisterPassword.bind(this);
  }

  handleChangeLoginUser(e) {
    this.setState({usernameLogin: e.target.value});
  }
  handleChangeLoginPassword(e) {
    this.setState({passwordLogin: e.target.value});
  }
  handleChangeRegisterUser(e) {
    this.setState({usernameRegister: e.target.value});
  }
  handleChangeRegisterPassword(e) {
    this.setState({passwordRegister: e.target.value});
  }
  doLog(e) {
    e.preventDefault();
    let password = this.state.passwordLogin
    let username = this.state.usernameLogin
    let stuff = {password: password, username: username}
    console.log("this is what we're sending out in doLog", stuff)
    fetch('/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(stuff)
    }).then(res => {
      console.log("do we even get stuff")
      //handle stuff here, potentially.
      return;
    }
    ).catch(error => {
      console.log(error)
    });
  }
  doReg(e) {
    e.preventDefault();
    let password = this.state.passwordRegister
    let username = this.state.usernameRegister
    let stuff = {password: password, username: username}
    console.log("this is what we're sending out in doReg", stuff)
    fetch('/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(stuff)
    })
  }
  //   .then(res => {
      
  //   }
  //   ).catch(error => {
  //     console.log(error)
  //   });
  // }
  
  render(){
    console.log("IN LOGIN RENDER")
    // let message;
    // if(this.state.showHidePopup) message = this.state.text
    //   else message = "LOG IN";
      // else 
    return(
      <div>
      <form onSubmit={this.doLog}>
      <input 
        type="text"
        value={this.state.usernameLogin}
        name="username"
        onChange={this.handleChangeLoginUser} 
        placeholder="Username"
        required
      />
       <input 
        type="password"
        value={this.state.passwordLogin}
        name="password"
        onChange={this.handleChangeLoginPassword} 
        placeholder="Password"
        required
      />
        {/* <Input name="username" placeholder="Username" value={this.state.username} onChange = {this.handleChange}/>
        <Input name="password" placeholder="Password" value={this.state.password} onChange = {this.handleChange} type="password"/> */}
        <button className="githubButton" type="submit" value="submit">LOG IN</button>
        {/* <button className="githubButton" type="submit" value="submit">REGISTER</button> */}
      </form> 
      <form onSubmit={this.doReg}>
      <input 
        type="text"
        value={this.state.usernameRegister}
        name="username"
        onChange={this.handleChangeRegisterUser} 
        placeholder="Username"
        required
      />
       <input 
        type="password"
        value={this.state.passwordRegister}
        name="password"
        onChange={this.handleChangeRegisterPassword} 
        placeholder="Password"
        required
      />
        {/* <Input name="username" placeholder="Username" value={this.state.username} onChange = {this.handleChange}/>
        <Input name="password" placeholder="Password" value={this.state.password} onChange = {this.handleChange} type="password"/> */}
        <button className="githubButton" type="submit" value="submit">REGISTER</button>
        {/* <button className="githubButton" type="submit" value="submit">REGISTER</button> */}
      </form>    
    </div>              
    )
  }
}


    // <div className = "login">
    //     <div className = "message">
    //         <h2 className = "crtSpecial welcome">Welcome to </h2> <span className ="crtSpecial title"> CODERACER</span>
    //         <br/> <br/> <br/> <br/> <br/> <br/>
    //         <h3>LOG IN or REGISTER:</h3>
    //         <div className = "signIn">
              
    //         </div>
    //     </div>
    // </div>


export default Login;