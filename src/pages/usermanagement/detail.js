import React, { Component } from "react";
import MainLayout from "../../components/main-layout";

class Detail extends Component { 
    render() {
      return (
        <section id="main-content">
          <section className="wrapper">
          <h3><i className="fa fa-angle-right"></i> ดูรายละเอียดผู้ใช้งาน</h3>
            <div className="row mt">
              <div className="col-lg-12">
                  <div className="form-panel">
                      <h4 className="mb"><i class="fa fa-angle-right"></i> รายละเอียดผู้ใช้งาน</h4>
                      <form className="form-horizontal style-form" method="get">
                          <div className="form-group">
                              <label className="col-sm-1 col-sm-1 control-label">ชื่อ</label>
                              <div className="col-sm-5">
                                  <input type="text" className="form-control" placeholder="รุจิภาส" disabled />
                              </div>
                              <label className="col-sm-1 col-sm-1 control-label">นามสกุล</label>
                              <div className="col-sm-5">
                                  <input type="text" className="form-control" placeholder="ปันทโมรา" disabled />
                              </div>
                          </div>
                          <div className="form-group">
                              <label className="col-sm-1 col-sm-1 control-label">ชื่อเล่น</label>
                              <div className="col-sm-5">
                                  <input type="text" className="form-control" placeholder="ฝ้าย" disabled />
                              </div>
                              <label className="col-sm-1 col-sm-1 control-label">อีเมล์</label>
                              <div className="col-sm-5">
                                  <input type="email" className="form-control" id="exampleInputEmail2" placeholder="faii.rujipat@gmail.com" disabled />
                              </div>
                          </div>
                           <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">บทบาท</label>
                              <label className="col-sm-2 col-sm-2 control-label">นักศึกษา</label>
                           </div>
                          <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">ผู้บังคับบัญชา</label>
                              <label className="col-sm-2 col-sm-2 control-label">ผศ.เยาวเรศ ศิริสถิตย์กุล</label>
                          </div>
                      </form>
                      <div className="text-right">
                      <a href="update"><button type="button" className="btn btn-warning">แก้ไข</button></a>
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
  
  export default Detail;