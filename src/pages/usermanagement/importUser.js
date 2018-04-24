import React, { Component } from "react";
import axios from "axios";
import CommonApi from "../../api/common-api"
import { Link } from 'react-router-dom';



class importUser extends Component { 

    render() {
      return (
        <section id="main-content">
          <section className="wrapper">
          
          <div class="content-panel">
          <br></br>
                      <h4><i class="fa fa-angle-right"></i>> ข้อมูลผู้ใช้งาน </h4><br></br>
                      <input type="file" className="form-control-file" id="attachFile" aria-describedby="fileHelp" name="attachFile"/>
                          <section id="unseen">
                            <table className="table table-bordered table-striped table-condensed">
                              <thead>
                              <tr>
                                  <th className="numeric"> รหัสประจำตัว</th>
                                  <th> คำนำหน้าชื่อ</th>
                                  <th> ชื่อ</th>
                                  <th> นามสกุล</th>
                                  <th> อีเมล์</th>
                                  <th> บทบาท</th>
                                  <th> ผู้บังคับบัญชา / อาจารย์ที่ปรึกษาทางวิชาการ</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                  <td className = "numeric">57144032</td>
                                  <td> นางสาว</td>
                                  <td> รุจิภาส</td>
                                  <td> ปันทโมรา</td>
                                  <td> rujipat@gmail.com</td>
                                  <td> นักศึกษา </td>
                                  <td> ดร.กรัณรัตน์ ธรรมรักษ์</td>
                              </tr>
                              <tr>
                                  <td className = "numeric">57119935</td>
                                  <td> นาย</td>
                                  <td> วิศิษฎ์ศักดิ์</td>
                                  <td> ชูกลิ่น</td>
                                  <td> Visitsak@gmail.com</td>
                                  <td> นักศึกษา </td>
                                  <td> ดร.กรัณรัตน์ ธรรมรักษ์</td>
                              </tr>
                              <tr>
                                  <td className = "numeric">57111460</td>
                                  <td> นาย</td>
                                  <td> ครรชิต</td>
                                  <td> แก้วเนื้ออ่อน</td>
                                  <td> Dictate2@gmail.com</td>
                                  <td> นักศึกษา </td>
                                  <td> ดร.กรัณรัตน์ ธรรมรักษ์</td>
                              </tr>
                              <tr>
                                  <td className = "numeric">57114712</td>
                                  <td> นาย</td>
                                  <td> ธัญญบุตร</td>
                                  <td> จันทร์ประสิทธิ์</td>
                                  <td> Thanyanson2@gmail.com</td>
                                  <td> นักศึกษา </td>
                                  <td> ดร.กรัณรัตน์ ธรรมรักษ์</td>
                              </tr>
                              </tbody>
                          </table>
                          </section>
                  </div>

          </section>
        </section>
      );
    }
  }
  
  export default importUser;