import React, { Component } from "react";
import MainLayout from "../../components/main-layout";

class Update extends Component { 
    render() {
      return (
        <section id="main-content">
          <section className="wrapper">
          <h3><i className="fa fa-angle-right"></i> แก้ไขข้อมูลผู้ใช้งาน</h3>
            <div className="row mt">
              <div className="col-lg-12">
                  <div className="form-panel">
                      <h4 className="mb"><i className="fa fa-angle-right"></i> รายละเอียดผู้ใช้งาน</h4>
                      <form className="form-horizontal style-form" method="get">
                          <div className="form-group">
                              <label className="col-sm-1 col-sm-1 control-label">ชื่อ</label>
                              <div className="col-sm-5">
                                  <input type="text" className="form-control" value="รุจิภาส" />
                              </div>
                              <label className="col-sm-1 col-sm-1 control-label">นามสกุล</label>
                              <div className="col-sm-5">
                                  <input type="text" className="form-control" value= "ปันทโมรา" />
                              </div>
                          </div>
                          <div className="form-group">
                              <label className="col-sm-1 col-sm-1 control-label">ชื่อเล่น</label>
                              <div className="col-sm-5">
                                  <input type="text" className="form-control" value="ฝ้าย" />
                              </div>
                              <label className="col-sm-1 col-sm-1 control-label">อีเมล์</label>
                              <div className="col-sm-5">
                                  <input type="email" className="form-control" id="exampleInputEmail2" value="faii.rujipat@gmail.com" />
                              </div>
                          </div>
                           <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">บทบาท</label>
                                <div className="col-sm-5">
                                <div className="btn-group">
                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">นักศึกษา
                                <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a href="#">นักศึกษา</a></li>
                                    <li><a href="#">อาจารย์</a></li>
                                    <li><a href="#">ประธานหลักสูตร</a></li>
                                    <li><a href="#">ผู้ดูแลระบบ</a></li>
                                    </ul>
                                </div>
                              </div>
                              </div>
                          <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">ผู้บังคับบัญชา</label>
                                <div className="col-sm-5">
                                <div className="btn-group">
                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">ผศ.เยาวเรศ  ศิริสถิตย์กุล 
                                <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a href="#">ผศ.เยาวเรศ ศิริสถิตย์กุล</a></li>
                                    <li><a href="#">ผศ.ดร.ฐิมาพร เพชรแก้ว</a></li>
                                    <li><a href="#">ผศ.อุหมาด หมัดอาด้ำ</a></li>
                                    <li><a href="#">ดร.กรัณรัตน์ ธรรมรักษ์</a></li>
                                    <li><a href="#">ดร.พุทธิพร ธนธรรมเมธี</a></li>
                                    </ul>
                                </div>
                              </div>

                          </div>
                      </form>
                      <div className="text-right">
                      <a href="usermanagement"><button type="button" className="btn btn-success">บันทึก</button></a>
                      <a href="usermanagement"><button type="button" className="btn btn-info">กลับ</button></a>
                      </div>
                  </div>
              </div>     
            </div>
          </section>
        </section>
      );
    }
  }
  
  export default Update;