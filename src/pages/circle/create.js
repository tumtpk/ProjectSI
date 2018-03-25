import React, { Component } from "react";
import MainLayout from "../../components/main-layout";
import CommonApi from "../../api/common-api"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { isNull } from "util";

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
        }

        // mixins: [Validation.FieldMixin]
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidate = this.handleValidate.bind(this);

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

    handleValidate(messages){
        let require = ["circleName","circleTime"];
        require.forEach(element => {
            document.getElementById(element).innerHTML = null;
        });
        console.log(messages);
       
        messages.forEach(element => {
            document.getElementById(element.key).innerHTML = element.message;
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log(this.state);
 
        if (this.state.circleTime == null ){
            this.state.circleTime = 0
        }
        CommonApi.instance.post('/circle/CreateisDuplicateName' ,this.state)
        .then(response => {
            if(response.status == 200 && response.data.result == false){
                this.setState({ duplicate: false, duplicateMessage1: "ชื่อรอบการดำเนินงานซ้ำ!", duplicateMessage2: "กรุณากรอกชื่อรอบการดำเนินงานใหม่อีกครั้ง."});
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
                                this.handleValidate(response.data.message);
                                
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
                            <label className="col-sm-3 col-sm-3 control-label">ชื่อรอบการดำเนินงาน<span className="error-message">*</span></label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" name="circleName" value={this.state.circleName} onChange={this.handleChange} />
                                <span id="circleName" className="error-message"></span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-3 col-sm-3 control-label">ระยะเวลาที่กำหนด<span className="error-message">*</span></label>
                            <div className="col-sm-3">
                                <input type="number" className="form-control" name="circleTime" value={this.state.circleTime} onChange={this.handleChange} />
                                <span id="circleTime" className="error-message"></span>
                            </div>
                            <label className="col-sm-3 col-sm-3 control-label">วัน</label>
                        </div>

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