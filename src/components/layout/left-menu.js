import React, { Component } from "react";

class LeftMenu extends Component {
    render() {
      return (
        <aside>
          <div id="sidebar"  className="nav-collapse ">
            <ul className="sidebar-menu" id="nav-accordion">
                <p className="centered">
                  <a href="profile.html">
                    <img src="theme/img/ui-sam.jpg" className="img-circle"  />
                  </a>
                </p>
                <h5 className="centered">ผู้ดูแลระบบ</h5>

                  <li className="mt">
                      <a className="active" href="index.html">
                          <i className="fa fa-home"></i>
                          <span>หน้าแรก</span>
                      </a>
                  </li>

                  <li className="sub-menu">
                    <a href="javascript:;">
                        <i className="fa fa-tasks"></i>
                        <span>เป้าหมายของฉัน</span>
                    </a>
                  </li>
                  <li className="sub-menu">
                    <a href="javascript:;">
                        <i className="fa fa-book"></i>
                        <span>ทบทวนประสิทธิภาพการทำงาน</span>
                    </a>
                </li>
                <li className="sub-menu">
                    <a href="javascript:;">
                        <i className="fa fa-refresh"></i>
                        <span>ข้อเสนอแนะ 360 องศาของฉัน</span>
                    </a>
                </li>
                <br></br>
                  <li className="sub-menu">
                      <a href="javascript:;" >
                          <i className="fa fa-cogs"></i>
                          <span>Administration</span>
                      </a>
                      <ul className="sub">
                          <li><a  href="calendar.html">การจัดการผู้ใช้งาน</a></li>
                          <li><a  href="gallery.html">การจัดการรอบการปรับปรุง</a></li>
                          <li><a  href="todo_list.html">การจัดการหมวดหมู่</a></li>
                          <li><a  href="todo_list.html">การจัดการแบบประเมิน</a></li>
                      </ul>
                  </li>
            </ul>
          </div>
        </aside>
      );
    }
  }
  
  export default LeftMenu;