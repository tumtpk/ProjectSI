import React, { Component } from "react";
import MainLayout from "../../components/main-layout";
import CommonApi from "../../api/common-api"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class UserDetailAdmin extends Component { 

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
            role: "",
            commanderID: "",
            roleList: [],
            commanderList: [],
            status: "",
            titleList: [],
            titleNameID:"",
            personalID2: false,
            commanderID2: false,
        }
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

      }

      componentWillMount() {
        let userID = this.props.location.query.userID;
        this.apiGetUset(userID);
        CommonApi.instance.post('usertype/search', {
            status: 1
        })
        .then(response => {
            this.setState({roleList: response.data}); 
        });

        CommonApi.instance.get('user/getuserCommander', {

        })
        .then(response => {
            this.setState({commanderList: response.data}); 
        });
        CommonApi.instance.post('user/titleName', {
            status: 2
        })
        .then(response => {
            this.setState({titleList: response.data}); 
        });


      }

      apiGetUset(userID){
        CommonApi.instance.get('/user/getuser/'+userID)
        .then(response => {
            let responseData = response.data;
            this.setState(
              {
                titleNameID: responseData.titleNameID,
                personalID : responseData.personalID,
                firstname: responseData.firstname,
                lastname: responseData.lastname,
                nickname: responseData.nickname,
                userTypeID: responseData.userTypeID,
                commanderID: responseData.commanderID,
                email: responseData.email,
                status: responseData.status,
                titleName1: responseData.titleName1

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

        CommonApi.instance.post('/user/create', this.state)
        .then(response => {
            if(response.status == 200){
                this.setState({redirect: true});
            }
        });
      }

    render() {
      console.log(this.state)
      const { redirect } = this.state;

      if (redirect) {
        return <Redirect to='/usermanagementadmin'/>;
      }



    console.log(this.state.personalID2)
      let roleList = this.state.roleList;
      let commanderList = this.state.commanderList;
      let titleList = this.state.titleList;
      return (
        <section id="main-content">
          <section className="wrapper">

            <div className="row"> 
                <div className="col-md-12">
                    <h3><i className="fa fa-angle-right"></i> ดูรายละเอียดผู้ใช้งาน</h3>
                </div>
            </div>

            <div className="row mt">
              <div className="col-lg-12">
                <div className="form-panel">
                    <h4 className="mb"><i className="fa fa-angle-right"></i> รายละเอียดผู้ใช้งาน</h4>
                    <form className="form-horizontal style-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                                <label className="col-sm-2 col-sm-2 control-label">บทบาท </label>
                                <div className="col-sm-5">
                                    <div className="btn-group">
                                        <select className="form-control" name="userTypeID" value={this.state.userTypeID} onChange={this.handleChange} disabled>
                                            <option value="0">-- เลือกบทบาท --</option>
                                            {roleList.map((role, index) => (
                                        <option value={role.UserTypeId}>{role.UserTypeName}</option>
                                        ))}
                                        </select>
                                        <span id="userTypeID" className="error-message"></span>
                                    </div>
                                </div>
                            </div>

                        <div className={ this.state.userTypeID == 2 || this.state.userTypeID == 3 || this.state.userTypeID == 4 ? "form-group hidden":"form-group show" } >
                              <label className="col-sm-2 col-sm-2 control-label">รหัสประจำตัว </label>
                              <div className="col-sm-6">
                                <div className="btn-group">
                                    <input type="text" maxLength={8} className="form-control" name="personalID" value={this.state.personalID} onChange={this.handleChange} placeholder="60xxxxxx" disabled/>
                                </div>
                                <label className="error-message">&nbsp;&nbsp; * กรอกรหัสประจำตัวกรณีเป็น<u>นักศึกษา</u> </label>
                              </div>
                        </div>
                        <div className="form-group">
                        <label className="col-sm-2 col-sm-2 control-label">คำนำหน้าชื่อ <span className="error-message">*</span></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                        <div className="btn-group">
                                        <select className="form-control" name="titleNameID" value={this.state.titleNameID} onChange={this.handleChange} disabled>
                                            <option value="0">-- เลือกคำนำหน้าชื่อ --</option>
                                            {titleList.map((title, index) => (
                                        <option value={title.titleNameID}>{title.titleName1}</option>
                                        ))}
                                        </select>
                                        <span id="titleNameID" className="error-message"></span>
                                    </div>
                            <div className="form-group"></div>
                            <label className="col-sm-2 col-sm-2 control-label">ชื่อ <span className="error-message">*</span></label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="firstname" value={this.state.firstname} onChange={this.handleChange} disabled/>
                                <span id="firstname" className="error-message"></span>
                            </div>
                            <label className="col-sm-1 col-sm-1 control-label">นามสกุล <span className="error-message">*</span></label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="lastname" value={this.state.lastname} onChange={this.handleChange} disabled/>
                                <span id="lastname" className="error-message"></span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 col-sm-2 control-label">อีเมล์ <span className="error-message">*</span></label>
                            <div className="col-sm-4">
                                <input type="email" className="form-control" name="email"  value={this.state.email} onChange={this.handleChange} disabled/>
                                <span id="email" className="error-message"></span>
                            </div>
                        </div>
                        
                            <div className={ this.state.userTypeID == 3 || this.state.userTypeID == 4 ? "form-group hidden":"form-group show" }>
                              <label className="col-sm-2 col-sm-2 control-label">ผู้บังคับบัญชา / <br></br>อาจารย์ที่ปรึกษาทางวิชาการ</label>
                              <div className="col-sm-5">
                                <div className="btn-group">
                                    <select className="form-control" name="commanderID" value={this.state.commanderID} onChange={this.handleChange} disabled>
                                    <option value="0">-- เลือกผู้บังคับบัญชา --</option>
                                            {commanderList.map((commander, index) => (
                                        <option value={commander.userID}>{commander.firstname} {commander.lastname}</option>
                                        ))}
                                    </select>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                            <Link to={ {pathname: `/usermanagementadmin`} }><button type="button" className="btn btn-info">กลับ</button></Link>
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
  
  export default UserDetailAdmin;