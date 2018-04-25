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



class ReportAllGoal2 extends Component { 

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
        let point ={
            display: 'inline-block',
            width: '233px',
            height: '75px',
            //vertical-align: 'top'
        }
        
      return (
        <section id="main-content">
          <section className="wrapper">
          	<h3><i className="fa fa-angle-right"></i> กราฟแสดงความสำเร็จของเป้าหมาย</h3>
              <div className="row mt">

                    <div className="darkblue-panel pn">
								<div className="darkblue-header">
									<h5>REVENUE</h5>
								</div>
								<div className="chart mt">
									<div className="sparkline" data-type="line" data-resize="true" data-height="75" data-width="90%" data-line-width="1" data-line-color="#fff" data-spot-color="#fff" data-fill-color="" data-highlight-line-color="#fff" data-spot-radius="4" data-data="[200,135,667,333,526,996,564,123,890,464,655]"><canvas width="233" height="75" style={point}></canvas></div>
								         
                                </div>
								<p className="mt"><b> ความสำเร็จ </b><br></br>เป้าหมาย</p>
							</div>

		</div>
          </section>
        </section>
      );
    }
  }
  
  export default ReportAllGoal2 ;