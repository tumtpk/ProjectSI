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
            circleName: "",
            circleTime: null,
            status: 1,
            redirect: false,
            duplicateMessage1: "",
            duplicateMessage2: "",
            duplicate: true,
            startDate: "",
            endDate:"",
            circles: [
                      {circleName: "ภาคการศึกษาที่ 1",status:1,startDate:"2018-02-24",endDate:"2018-02-25",year: 2561,semester:1},
                      {circleName: "ภาคการศึกษาที่ 2",status:1,startDate:"2018-02-26",endDate:"2018-02-27",year: 2561,semester:2},
                      {circleName: "ภาคการศึกษาที่ 3",status:1,startDate:"2018-02-28",endDate:"2018-02-29",year: 2561,semester:3}     
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
          return { ...circle, startDate: evt.target.startDate };
        });
    
        this.setState({ circles: newValua });
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

                        <div className="form-group">
                            <label className="col-sm-3 col-sm-3 control-label" value={this.state.circleName}>ปีการศึกษา<span className="error-message">*</span></label>
                            <div className="col-sm-3">
                            <div className="btn-group">
                                        <select className="form-control" name="year" value={this.state.year} onChange={this.handleChange}>
                                            <option value="2560">2560</option>
                                            <option value="2561">2561</option>
                                            <option value="2562">2562</option>
                                            <option value="2563">2563</option>
                                            <option value="2564">2564</option>
                                            <option value="2565">2565</option>
                                            <option value="2566">2566</option>
                                            <option value="2567">2567</option>
                                            <option value="2568">2568</option>
                                            <option value="2569">2569</option>
                                            <option value="2570">2570</option>
                                        </select>
                                        <span id="year" className="error-message"></span>
                                    </div>
                            </div>
                        </div>
                        {this.state.circles.map((circle, index) => (
                        <div className="form-group">
                            <label className="col-sm-3 col-sm-3 control-label">ภาคการศึกษาที่ {index+1}<span className="error-message">*</span></label>
                            <div className="col-sm-3">
                            <label>วันเริ่มต้นของภาคการศึกษาที่ {index+1}</label>
                          <div className='input-group date' id='datetimepicker1'>
                          <input type='date' className="form-control" name="startDate" value={circle.startDate} onChange={this.handleSValueChange(index)} />
                          <span className="input-group-addon">
                          <span className="glyphicon glyphicon-calendar"></span>
                          </span>
                          <span id="startDate" className="error-message"></span>
                          </div>
                          </div>
                            <div className="col-sm-3">
                            <label>วันสิ้นสุดของภาคการศึกษาที่ {index+1}</label>
                          <div className='input-group date' id='datetimepicker1'>
                          <input type='date' className="form-control" name="endDate" value={circle.endDate} onChange={this.handleSValueChange(index)} />
                          <span className="input-group-addon">
                          <span className="glyphicon glyphicon-calendar"></span>
                          </span>
                          <span id="endDate" className="error-message"></span>
                          </div>
                          </div>
                        </div>
                    ))}
                            <div className="form-group">
                                <label className="col-sm-3 col-sm-3 control-label">สถานะ</label>
                                <div className="col-sm-5">
                                    <div className="btn-group">
                                        <select className="form-control" name="status" value={this.state.status} onChange={this.handleChange}>
                                            <option value="1">เปิดใช้งาน</option>
                                            <option value="2">ปิดใช้งาน</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                       
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