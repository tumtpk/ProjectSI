import React, { Component } from "react";
import { Link } from 'react-router-dom';
import CommonApi from "../../api/common-api"
import cookies from 'react-cookies';

class LeftMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSession: null
        }
    }

    componentWillMount() {
        CommonApi.instance.get('/user/getusersession')
            .then(response => {
                this.setState({dataSession: response.data});
                cookies.save('role', response.data[0].UserTypeId);console.log(response.data[0].UserTypeId);
            }
        );
    }

    componentDidMount() {
        CommonApi.instance.get('/user/getusersession')
            .then(response => {
                this.setState({dataSession: response.data});
                cookies.save('role', response.data[0].UserTypeId);console.log(response.data[0].UserTypeId);
            }
        );
    }
    render() {

        let role = cookies.load('role');
        
                return (
                    <aside>
                      <div id="sidebar"  className="nav-collapse ">
                        <ul className="sidebar-menu" id="nav-accordion">
                            <p className="centered">
                              <a href="profile.html">
                                <img src="/theme/img/ui-sam.jpg" className="img-circle"  />
                              </a>
                            </p>
                            <h5 className="centered">ผู้ดูแลระบบ</h5>
            
                              <li className="mt">
                                  <a className="active" href="index.html">
                                      <i className="fa fa-home"></i>
                                      <span>หน้าแรก</span>
                                  </a>
                              </li>
            
                             <li className="sub-menu" style={role != 4 ? {} : { display: 'none' }}>
                                  <a href="javascript:;" >
                                      <i className="fa fa-tasks"></i>
                                      <span>เป้าหมายของฉัน</span>
                                  </a>
                                  <ul className="sub">
                                      <li><Link to={ {pathname: `/goalmanagement`} } activeClassName="active">การจัดการเป้าหมาย</Link></li>
                                  </ul>
                              </li>
            
                              <li className="sub-menu" style={role != 4 ? {} : { display: 'none' }}>
                                <a href="javascript:;">
                                    <i className="fa fa-book"></i>
                                    <span>ทบทวนประสิทธิภาพการทำงาน</span>
                                </a>
                            </li>
                            <li className="sub-menu" style={role != 4 ? {} : { display: 'none' }}>
                                <a href="javascript:;">
                                    <i className="fa fa-refresh"></i>
                                    <span>ข้อเสนอแนะ 360 องศาของฉัน</span>
                                </a>
                            </li>
                            <br></br>
                            
                                <li className="sub-menu" style={role == 4 ? {} : { display: 'none' }}>
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