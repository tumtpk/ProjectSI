import React, { Component } from "react";
import { Redirect } from 'react-router';
import { instanceOf } from 'prop-types';
import cookies from 'react-cookies'

class FormLogin extends Component {

    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        redirect: false,
        message: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleAuth = this.handleAuth.bind(this);
    }

    handleSubmit(event) {
      this.handleAuth();
      event.preventDefault();
    }

    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      
      this.setState({
        [name]: value
      });
    }

    handleAuth(event){
      
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          let responses = JSON.parse(xhttp.response);
          cookies.save('token', responses.access_token);
          // this.setState({redirect: true});
          window.location = "/dashboard";
        }else{
          this.setState({message: 'username or password invalid!'});
        }
      };
      xhttp.open("POST", "http://localhost:52522/token", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send("grant_type=password&username="+this.state.username+"&password="+this.state.password);
    }

    render() {
      const { redirect } = this.state;

      if (redirect) {
        return <Redirect to='/dashboard'/>;
      }

      return (
        <form className="form-login" onSubmit={this.handleSubmit}>
		    <h2 className="form-login-heading"> ลงชื่อเข้าสู่ระบบ </h2>
            <div className="login-wrap">
                <input type="text" name="username" className="form-control" placeholder=" อีเมล์ผู้ใช้งาน" value={this.state.username} onChange={this.handleChange} autofocus />
                <br />
                <input type="password" name="password" className="form-control" placeholder=" รหัสผ่าน" value={this.state.password} onChange={this.handleChange} />
                <label className="checkbox">
                    <span className="pull-left">
                        { this.state.message }
                    </span>
		        </label>
		        <button className="btn btn-theme btn-block" type="submit"><i className="fa fa-lock"></i> เข้าสู่ระบบ</button>
            </div>
        </form>    
      );
    }
  }
  
  export default FormLogin;