import React, { Component } from "react";
import MainLayout from "../../components/main-layout";
import CommonApi from "../../api/common-api"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class UserCreateTeacher extends Component { 
 
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            ConfirmPassword: "",
            personalID : null,
            firstname: "",
            lastname: "",
            userTypeID: 2,
            commanderID: 0,
            titleNameID:0,
            userID: "",
            status: 1,
            roleList: [],
            commanderList: [],
            redirect: false,
            duplicateMessage1: "",
            duplicateMessage2: "",
            duplicate: true,
            personalID2: false,
            commanderID2: false,
            titleList: []
        }

        // mixins: [Validation.FieldMixin]
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidate = this.handleValidate.bind(this);


      }
      
      componentWillMount() {
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
            
        })
        .then(response => {
            this.setState({titleList: response.data}); 
        });
    }

      handleChange(event) {
        console.log({OnIF: this.state.userTypeID})
        // if (this.state.userTypeID == 1 || this.state.userTypeID == "1" ){
        //     this.setState({personalID2: false})
        //     this.setState({commanderID2: false})
        // }
        // else{
        //     if (this.state.commanderID == 2 || this.state.userTypeID == "2"){
        //         this.setState({personalID2: true})
        //         this.setState({commanderID2: false})
        //     }
        //     else{
        //         if (this.state.userTypeID == 3 || this.state.userTypeID == "3"){
        //             this.setState({personalID2: true})
        //             this.setState({commanderID2: true})
        //         }
        //         else{
        //             if (this.state.userTypeID == 4 || this.state.userTypeID == "4"){
        //                 this.setState({personalID2: true})
        //                 this.setState({commanderID2: true})
        //             }
        //             else{
        //                 this.setState({personalID2: false})
        //                 this.setState({commanderID2: false})  
        //             }
        //         }
        //     }
        // }


       
        //console.log(this.state.personalID2)
        // if (this.userTypeID = 3){
        //     this.setState({personalID2: true})
        //     this.setState({commanderID2: true})

        // }
        // else{
        //     this.setState({personalID2: false})
        //     this.setState({commanderID2: false})
        // }
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
                CommonApi.instance.post('/user/isDuplicateEmail' ,this.state)
                .then(response =>{
                    if (response.status == 200 && response.data.result == true){
                        CommonApi.instance.post('/user/create',this.state)
                        .then(response =>{
                            if(response.status == 200 && response.data.result){
                                this.setState({redirect: true});
                            }
                            else{
                                this.handleValidate(response.data.message);
                            }

                        }
                    )

                    }
                    else{
                        this.setState({ duplicate: false, duplicateMessage1: "อีเมล์นี้ !", duplicateMessage2: "มีอยู่แล้วในระบบ."});
                    }
                });
                
            }




    
    handleValidate(messages){
        let require = ["firstname","lastname","email","userTypeID","titleNameID"];
        require.forEach(element => {
            document.getElementById(element).innerHTML = null;
        });
        //console.log(messages);
        messages.forEach(element => {
            document.getElementById(element.key).innerHTML = element.message;
        });
    }


    render() {
        console.log(this.state.userTypeID)
        console.log({hidenPernalID:this.state.personalID2})
        console.log({hidenCommander:this.state.commanderID2})

      const { redirect } = this.state;

      if (redirect) {
        return <Redirect to='/usermanagementteacher'/>;
      }
      let roleList = this.state.roleList;
      let commanderList = this.state.commanderList;
      let titleList = this.state.titleList;
      return (
        <section id="main-content">
          <section className="wrapper">

            <div className="row"> 
                <div className="col-md-12">
                    <h3><i className="fa fa-angle-right"></i> เพิ่มผู้ใช้งาน</h3>
                </div>
            </div>

            <div className="row mt">
              <div className="col-lg-12">
                <div className="form-panel">
                    <div className="alert alert-danger alert-dismissable" hidden={this.state.duplicate}>
						  <strong>{this.state.duplicateMessage1}</strong> {this.state.duplicateMessage2}
						</div>
                    <h4 className="mb"><i className="fa fa-angle-right"></i> กรอกข้อมูลผู้ใช้งาน</h4>
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
                                    <input type="text" maxLength={8} className="form-control" name="personalID" value={this.state.personalID} onChange={this.handleChange} placeholder="60xxxxxx"/>
                                </div>
                                <label className="error-message">&nbsp;&nbsp; * กรอกรหัสประจำตัวกรณีเป็น<u>นักศึกษา</u> </label>
                              </div>
                        </div>
                        <div className="form-group">
                        <label className="col-sm-2 col-sm-2 control-label">คำนำหน้าชื่อ <span className="error-message">*</span></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                        <div className="btn-group">
                                        <select className="form-control" name="titleNameID" value={this.state.titleNameID} onChange={this.handleChange}>
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
                                <input type="text" className="form-control" name="firstname" value={this.state.firstname} onChange={this.handleChange}/>
                                <span id="firstname" className="error-message"></span>
                            </div>
                            <label className="col-sm-1 col-sm-1 control-label">นามสกุล <span className="error-message">*</span></label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="lastname" value={this.state.lastname} onChange={this.handleChange}/>
                                <span id="lastname" className="error-message"></span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 col-sm-2 control-label">อีเมล์ <span className="error-message">*</span></label>
                            <div className="col-sm-4">
                                <input type="email" className="form-control" name="email"  value={this.state.email} onChange={this.handleChange}/>
                                <span id="email" className="error-message"></span>
                            </div>
                        </div>
                        
                            <div className={ this.state.userTypeID == 3 || this.state.userTypeID == 4 ? "form-group hidden":"form-group show" }>
                              <label className="col-sm-2 col-sm-2 control-label">ผู้บังคับบัญชา / <br></br>อาจารย์ที่ปรึกษาทางวิชาการ</label>
                              <div className="col-sm-5">
                                <div className="btn-group">
                                    <select className="form-control" name="commanderID" value={this.state.commanderID} onChange={this.handleChange}>
                                    <option value="0">-- เลือกผู้บังคับบัญชา --</option>
                                            {commanderList.map((commander, index) => (
                                        <option value={commander.userID}>{commander.firstname} {commander.lastname}</option>
                                        ))}
                                    </select>
                                </div>
                              </div>
                            </div>
                        <div className="text-right">
                            <button type="submit" className="btn btn-success">บันทึก</button>
                            <Link to={ {pathname: `/usermanagementteacher`} }><button type="button" className="btn btn-danger">ยกเลิก</button></Link>
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
  
  export default UserCreateTeacher;