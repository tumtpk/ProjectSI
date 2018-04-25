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
		let style1 = {
			height: '25%',
        };
        let style2 = {
			height: '55%',
        };
        let style3 = {
			height: '75%',
        };
        let style4 = {
			height: '50%',
        };
        let style = {
			height: '50%',
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
                              <div className="value tooltips" data-original-title="8.500" data-toggle="tooltip" data-placement="top" style={style1}></div>
                          </div>
                          <div className="bar ">
                              <div className="title">Learn java</div>
                              <div className="value tooltips" data-original-title="5.000" data-toggle="tooltip" data-placement="top" style={style2}></div>
                          </div>
                          <div className="bar ">
                              <div className="title">Web App</div>
                              <div className="value tooltips" data-original-title="6.000" data-toggle="tooltip" data-placement="top" style={style3}></div>
                          </div>
                          <div className="bar ">
                              <div className="title">Learn React</div>
                              <div className="value tooltips" data-original-title="4.500" data-toggle="tooltip" data-placement="top" style={style4}></div>
                          </div>
                          <div className="bar">
                              <div className="title">Web Moblie</div>
                              <div className="value tooltips" data-original-title="3.200" data-toggle="tooltip" data-placement="top" style={style2}></div>
                          </div>
                          <div className="bar ">
                              <div className="title">Application</div>
                              <div className="value tooltips" data-original-title="6.200" data-toggle="tooltip" data-placement="top" style={style4}></div>
                          </div>
                          <div className="bar">
                              <div className="title">GraphQL</div>
                              <div className="value tooltips" data-original-title="7.500" data-toggle="tooltip" data-placement="top" style={style1}></div>
                          </div>
                      </div>
					</div>

		
          </section>
        </section>
      );
    }
  }
  
  export default ReportAllGoal ;