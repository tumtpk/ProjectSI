import React, { Component } from "react";
import MainLayout from "../../components/main-layout";
import CommonApi from "../../api/common-api"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import ReactChartkick, { LineChart, PieChart, BarChart, ColumnChart } from 'react-chartkick';
import Chart from 'chart.js';
import Highcharts from 'highcharts';


 
class GoalSuccessOfTheCourse extends Component { 



    render() {
      let data = [
        {"name":"ครรชิต", "data": {"2017-01-01": 30, "2017-01-05": 40, "2017-01-15":50}},
        {"name":"จุฑามาศ", "data": {"2017-01-01": 50, "2017-01-07": 30, "2017-01-14":70}},
        {"name":"ศศิธร", "data": {"2017-01-01": 20, "2017-01-11": 5, "2017-01-18":90}},
        {"name":"พุธธิดา", "data": {"2017-01-01": 30, "2017-01-10": 6, "2017-01-28":100}},
        {"name":"รุจิภาส", "data": {"2017-01-01": 40, "2017-01-02": 80, "2017-01-30":100}},
      ];
      return (
        <section id="main-content">
          <section className="wrapper">
          <br></br>
          <h3><i className="fa fa-angle-right"></i> กราฟความสำเร็จเป้าหมายของนักศึกษาในที่ปรึกษา</h3>
          <br></br>
          <LineChart data={data} />
          <br></br><br></br>
          <ColumnChart data={[["ติวจาวา", 32], ["อบรม C#", 46], ["ศึกษา react", 28],["ศึกษา Java", 100],["เรียนรู้ React", 50]]} />
          </section>
        </section>
      );
    }
  }
  
  export default GoalSuccessOfTheCourse;