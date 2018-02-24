import React, { Component } from "react";
import MainLayout from "../components/main-layout";
import cookies from 'react-cookies'
import {Redirect} from 'react-router';

class Content extends Component {
    render() {
      return (
        <section id="main-content">
          <section className="wrapper">
              <h1>Hello</h1>
          </section>
        </section>
      );
    }
  }
  
  export default Content;