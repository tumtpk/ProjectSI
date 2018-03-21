import React, { Component } from "react";
import axios from "axios";
import CommonApi from "../../api/common-api"
import { Link } from 'react-router-dom';
//import BarChart from 'react-chartjs' 

const initialState = {
  id: null,
  goalName: "",
  description: "",
  startDate: "",
  endDate: "",
  categoryID: 0,
  circleID: 0,
  checklists: [{value: null}],
  dataSearch: null
};



class ReportAllGoal extends Component { 

    render() {
		let styles = {
			height: '25%',
		};


      return (
        <section id="main-content">
          <section className="wrapper">
          	<h3><i className="fa fa-angle-right"></i> กราฟแสดงความสำเร็จของเป้าหมาย</h3>
			  <div className="row mt">
                      <div className="custom-bar-chart">
                          <ul className="y-axis">
                              <li><span>100%</span></li>
                              <li><span>80%</span></li>
                              <li><span>60%</span></li>
                              <li><span>40%</span></li>
                              <li><span>20%</span></li>
                              <li><span>0</span></li>
                          </ul>
                          <div className="bar">
                              <div className="title">Web Api</div>
                              <div className="value tooltips" data-original-title="8.500" data-toggle="tooltip" data-placement="top" styles={styles}></div>
                          </div>
                          <div className="bar ">
                              <div className="title">Learn java</div>
                              <div className="value tooltips" data-original-title="5.000" data-toggle="tooltip" data-placement="top" styles={styles}></div>
                          </div>
                          <div className="bar ">
                              <div className="title">Web App</div>
                              <div className="value tooltips" data-original-title="6.000" data-toggle="tooltip" data-placement="top" styles={styles}></div>
                          </div>
                          <div className="bar ">
                              <div className="title">Learn React</div>
                              <div className="value tooltips" data-original-title="4.500" data-toggle="tooltip" data-placement="top" styles={styles}></div>
                          </div>
                          <div className="bar">
                              <div className="title">Web Moblie</div>
                              <div className="value tooltips" data-original-title="3.200" data-toggle="tooltip" data-placement="top" styles={styles}></div>
                          </div>
                          <div className="bar ">
                              <div className="title">Application</div>
                              <div className="value tooltips" data-original-title="6.200" data-toggle="tooltip" data-placement="top" styles={styles}></div>
                          </div>
                          <div className="bar">
                              <div className="title">GraphQL</div>
                              <div className="value tooltips" data-original-title="7.500" data-toggle="tooltip" data-placement="top" styles={styles}></div>
                          </div>
                      </div>
					</div>

			<h3><i className="fa fa-angle-right"></i> กราฟแสดงความสำเร็จของเป้าหมาย (เดือน)</h3>
			  <div className="row mt">
			  <div className="custom-bar-chart">
                          <ul className="y-axis">
                              <li><span>10.000</span></li>
                              <li><span>8.000</span></li>
                              <li><span>6.000</span></li>
                              <li><span>4.000</span></li>
                              <li><span>2.000</span></li>
                              <li><span>0</span></li>
                          </ul>
                          <div className="bar">
                              <div className="title">JAN</div>
                              <div className="value tooltips" data-original-title="8.500" data-toggle="tooltip" data-placement="top" styles={styles}></div>
                          </div>
                          <div className="bar ">
                              <div className="title">FEB</div>
                              <div className="value tooltips" data-original-title="5.000" data-toggle="tooltip" data-placement="top" styles={styles}></div>
                          </div>
                          <div className="bar ">
                              <div className="title">MAR</div>
                              <div className="value tooltips" data-original-title="6.000" data-toggle="tooltip" data-placement="top" styles={styles}></div>
                          </div>
                          <div className="bar ">
                              <div className="title">APR</div>
                              <div className="value tooltips" data-original-title="4.500" data-toggle="tooltip" data-placement="top" styles={styles}></div>
                          </div>
                          <div className="bar">
                              <div className="title">MAY</div>
                              <div className="value tooltips" data-original-title="3.200" data-toggle="tooltip" data-placement="top" styles={styles}></div>
                          </div>
                          <div className="bar ">
                              <div className="title">JUN</div>
                              <div className="value tooltips" data-original-title="6.200" data-toggle="tooltip" data-placement="top" styles={styles}></div>
                          </div>
                          <div className="bar">
                              <div className="title">JUL</div>
                              <div className="value tooltips" data-original-title="7.500" data-toggle="tooltip" data-placement="top" styles={styles}></div>
                          </div>
                      </div>
					  </div>


					  <div className="content-panel">
							  <h4><i className="fa fa-angle-right"></i> Bar</h4>
                          </div>

          </section>
        </section>
      );
    }
  }
  
  export default ReportAllGoal ;