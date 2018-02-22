import React, { Component } from "react";
import Header from "./layout/header";
import LeftMenu from "./layout/left-menu";
import Footer from "./layout/footer";

class MainLayout extends Component {
    render() {
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