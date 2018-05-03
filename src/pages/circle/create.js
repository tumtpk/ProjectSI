import React, { Component } from "react";
import MainLayout from "../../components/main-layout";
import CommonApi from "../../api/common-api"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { isNull } from "util";
import DatePicker from 'react-datepicker';
import moment from 'moment';
//import 'react-datepicker.css';


class CircleCreate extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            // circleName: "",
            // circleTime: null,
            status: 1,
            redirect: false,
            duplicateMessage1: "",
            duplicateMessage2: "",
            duplicate: true,
            startDate: "",
            endDate:"",
            circles: [
                {circleName: "ภาคการศึกษาที่ 1", startDate: null, endDate: null, year: null, semester: 1},
                {circleName: "ภาคการศึกษาที่ 2", startDate: null, endDate: null, year: null, semester: 2},
                {circleName: "ภาคการศึกษาที่ 3", startDate: null, endDate: null, year: null, semester: 3}     
                    ]                      
        }

        // mixins: [Validation.FieldMixin]
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSValueChange = this.handleSValueChange.bind(this);
        // this.handleValidate = this.handleValidate.bind(this);

      }
      
      handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
          [name]: value
        });

        document.getElementById(name).innerHTML = null;
      }

      handleSValueChange = (index) => (evt) => {
        const newValua = this.state.circles.map((circle, sidx) => {
          if (index !== sidx) return circle;
          console.log(evt.target.value," ",index);
          return { ...circle, startDate: evt.target.value };
        });
    
        this.setState({ circles: newValua });
        console.log(this.state.circles);
      }

      handleSValueChange2 = (index) => (evt) => {
        const newValua = this.state.circles.map((circle, sidx) => {
          if (index !== sidx) return circle;
          console.log(evt.target.value," ",index);
          return { ...circle, endDate: evt.target.value };
        });
    
        this.setState({ circles: newValua });
        console.log(this.state.circles);
      }

      handleSValueChange3 = (index) => (evt) => {
        const newValua = this.state.circles.map((circle, sidx) => {
          if (index !== sidx) return circle;
          console.log(evt.target.value," ",index);
          return { ...circle, circleName: evt.target.value };
        });
    
        this.setState({ circles: newValua });
        console.log(this.state.circles);
      }

      handleSValueChange4 = (index) => (evt) => {
        const newValua = this.state.circles.map((circle, sidx) => {
          if (index !== sidx) return circle;
          console.log(evt.target.value," ",index);
          return { ...circle, year: evt.target.value };
        });
    
        this.setState({ circles: newValua });
        console.log(this.state.circles);
      }

    // handleValidate(messages){
    //     let require = ["circleName","startDate","endDate"];
    //     require.forEach(element => {
    //         document.getElementById(element).innerHTML = null;
    //     });
    //     console.log(messages);
       
    //     messages.forEach(element => {
    //         document.getElementById(element.key).innerHTML = element.message;
    //     });
    // }

    handleSubmit(event) {
        event.preventDefault();

        console.log(this.state);
 
        if (this.state.circleTime == null ){
            this.state.circleTime = 0
        }
        CommonApi.instance.post('/circle/CreateisDuplicateName' ,this.state)
        .then(response => {
            if(response.status == 200 && response.data.result == false){
                this.setState({ duplicate: false, duplicateMessage1: "ชื่อรอบการดำเนินงานนี้ !", duplicateMessage2: "มีอยู่แล้วในระบบ."});
            }
            else{
                this.setState({ duplicate: true, duplicateMessage1: "",duplicateMessage2: ""});
                CommonApi.instance.post('/circle/create',this.state)
                        .then(response =>{
                            if(response.status == 200 && response.data.result){
                                this.setState({redirect: true});
                            }
                            else{
                                //this.setState({circleTime: null})
                                // this.handleValidate(response.data.message);
                                
                                 }
                                }
                                
                            )
                        }    this.setState({circleTime: null})   
                        }
                       
                );
               
            }         
      
    render() {
      this.state.circleTime == null;
      const { redirect } = this.state;

      if (redirect) {
        return <Redirect to='/circlemanagement'/>;
      }
      circles: [
        {circleName: "ภาคการศึกษาที่ 1",status:1,startDate: this.state.startDate,endDate: this.state.endDate,year: this.state.year,semester:1},
        {circleName: "ภาคการศึกษาที่ 2",status:1,startDate: this.state.startDate,endDate: this.state.endDate,year: this.state.year,semester:2},
        {circleName: "ภาคการศึกษาที่ 3",status:1,startDate: this.state.startDate,endDate: this.state.endDate,year: this.state.year,semester:3}     
      ]
      return (
        <section id="main-content">
          <section className="wrapper">

            <div className="row"> 
                <div className="col-md-12">
                    <h3><i className="fa fa-angle-right"></i> เพิ่มรอบการดำเนินงาน</h3>
                </div>
            </div>

            <div className="row mt">
              <div className="col-lg-12">
                <div className="form-panel">
                <div className="alert alert-danger alert-dismissable" hidden={this.state.duplicate}>
						  <strong>{this.state.duplicateMessage1}</strong> {this.state.duplicateMessage2}
						</div>
                    <h4 className="mb"><i className="fa fa-angle-right"></i> กรอกข้อมูลรอบการดำเนินงาน</h4>
                    <form className="form-horizontal style-form" onSubmit={this.handleSubmit}>

                        {this.state.circles.map((circle, index) => (
                        <div className="form-group">
                             <p className="centered" >  
                        <div className="col-sm-2">
                            <label>ชื่อรอบการดำเนินงาน</label>
                            <input type="text" className="form-control" name="circleName" value={circle.circleName} onChange={this.handleSValueChange3(index)} />

                         </div>
                         </p>
                            <div className="col-sm-3">
                            <label>วันเริ่มต้นของภาคการศึกษาที่ {index+1}</label>
                          <div className='input-group date' id='datetimepicker1'>
                          <input type='date' className="form-control" name="startDate" value={circle.startDate} onChange={this.handleSValueChange(index)} min={index!=0 ? 'circles['+index+']' : "" }/>
                          <span className="input-group-addon">
                          <span className="glyphicon glyphicon-calendar"></span>
                          </span>
                          <span id="startDate" className="error-message"></span>
                          </div>
                          </div>
                            <div className="col-sm-3">
                            <label>วันสิ้นสุดของภาคการศึกษาที่ {index+1}</label>
                          <div className='input-group date' id='datetimepicker1'>
                          <input type='date' className="form-control" name="endDate" value={circle.endDate} onChange={this.handleSValueChange2(index)} min={circle.startDate}/>
                          <span className="input-group-addon">
                          <span className="glyphicon glyphicon-calendar"></span>
                          </span>
                          <span id="endDate" className="error-message"></span>
                          </div>
                          </div>

                            <label className="col-sm-2 col-sm-3 control-label" >ปีการศึกษา</label>
                            <div className="col-sm-3">
                            <div className="btn-group">
                                        <select className="form-control" name="year" value={circle.year} onChange={this.handleSValueChange4(index)}>
                                            <option value="2018">2018</option>
                                            <option value="2019">2019</option>
                                            <option value="2020">2020</option>
                                            <option value="2021">2021</option>
                                            <option value="2022">2022</option>
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                            <option value="2027">2027</option>
                                        </select>
                                        <span id="year" className="error-message"></span>
                                    </div>
                            </div>
                        </div>
                        
                    ))}

                       
                        <div className="text-right">
                            <button type="submit" className="btn btn-success">บันทึก</button>
                            <Link to={ {pathname: `/circlemanagement`} }><button type="button" className="btn btn-danger">ยกเลิก</button></Link>
                        </div>
                    </form>
                </div>
              </div>
            </div>

          </section>
        </section>
      );
    }
  }
  
  export default CircleCreate;