import React, { Component } from "react";
import MainLayout from "../../components/main-layout";
import CommonApi from "../../api/common-api"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class UserUpdate extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            ConfirmPassword: "",
            personalID : "",
            firstname: "",
            lastname: "",
            userTypeID: 1,
            commanderID: 0,
            userID: null,
            status: 1,
            redirect: false,
        }
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        

      }

      componentWillMount() {
        let userID = this.props.location.query.userID;
        this.setState({userID: userID});
        this.apiGetUset(userID);
      }

      apiGetUset(userID){
        CommonApi.instance.get('/user/getuser/'+userID)
        .then(response => {
            let responseData = response.data;
            this.setState(
              {
                personalID : responseData.personalID,
                firstname: responseData.firstname,
                lastname: responseData.lastname,
                nickname: responseData.nickname,
                userTypeID: responseData.userTypeID,
                commanderID: responseData.commanderID,
                email: responseData.email,
                status: responseData.status
              }
            );
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
      }


      handleSubmit(event) {
        event.preventDefault();

        console.log(this.state);

        CommonApi.instance.post('/user/create', this.state)
        .then(response => {
            if(response.status == 200 && response.data.result){
                this.setState({redirect: true});
            }else{
                this.handleValidate(response.data.message);
            }
        });
      }

      
      handleValidate(messages){
        let require = ["personalID","firstname","lastname","email","userTypeID"];
        require.forEach(element => {
            document.getElementById(element).innerHTML = null;
        });
        console.log(messages);
        messages.forEach(element => {
            document.getElementById(element.key).innerHTML = element.message;
        });
    }

    render() {

      const { redirect } = this.state;

      if (redirect) {
        return <Redirect to='/usermanagement'/>;
      }

      return (
        <section id="main-content">
          <section className="wrapper">

            <div className="row"> 
                <div className="col-md-12">
                    <h3><i className="fa fa-angle-right"></i> แก้ไขผู้ใช้งาน</h3>
                </div>
            </div>

            <div className="row mt">
              <div className="col-lg-12">
                <div className="form-panel">
                    <h4 className="mb"><i className="fa fa-angle-right"></i> กรอกข้อมูลผู้ใช้งาน</h4>
                    <form className="form-horizontal style-form" onSubmit={this.handleSubmit}>

                        <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">รหัสประจำตัว<span className="error-message">*</span></label>
                              <div className="col-sm-3">
                                    <input type="text" className="form-control" name="personalID" value={this.state.personalID} onChange={this.handleChange} />
                                    <span id="personalID" className="error-message"></span>
                              </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 col-sm-2 control-label">ชื่อ<span className="error-message">*</span></label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="firstname" value={this.state.firstname} onChange={this.handleChange}/>
                                <span id="firstname" className="error-message"></span>
                            </div>
                            <label className="col-sm-1 col-sm-1 control-label">นามสกุล<span className="error-message">*</span></label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="lastname" value={this.state.lastname} onChange={this.handleChange}/>
                                <span id="lastname" className="error-message"></span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-2 col-sm-2 control-label">อีเมล์<span className="error-message">*</span></label>
                            <div className="col-sm-4">
                                <input type="email" className="form-control" name="email"  value={this.state.email} onChange={this.handleChange} disabled/>
                                <span id="email" className="error-message"></span>
                            </div>
                        </div>

                            <div className="form-group">
                                <label className="col-sm-2 col-sm-2 control-label">บทบาท<span className="error-message">*</span></label>
                                <div className="col-sm-5">
                                    <div className="btn-group">
                                        <select className="form-control" name="userTypeID" value={this.state.userTypeID} onChange={this.handleChange}>
                                            <option value="0">เลือกบทบาท</option>
                                            <option value="1">นักศึกษา</option>
                                            <option value="2">อาจารย์</option>
                                            <option value="3">ประธานหลักสูตร</option>
                                            <option value="4">ผู้ดูแลระบบ</option>
                                        </select>
                                        <span id="userTypeID" className="error-message"></span>
                                    </div>
                                </div>
                            </div>
                        
                            <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">ผู้บังคับบัญชา</label>
                              <div className="col-sm-5">
                                <div className="btn-group">

                                    <select className="form-control" name="commanderID" value={this.state.commanderID} onChange={this.handleChange}>
                                        <option value="0">เลือกผู้บังคับบัญชา</option>
                                        <option value="1">ผศ.เยาวเรศ ศิริสถิตย์กุล</option>
                                        <option value="2">ผศ.ดร.ฐิมาพร เพชรแก้ว</option>
                                        <option value="3">ผศ.อุหมาด หมัดอาด้ำ</option>
                                        <option value="4">ดร.กรัณรัตน์ ธรรมรักษ์</option>
                                        <option value="5">ดร.พุทธิพร ธนธรรมเมธี</option>
                                    </select>
                                </div>
                              </div>
                            </div>

                            <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">สถานะ</label>
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
                            <Link to={ {pathname: `/usermanagement`} }><button type="button" className="btn btn-info">กลับ</button></Link>
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
  
  export default UserUpdate;