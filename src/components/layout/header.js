import React, { Component } from "react";
import cookies from 'react-cookies'
import { Redirect } from 'react-router';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    cookies.remove('token');
    this.setState({redirect: true});
  }
    render() {
      const { redirect } = this.state;

      if (redirect) {
        return <Redirect to='/'/>;
      }

      return (
        <header className="header black-bg">
              <div className="sidebar-toggle-box">
                  <div className="fa fa-bars tooltips" data-placement="right" data-original-title="Toggle Navigation"></div>
              </div>
            <a href="index.html" className="logo"><b>SI System</b></a>
            
            <div className="top-menu">
              <ul className="nav pull-right top-menu">
                  <li><button className="logout" onClick={this.handleLogout}>Logout</button></li>
              </ul>
            </div>
        </header>
      );
    }
  }
  
  export default Header;