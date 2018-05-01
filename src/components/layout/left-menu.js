import React, { Component } from "react";
import { Link } from 'react-router-dom';
import CommonApi from "../../api/common-api"
import cookies from 'react-cookies';

class LeftMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSession: null,
            role: null,
            firstname: null,
            lastname: null,
            titleName1: null,
            UserTypeName: null

        }
    }

    componentWillMount() {
        CommonApi.instance.get('/user/getusersession')
            .then(response => {
                this.setState({dataSession: response.data});
                cookies.save('role', response.data[0].UserTypeId);
                
                cookies.save('UserTypeName', response.data[0].UserTypeName);
                this.setState({UserTypeName: cookies.load('UserTypeName')});

                cookies.save('firstname', response.data[0].firstname);
                this.setState({firstname: cookies.load('firstname')});

                
                cookies.save('UserTypeId', response.data[0].UserTypeId);
                this.setState({UserTypeId: cookies.load('UserTypeId')});
                
                cookies.save('lastname', response.data[0].lastname);
                this.setState({lastname: cookies.load('lastname')});

                cookies.save('titleName', response.data[0].titleName);
                this.setState({titleName: cookies.load('titleName')});

                this.setState({role: cookies.load('role')});
                console.log(this.state);

            }
        );
    }
    

    render() {
        console.log(this.state);

                return (
                    
                    <aside>
                      <div id="sidebar"  className="nav-collapse ">
                        <ul className="sidebar-menu" id="nav-accordion">
                            <p className="centered" >
                                <img src="/theme/img/teacher.jpg" className="img-circle"  />
                            </p>
                            <h5 className="centered">{this.state.titleName+this.state.firstname+" "+this.state.lastname}</h5>
                            <h5 className="centered">{this.state.UserTypeName}</h5>
                              <li className="mt" style={this.state.role != 4 ? {} : { display: 'none' }}>
                                  <a className="active" href="">
                                      <i className="fa fa-home"></i>
                                      <span>หน้าแรก</span>
                                  </a>
                              </li>
            
                             <li className="sub-menu" style={this.state.role != 4 ? {} : { display: 'none' }}>
                                  <a href="javascript:;" >
                                      <i className="fa fa-tasks"></i>
                                      <span>เป้าหมายของฉัน</span>
                                  </a>
                                  <ul className="sub">
                                      <li><Link to={ {pathname: `/goalmanagement`} } activeClassName="active">การจัดการเป้าหมาย</Link></li>
                                      <li><Link to={ {pathname: '/goal/progressme'} } activeClassName= "active">รายงานความคืบหน้าเป้าหมาย</Link></li>
                                      <li><Link to={ {pathname: '/goal/goalchartme'}} activeClassName="active">ความสำเร็จเป้าหมายของฉัน</Link></li>
                                  </ul>
                              </li>

                            <li className="sub-menu" style={this.state.role != 4 && this.state.role != 1 ? {}: { display: 'none' }}>
                                  <a href="javascript:;" >
                                      <i className="fa fa-ge"></i>
                                      <span>มอบหมายให้ผู้ใต้บังคับบัญชา</span>
                                  </a>
                                  <ul className="sub">
                                      <li><Link to={ {pathname: `/goalmanagementOtherUser`} } activeClassName="active">จัดการเป้าหมายผู้ใต้บังคับบัญชา</Link></li>
                                      <li><Link to={ {pathname: '/goalstudentsadvisorychart'}} activeClassName="active">ความสำเร็จของเป้าหมาย</Link></li>
                                  </ul>
                              </li>

            
                              <li className="sub-menu" style={this.state.role != 4 ? {} : { display: 'none' }}>
                                <a href="javascript:;">
                                    <i className="fa fa-book"></i>
                                    <span>ทบทวนประสิทธิภาพการทำงาน</span>
                                </a>
                                <ul className="sub">
                                      <li><Link to={ {pathname: `/reviewmanagement`} } activeClassName="active">การจัดการทบทวนประสิทธิภาพ</Link></li>
                                      <li><Link to={ {pathname: `/reviewmanagement`} } activeClassName="active">ตอบแบบประเมิน</Link></li>
                                      <li><Link to={ {pathname: `/reviewmanagement`} } activeClassName="active">ผลการประเมิน</Link></li>
                                  </ul>
                            </li>

                            <br></br>
                            
                                <li className="sub-menu" style={this.state.role == 4 ? {} : { display: 'none' }}>
                                    <a href="javascript:;"  >
                                        <i className="fa fa-cogs"></i>
                                        <span>Administration</span>
                                    </a>
                                    <ul className="sub">
                                        <li><Link to={ {pathname: `/usermanagement`} } activeClassName="active">การจัดการผู้ใช้งาน</Link></li>
                                        <li><Link to={ {pathname: `/circlemanagement`} } activeClassName="active">การจัดการรอบดำเนินงาน</Link></li>
                                        <li><Link to={ {pathname: `/categorymanagement`} } activeClassName="active">การจัดการหมวดหมู่</Link></li>
                                        <li><Link to={ {pathname: `/evaluationmanagement`} } activeClassName="active">การจัดการแบบประเมิน</Link></li>
                                    </ul>
                                </li>
                      
                        </ul>
                      </div>
                    </aside>
       );

    }
  }
  
  export default LeftMenu;