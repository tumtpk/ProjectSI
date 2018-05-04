import React, { Component } from "react";
import MainLayout from "../../components/main-layout";
import CommonApi from "../../api/common-api"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import ReactChartkick, { LineChart, PieChart, BarChart, ColumnChart } from 'react-chartkick';
import Chart from 'chart.js';
import Highcharts from 'highcharts';


 
class GoalSuccessOfTheCourse extends Component { 


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
        year:2017,
        semester:1,
        studentList:[]    ,
        percentAverage:null,
        studentName:null

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);        
    // this.handlerNumberDate = this.handlerNumberDate.bind(this);
  }

componentWillMount() {
    CommonApi.instance.get('/goal/graphByCommanderMajor/'+ this.state.semester +","+ this.state.year)
    .then(response => {
        this.setState({studentList: response.data});
        console.log({studentList: response.data});
    });
  
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    document.getElementById(name).innerHTML = null;
    console.log(name,value)
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.semester);
    console.log(this.state.year)
      CommonApi.instance.get('/goal/graphByCommanderMajor/'+ this.state.semester +","+ this.state.year)
      .then(response => {
          this.setState({studentList: response.data});
          console.log({studentList: response.data});
      }); 
  }

render() {
    let studentList = this.state.studentList;
    console.log(studentList)
    const data = studentList.map(item => [item.studentName, item.percentAverage])
  return (
    <section id="main-content">
      <section className="wrapper">
      <br></br>
      <h3><i className="fa fa-angle-right"></i> กราฟความสำเร็จเป้าหมายของงานหลักสูตร</h3>
      <br></br>
      <div className="text-center">
                          <div className="col-sm-10">
                            <div className="btn-group">
                            <select className="form-control" name="semester" value={this.state.semester} onChange={this.handleChange} >
                                <option value="1">ภาคการศึกษาที่ 1</option>  
                                <option value="2">ภาคการศึกษาที่ 2</option>  
                                <option value="3">ภาคการศึกษาที่ 3</option>  
                                </select>
                                <span id="semester" className="error-message"></span>
                            </div>
                            <div className="btn-group">
                            <select className="form-control" name="year" value={this.state.year} onChange={this.handleChange} >
                                <option value="2017">ปีการศึกษา 2017</option>  
                                <option value="2018">ปีการศึกษา 2019</option>  
                                <option value="2019">ปีการศึกษา 2019</option>  
                                <option value="2020">ปีการศึกษา 2020</option>  
                                <option value="2021">ปีการศึกษา 2021</option> 
                                </select>
                                <span id="year" className="error-message"></span>
                            </div>
                            <button type="submit" className="btn btn-warning" onClick={this.handleSubmit}><i className="fa fa-filter" ></i> แสดง</button>
                          </div>
                          <br></br><br></br>      
        </div><br></br><br></br>
            <ColumnChart data={data} />                                      
      </section>
    </section>
  );
}
}
  
  export default GoalSuccessOfTheCourse;