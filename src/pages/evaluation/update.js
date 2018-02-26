import React, { Component } from "react";
import MainLayout from "../../components/main-layout";
import CommonApi from "../../api/common-api"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class EvaluationUpdate extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            ConfirmPassword: "",
            personalID : "",
            firstname: "",
            lastname: "",
            nickname: "",
            role: 0,
            commander: "",
            userID: null,
            status: 1,
            redirect: false,
        }
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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
                role: responseData.role,
                commander: responseData.commander,
                email: responseData.email,
                // status: responseData.status
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
      }

      handleSubmit(event) {
        event.preventDefault();

        CommonApi.instance.post('/user/update', this.state)
        .then(response => {
            if(response.status == 200){
                this.setState({redirect: true});
            }
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
                              <label className="col-sm-2 col-sm-2 control-label">รหัสประจำตัว</label>
                              <div className="col-sm-3">
                                    <input type="text" className="form-control" name="personalID" value={this.state.personalID} onChange={this.handleChange} />
                              </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 col-sm-2 control-label">ชื่อ</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="firstname" value={this.state.firstname} onChange={this.handleChange}/>
                            </div>
                            <label className="col-sm-1 col-sm-1 control-label">นามสกุล</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="lastname" value={this.state.lastname} onChange={this.handleChange}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-2 col-sm-2 control-label">อีเมล์</label>
                            <div className="col-sm-4">
                                <input type="email" className="form-control" name="email"  value={this.state.email} onChange={this.handleChange} disabled/>
                            </div>
                        </div>

                            <div className="form-group">
                                <label className="col-sm-2 col-sm-2 control-label">บทบาท</label>
                                <div className="col-sm-5">
                                    <div className="btn-group">
                                        <select className="form-control" name="role" value={this.state.role} onChange={this.handleChange}>
                                            <option value="0">เลือกบทบาท</option>
                                            <option value="1">นักศึกษา</option>
                                            <option value="2">อาจารย์</option>
                                            <option value="3">ประธานหลักสูตร</option>
                                            <option value="4">ผู้ดูแลระบบ</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        
                            <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">ผู้บังคับบัญชา</label>
                              <div className="col-sm-5">
                                <div className="btn-group">

                                    <select className="form-control" name="commander" value={this.state.commander} onChange={this.handleChange}>
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
  
  export default EvaluationUpdate;