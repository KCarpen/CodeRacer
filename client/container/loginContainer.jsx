import React, { Component} from 'react';
import {Link} from 'react-router-dom';
// const [isLoggedIn, setIsLoggedIn] = useState(false);

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      showHidePopup : true,
      text : "Toggled!"
    }
    this.togglePopup = this.togglePopup.bind(this);
  }
 

  togglePopup() {
    // useEffect(() => {
    //       setIsLoggedIn(loggedIn => loggedIn = true);
    // });
    this.setState({ showHidePopup: !this.state.showHidePopup })
  }
  
  render(){
    let message;
    if(this.state.showHidePopup) message = this.state.text
      else message = "LOG IN";
      // else 
    return(
    <div className = "login">
        <div className = "message">
            <h2 className = "crtSpecial welcome">Welcome to </h2> <span className ="crtSpecial title"> CODERACER</span>
            <br/> <br/> <br/> <br/> <br/> <br/>
            <div className = "signIn">
              {/* <a className = "githubButton" href={"https://github.com/login/oauth/authorize?scope=read:user&client_id=3b5392180e51bf2368e3&redirect_uri=http://localhost:3000/callback"}> </a>*/}
                <Link to="/game"><span 
                // onClick={() => this.togglePopup()}
                >LOG IN
                </span></Link>
              
            </div>
        </div>
    </div>
    )
  }
}


const LoginComp = (props) => {
  <div className="popuptext">
    Username: <input /> <br />
    Password: <input />
  </div> 
}




export default Login;