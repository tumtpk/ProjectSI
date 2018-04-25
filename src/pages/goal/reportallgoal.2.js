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



class ReportAllGoal3 extends Component { 

    render() {
		let style1 = {
            display: 'inline-block',
            width: '320px',
            height: '75px',
            vertical: 'top'
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
            width: '120px', 
            height: '120px'
        };
        let point ={
            display: 'inline-block',
            width: '233px',
            height: '75px',
            //vertical-align: 'top'
        }
        
      return (
        <section id="main-content">
          <section className="wrapper">

          	<h3><i className="fa fa-angle-right"></i> แสดงความสำเร็จเป้าหมายนักศึกษาในที่ปรึกษา</h3>
          	<div className="row mt">
 
					
                      	<div className="col-md-4 col-sm-4 mb">
					        <div className="stock card">
					        	<div className="stock-chart">
					            	<div id="chart"></div>
								</div>
								<div className="stock current-price">
									<div className="row">
									<div className="changes col-sm-6 col-xs-6">

									</div>
									</div>
								</div>
								<div className="summary">
                                    <strong>มูชิมูชิ แก้วเนื้ออ่อน</strong><br></br>
					            	<strong>50 %</strong> <span>Goal Sucess</span>
								</div>
					        </div>
						</div>
                        <div className="col-md-4 col-sm-4 mb">
					        <div className="stock card">
					        	<div className="stock-chart">
					            	<div id="chart"></div>
								</div>
								<div className="stock current-price">
									<div className="row">
									<div className="changes col-sm-6 col-xs-6">

									</div>
									</div>
								</div>
								<div className="summary">
                                    <strong>ครรชิต แก้วเนื้ออ่อน</strong><br></br>
					            	<strong>50 %</strong> <span>Goal Sucess</span>
								</div>
					        </div>
						</div>
                        <div className="col-md-4 col-sm-4 mb">
					        <div className="stock card">
					        	<div className="stock-chart">
					            	<div id="chart"></div>
								</div>
								<div className="stock current-price">
									<div className="row">
									<div className="changes col-sm-6 col-xs-6">

									</div>
									</div>
								</div>
								<div className="summary">
                                    <strong>จารุเดช ศรีประพันธ์</strong><br></br>
					            	<strong>50 %</strong> <span>Goal Sucess</span>
								</div>
					        </div>
						</div>
					

					


          		</div>

          </section>
        </section>
      );
    }
  }
  
  export default ReportAllGoal3 ;