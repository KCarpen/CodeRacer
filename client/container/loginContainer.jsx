import React, { Component} from 'react';
import {Link} from 'react-router-dom';
// const [isLoggedIn, setIsLoggedIn] = useState(false);
{/* <div className = "login">
        <div className = "message">
            <h2 className = "crtSpecial welcome">Welcome User, <br></br><br></br>to<br></br></h2> <span className ="crtSpecial title"> CODERACER</span>
            <div className = "signIn">
              <a className = "githubButton" href={"https://github.com/login/oauth/authorize?scope=read:user&client_id=3b5392180e51bf2368e3&redirect_uri=http://localhost:3000/callback"}>
                <svg className = "githubIcon"  height ="46px" width = "46px"viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px"  xmlSpace="preserve">
                    <path d="M15.5 22.7h-.1l-.1-.1V22v-2.5c0-.7-.1-1.3-.4-1.8 2.3-.4 4.8-1.6 4.8-6.1 0-1.2-.4-2.3-1.1-3.2.2-.6.3-1.7-.2-3.1l-.3-.3s-.2-.1-.4-.1c-.6 0-1.5.2-3 1.2-.8-.1-1.7-.3-2.7-.3-1 0-1.9.1-2.8.3C7.8 5.2 6.8 5 6.2 5c-.2 0-.3.1-.4.1-.1 0-.3.2-.3.3-.5 1.4-.4 2.5-.2 3.1-.7.9-1.1 2-1.1 3.2 0 4.4 2.6 5.6 4.8 6.1-.1.2-.2.5-.3.8-.2.1-.5.2-.9.2s-.8-.1-1.1-.4l-.1-.1c-.1-.1-.1-.2-.2-.2l-.1-.1-.1-.1c0-.1-.8-1.3-2.2-1.4-.5 0-.9.2-1 .5-.2.5.4.9.7 1.1 0 0 .6.3 1 1.4.2.7 1.1 2 3.2 2h.7v1.4l-.1.1s-.1 0 0 0C4 21.2 1 17 1 12.3c0-6.1 4.9-11 11-11s11 4.9 11 11c0 4.7-3 8.9-7.5 10.4z"/>
                </svg>
                <span>Log in with Github</span>
              </a>
            </div>
        </div>
    </div>
    ) */}
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
      <div className = "login">
        <div className ="message">
          <br />
         <h2 className = "crtSpecial welcome">Welcome <br></br><br></br>to<br></br></h2> <span className ="crtSpecial title"> CODERACER</span>
         
         <div className="userInput">
         <br></br><br></br><br></br><br></br>
      <form className="loginFields" onSubmit={this.doLog}>
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
      <form className="loginFields" onSubmit={this.doReg}>
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
      </div>
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