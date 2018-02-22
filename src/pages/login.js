import React, { Component } from "react";
import FormLogin from "../components/form-login";

class Login extends Component {
    render() {
      return (
        <div id="login-page">
	  	    <div className="container">
                <FormLogin />
            </div>
        </div>   
      );
    }
  }
  
  export default Login;