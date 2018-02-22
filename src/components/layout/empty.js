import React, { Component } from "react";

class Empty extends Component {
    render() {
      return (
        <div id="login-page">
            {this.props.children}
        </div> 
      );
    }
  }
  
  export default Empty;