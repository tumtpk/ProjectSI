import React, { Component } from "react";
import Header from "./layout/header";
import LeftMenu from "./layout/left-menu";
import Footer from "./layout/footer";
import { Redirect, Route } from 'react-router-dom';
import cookies from 'react-cookies';

class MainLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

   componentWillMount() {
      let isLoggedIn = cookies.load('token');
      if(isLoggedIn == undefined){
        this.setState({redirect: true});
      }
   }
  
    render() {
      if (this.state.redirect) {
        return <Redirect to='/'/>;
      }

      return (
        <section id="container" >
          <Header />
          <LeftMenu />
          {this.props.children}
          <Footer />
        </section>
      );
    }
  }
  
  export default MainLayout;