import React, { Component } from "react";
import axios from "axios";
import CommonApi from "../../api/common-api"
import { Link } from 'react-router-dom';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

const initialState = {
  personalID: null,
  firstname: null,
  lastname: null,
  status: 0,
  email:null,
  userTypeID:null,
  dataSearch: null,
  studentList: [],
  teacherList: [],
  adminList: [],
  headList: [],
  number:1,
  commanderID:null,
  commanderList:[],
  titleList: [],
  titleName1: null
};

class Usermanagement3 extends Component { 

    constructor(props) {
        super(props);
        this.state = initialState;
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
      }

      componentWillMount() {
        CommonApi.instance.post('/user/search', {
          userTypeID: 4
        })
        .then(response => {
        this.setState({adminList: response.data});
        });

      }

      handleSubmit(event) {
        this.handleSearch();
        event.preventDefault();
      }
  
      handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
          [name]: value
        });
      }

      handleDelete = (userID) => (evt) => {
        CommonApi.instance.get('/user/delete/'+userID) 
        .then(response => {
          this.handleSearch();
        });
    }

      handleClear(event){
        document.getElementById("search-user").reset();
        this.setState(initialState);
        this.handleSearch();
      }

    handleSearch(){
        // CommonApi.instance.defaults.headers.common['Authorization'] = 'Bearer tGOL83hqWSlBZAXBxonr3sN_OThf1YGQGMoPLrb1lscOW-LeyC2JImp-Chd_udagbPiosPb-6nzGU_lF1JPr2VXoKn0HTJ4bEvP6-yBkQrkfRGKz62H69QXJKIhJn9x2hGi--etIc9RVO-dTl5wu_w03oovndT8EN2BVm8Mda9p-k03g5EKt4KSw2qcEqnj-JGwSW0_23SK2Yc6fjOhIjMoqyvPMpPtzlBqb_5-LTyKqReshbvVtKPWoXNf2ld71IxYLdkbpwLWX2kd30k7b3FdEM8XgEVBSKri9ert_DgVoEBl6g1PO8PEgIiofwqYw1L8yPDQrjpsz-FoELUdVZl9uMEoSIGA7EibdHX4Ltsqm2cB62C3nM7eUaphtRwH7RZ-QHMwXlEfiAB86BMzo0OxvK7Q4j_5atJOUg_0ZGr0Eb5yU2CHjqEjrh8zztS5W_g9nvR5Ed6HEjp5O-HfwDs3-t730YVhcvCyCoHXnhR4';

      CommonApi.instance.post('/user/search', {
        titleName1: this.state.titleName1,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        status: this.state.status,
        userTypeID: 4,
        commanderID: this.state.commanderID,
        titleNameID: this.state.titleNameID
      })
      .then(response => {
      this.setState({adminList: response.data});
      }); 

      
    }

    state = {
      isOpen: false
    };
     
    openModal = () => {
      this.setState({
        isOpen: true
      });
    };
     
    hideModal = () => {
      this.setState({
        isOpen: false
      });
    };


    renderTableHead(){
      this.state.number = 0
      return _.map(this.state.adminList, adminList => {
        this.state.number = this.state.number+1
        return (
          <tr>
            <td>{ this.state.number}</td>
            <td>{ adminList.titleName}{ adminList.firstname }</td>
            <td>{ adminList.lastname }</td>
            <td>{ adminList.email }</td>
            <td>{ (adminList.status == 1) ? "เปิดใช้งาน" : "ปิดใช้งาน" }</td>
            <td>
              <Link to={ {pathname: `/usermanagement/viewadmin`, query: {userID: adminList.userID}} }><button className="btn btn-success btn-xs" data-toggle="ดูรายละเอียด" data-placement="bottom" title="ดูรายละเอียด"><i className="fa fa-eye"></i></button></Link>
              <Link to={ {pathname: `/usermanagement/updateadmin`, query: {userID: adminList.userID}} }><button className="btn btn-primary btn-xs" data-toggle="แก้ไข" data-placement="bottom" title="แก้ไข"><i className="fa fa-edit"></i></button></Link>
              <button className="btn btn-danger btn-xs" data-toggle="ลบ" data-placement="bottom" title="ลบ"><i className="fa fa-trash-o " data-toggle="modal" data-target={"#"+adminList.userID}></i></button>
                                      <div id={adminList.userID} className="modal fade" role="dialog">
                                        <div className="modal-dialog">
                                          <div className="modal-content">
                                          <div className="modal-header">
                                          <button type="button" className="close" data-dismiss="modal">&times;</button>
                                          <h4 className="modal-title">ลบผู้ใช้งาน</h4>
                                          </div>
                                          <div className="modal-body">
                                          <p>{adminList.firstname}  {adminList.lastname} จะถูกลบอย่างถาวร ยืนยันเพื่อทำการลบ</p>
                                          </div>
                                          <div className="modal-footer">
                                          <button type="button" className="btn btn-success"  data-dismiss="modal" onClick={this.handleDelete(adminList.userID)}>ตกลง</button>
                                          <button type="button" className="btn btn-danger" data-dismiss="modal">ยกเลิก</button>
                                          </div>
                                          </div>
                                         </div>
                                        </div>
                                        
            </td>
          </tr>
        );
      });
  
    }

 
    renderFromSearchHead(){
      if (this.state.adminList.length > 0 )
      {
      return (
        <div className="row mt">
              <div className="col-lg-12">
              <div className="btn-group btn-group-justified">
						  <div className="btn-group">
              <Link to={ {pathname: `/usermanagementstudent`} }><button type="button" className="btn btn-default btn-lg btn-block" > นักศึกษา</button></Link>
						  </div>
						  <div className="btn-group">
              <Link to={ {pathname: `/usermanagementteacher`} }><button type="button" className="btn btn-default btn-lg btn-block"> อาจารย์</button></Link>
						  </div>
						  <div className="btn-group">
						  <Link to={ {pathname: '/usermanagementhead'}}><button type="button" className="btn btn-default btn-lg btn-block"> ประธานหลักสูตร</button></Link>
						  </div>
              <div className="btn-group">
						  <Link to={ {pathname: '/usermanagementadmin'}}><button type="button" className="btn btn-warning btn-lg btn-block"> ผู้ดูแลระบบ</button></Link>
						  </div>
						</div> 
                      <div className="content-panel">
                          <hr />
                          <table className="table table-striped table-advance table-hover">
                            <thead>
                                <tr>
                                  <th> ลำดับ</th>
                                  <th> ชื่อ</th>
                                  <th> นามสกุล</th>
                                  <th> ชื่อผู้ใช้</th>
                                  <th> สถานะ</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                { this.renderTableHead() }
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
      );
    }
    else{
      return (
        <div className="row mt">
              <div className="col-lg-12">
              <div className="btn-group btn-group-justified">
						  <div className="btn-group">
              <Link to={ {pathname: `/usermanagementstudent`} }><button type="button" className="btn btn-default btn-lg btn-block" > นักศึกษา</button></Link>
						  </div>
						  <div className="btn-group">
              <Link to={ {pathname: `/usermanagementteacher`} }><button type="button" className="btn btn-default btn-lg btn-block"> อาจารย์</button></Link>
						  </div>
						  <div className="btn-group">
						  <Link to={ {pathname: '/usermanagementhead'}}><button type="button" className="btn btn-default btn-lg btn-block"> ประธานหลักสูตร</button></Link>
						  </div>
              <div className="btn-group">
						  <Link to={ {pathname: '/usermanagementadmin'}}><button type="button" className="btn btn-warning btn-lg btn-block"> ผู้ดูแลระบบ</button></Link>
						  </div>
						</div> 
            <div className="content-panel">
                          <table className="table table-striped table-advance table-hover" >
                            <thead>
                                <tr>
                                  <th className="text-center"> ---- ไม่พบข้อมูล ----</th>
                                </tr>
                              </thead>
                          </table>
                      </div>
                  </div>
              </div>
      );
    }
  }

    render() {
      return (
        <section id="main-content">
          <section className="wrapper">

            <div className="row"> 
                <div className="col-md-8">
                    <h3><i className="fa fa-angle-right"></i> การจัดการผู้ใช้งาน</h3>
                </div>
                <div className="col-md-4 text-right" style={{marginTop: '15px'}}>
                <Link to={ {pathname: `/usermanagement/createadmin`} }><button type="button" className="btn btn-primary" >เพิ่มผู้ใช้งาน</button></Link>
                </div>
            </div>


            <div className="row">
                <div className="col-lg-12">
                  <div className="form-panel">
                  
                  
                      <form className="form-horizontal style-form" id="search-user" onSubmit={this.handleSubmit}>
                          <div className="form-group">
                            <br></br>
                              <label className="col-sm-1 col-sm-1 control-label">ชื่อ</label>
                              <div className="col-sm-3">
                                  <input type="text" className="form-control" name="firstname" value={this.state.username} onChange={this.handleChange}/>
                              </div>
                              <label className="col-sm-1 col-sm-1 control-label">นามสกุล</label>
                              <div className="col-sm-3">
                                  <input type="text" className="form-control" name="lastname" value={this.state.username} onChange={this.handleChange} /> 
                              </div>
                              <label className="col-sm-1 col-sm-1 control-label">สถานะ</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;          
                              <div className="btn-group">
                                <select className="form-control" name="status" value={this.state.username} onChange={this.handleChange}>
                                    <option value="0">เลือกสถานะ</option>
                                    <option value="1">เปิดใช้งาน</option>
                                    <option value="2">ปิดใช้งาน</option>
                                </select>
                                
                                </div>
                            </div>                
                            <div className="text-center">
                              <button type="submit" className="btn btn-round btn-primary" >ค้นหา</button>
                              <button type="button" className="btn btn-round btn-danger" onClick={this.handleClear}>ยกเลิก</button>
                            </div>                                                                                     
                      </form>

                  </div>
              </div>    
            </div>
            {this.renderFromSearchHead()}

          </section>
        </section>
      );
    }
  }
  
  export default Usermanagement3;