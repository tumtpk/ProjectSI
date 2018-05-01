import React, { Component } from "react";
import MainLayout from "../../components/main-layout";
import CommonApi from "../../api/common-api"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
 
class chart extends Component { 



    render() {

      return (
        <section id="main-content">
          <section className="wrapper">
          <h3><i className="fa fa-angle-right"></i> Chartjs Charts</h3>
              <div className="tab-pane" id="chartjs">
                  <div className="row mt">
                      <div className="col-lg-6">
                          <div className="content-panel">
							  <h4><i className="fa fa-angle-right"></i> Doughnut</h4>
                              <div className="panel-body text-center">
                                  <canvas id="doughnut" height="300" width="400"></canvas>
                              </div>
                          </div>
                      </div>
                      <div className="col-lg-6">
                          <div className="content-panel">
							  <h4><i className="fa fa-angle-right"></i> Line</h4>
                              <div className="panel-body text-center">
                                  <canvas id="line" height="300" width="400"></canvas>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="row mt">
                      <div className="col-lg-6">
                          <div className="content-panel">
							  <h4><i className="fa fa-angle-right"></i> Radar</h4>
                              <div className="panel-body text-center">
                                  <canvas id="radar" height="300" width="400"></canvas>
                              </div>
                          </div>
                      </div>
                      <div className="col-lg-6">
                          <div className="content-panel">
							  <h4><i className="fa fa-angle-right"></i> Polar Area</h4>
                              <div className="panel-body text-center">
                                  <canvas id="polarArea" height="300" width="400"></canvas>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="row mt">
                      <div className="col-lg-6">
                          <div className="content-panel">
							  <h4><i className="fa fa-angle-right"></i> Bar</h4>
                              <div className="panel-body text-center">
                                  <canvas id="bar" height="300" width="400"></canvas>
                              </div>
                          </div>
                      </div>
                      <div className="col-lg-6">
                          <div className="content-panel">
							  <h4><i className="fa fa-angle-right"></i> Pie</h4>
                              <div className="panel-body text-center">
                                  <canvas id="pie" height="300" width="400"></canvas>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

          </section>
        </section>
      );
    }
  }
  
  export default chart;