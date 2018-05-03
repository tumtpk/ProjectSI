import React, { Component } from "react";
import MainLayout from "../../components/main-layout";
import CommonApi from "../../api/common-api"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import ReactChartkick, { LineChart, PieChart, BarChart, ColumnChart } from 'react-chartkick';
import Chart from 'chart.js';
import Highcharts from 'highcharts';

 
class GoalAchievementGraph extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            goalName: "",
            description:"",
            startDate:"",
            endDate:"",
            circleID:"",
            complete:"",
            inComplete:"",
            percent: null,

        }
  

        // this.handlerNumberDate = this.handlerNumberDate.bind(this);
      }

    componentWillMount() {
        CommonApi.instance.get('/goal/graphByYouself/'+ 1 +","+ 2017)
        .then(response => {
            this.setState({studentList: response.data});
            console.log({studentList: response.data});
        });
      
      }

    render() {
        let studentList = this.state.studentList;
        
      return (
        <section id="main-content">
          <section className="wrapper">
          <br></br>
          <h3><i className="fa fa-angle-right"></i> กราฟความสำเร็จเป้าหมายของฉัน</h3>
                <ColumnChart data={studentList}    />                                           
          </section>
        </section>
      );
    }
  }
  
  export default GoalAchievementGraph;