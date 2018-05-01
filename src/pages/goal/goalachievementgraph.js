import React, { Component } from "react";
import MainLayout from "../../components/main-layout";
import CommonApi from "../../api/common-api"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick';
import Chart from 'chart.js';
import Highcharts from 'highcharts';
 
class GoalAchievementGraph extends Component { 



    render() {
        let  data = [
            {"name":"พัฒนาเว็บ Api", "data": {"2017-01-01": 4, "2017-02-01": 8}},
            {"name":"ฝึกเขียน C#", "data": {"2017-03-01": 5, "2017-06-01": 6}},
            {"name":"ฝึกเขียน React", "data": {"2017-07-01": 8, "2017-09-02": 12}}
          ];
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
          <br></br>
          <h3><i className="fa fa-angle-right"></i> กราฟความสำเร็จเป้าหมายของฉัน</h3>
          <div className="row mt">
            <div className="col-lg-6">
                <div className="content-panel">
						<h4><i className="fa fa-angle-right"></i> ฝึกเขียน C#</h4>
                        <div className="panel-body text-center">
                            <LineChart data={{"2018-05-01": 10, "2018-05-02": 20,"2018-05-03": 30, "2018-05-04": 40,"2018-05-05": 50 }} />
                        </div>
                </div>
            </div>
             <div className="col-lg-6">
                <div className="content-panel">
						<h4><i className="fa fa-angle-right"></i> ฝึกเขียน Api</h4>
                        <div className="panel-body text-center">
                            <LineChart data={{"2018-05-13": 20, "2018-05-14": 40,"2018-05-15": 50 }} />
                        </div>
                </div>
            </div>
          </div>
          <div className="row mt">
            <div className="col-lg-6">
                <div className="content-panel">
						<h4><i className="fa fa-angle-right"></i> พัฒนาเว็บ App</h4>
                        <div className="panel-body text-center">
                            <LineChart data={{"2017-05-13": 25, "2017-05-14": 50,"2017-05-15": 75 }} />
                        </div>
                </div>
            </div>

          </div>
          <div className="row mt">
            <div className="col-lg-12">
                <div className="content-panel">
						<h4><i className="fa fa-angle-right"></i> ความสำเร็จโดยภาพรวมเป้าหมายของฉัน</h4>
                        <div className="panel-body text-center">
                        <PieChart data={[["ฝึกเขียน C#", 50], ["ฝึกเขียน Api", 50],["พัฒนาเว็บ App", 75] ]} />
                        </div>
                </div>
            </div>
          </div>
    
          </section>
        </section>
      );
    }
  }
  
  export default GoalAchievementGraph;