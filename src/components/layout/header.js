import React, { Component } from "react";

class Header extends Component {
    render() {
      return (
        <header className="header black-bg">
              <div className="sidebar-toggle-box">
                  <div className="fa fa-bars tooltips" data-placement="right" data-original-title="Toggle Navigation"></div>
              </div>
            <a href="index.html" className="logo"><b>SI System</b></a>
            
            <div className="top-menu">
              <ul className="nav pull-right top-menu">
                    <li><a className="logout" href="login.html">Logout</a></li>
              </ul>
            </div>
        </header>
      );
    }
  }
  
  export default Header;