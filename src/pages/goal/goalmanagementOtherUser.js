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

import ProgressBar from "bootstrap-progress-bar";
import DateTimeField from "react-bootstrap-datetimepicker";

const initialState = {
  id: null,
  goalName: "",
  description: "",
  startDate: "",
  endDate: "",
  categoryID: 0,
  circleID: 0,
  checklists: [{value: null}],
  dataSearch: null,
  number: 1
};

class GoalmanagementOtherUser extends Component { 

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
        CommonApi.instance.post('/goal/search', {
              id: this.state.id,
              goalName: this.state.goalName,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              //status: this.state.status
        })
        .then(response => {
            this.setState({dataSearch: response.data});
        });



      }

      handleSubmit(event) {
        this.handleSearch();
        event.preventDefault();
      }

      handleDelete = (id) => (evt) => {
        CommonApi.instance.get('/goal/delete/'+id) 
        .then(response => {
          this.handleSearch();
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

      handleClear(event){
        document.getElementById("search-goal").reset();
        this.setState(initialState);
      }

    handleSearch(){
        // CommonApi.instance.defaults.headers.common['Authorization'] = 'Bearer tGOL83hqWSlBZAXBxonr3sN_OThf1YGQGMoPLrb1lscOW-LeyC2JImp-Chd_udagbPiosPb-6nzGU_lF1JPr2VXoKn0HTJ4bEvP6-yBkQrkfRGKz62H69QXJKIhJn9x2hGi--etIc9RVO-dTl5wu_w03oovndT8EN2BVm8Mda9p-k03g5EKt4KSw2qcEqnj-JGwSW0_23SK2Yc6fjOhIjMoqyvPMpPtzlBqb_5-LTyKqReshbvVtKPWoXNf2ld71IxYLdkbpwLWX2kd30k7b3FdEM8XgEVBSKri9ert_DgVoEBl6g1PO8PEgIiofwqYw1L8yPDQrjpsz-FoELUdVZl9uMEoSIGA7EibdHX4Ltsqm2cB62C3nM7eUaphtRwH7RZ-QHMwXlEfiAB86BMzo0OxvK7Q4j_5atJOUg_0ZGr0Eb5yU2CHjqEjrh8zztS5W_g9nvR5Ed6HEjp5O-HfwDs3-t730YVhcvCyCoHXnhR4';
              CommonApi.instance.post('/goal/search', {
                id: this.state.id,
              goalName: this.state.goalName,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              //status: this.state.status
        })
        .then(response => {
            this.setState({dataSearch: response.data});
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

    renderTable(){
      this.state.number = 0
      return _.map(this.state.dataSearch, data => {
        this.state.number = this.state.number+1
        return (
          <tr>
            <td>{ this.state.number}</td>
            <td>{ data.goalName }</td>
            <td>{ data.startDate }</td>
            <td>{ data.endDate }</td>
            <td>
              <button className="btn btn-warning btn-xs"><i className="fa fa-tasks" data-toggle="modal" data-target={"#"+data.id}></i></button>
              <div id={data.id} className="modal fade" role="dialog">
                                        <div className="modal-dialog">
                                          <div className="modal-content">
                                          <div className="modal-header">
                                          <button type="button" className="close" data-dismiss="modal">&times;</button>
                                          <h4 className="modal-title">ปรับปรุงความคืบหน้ารายการตรวจสอบ</h4>
                                          </div>
                                          <div className="modal-body">
                                          <ProgressBar width="50%" message="50%"/>
                                       
	                	                        <div className="panel-heading">
	                                            <div className="pull-left">
                                              <h5><i className="fa fa-tasks"></i> รายการตรวจสอบ</h5></div>
	                 	                      </div>
				  	                            	<div className="custom-check goleft mt">
				                                 <table id="todo" className="table table-hover custom-check">
				                                <tbody>
				                                <tr>
				            		                <td>
				                                    <span className="check"><input type="checkbox" className="checked" /></span> เอกสารผู้ใช้งานระบบ 
								                      	</td>
                                        </tr>
                                        <tr>
                                        <td>
				                                    <span className="check"><input type="checkbox" className="checked" /></span> เอกสารระบบ 
								                      
                                      	</td>
				                               </tr>
				                              </tbody>
				                              </table>

						                          </div>
					                     
                                          </div>
                                          <div className="modal-footer">
                                          <button type="button" className="btn btn-default"  data-dismiss="modal" onClick={this.handleDelete()}>ตกลง</button>
                                          <button type="button" className="btn btn-default" data-dismiss="modal">ยกเลิก</button>
                                          </div>
                                          </div>
                                         </div>
                                        </div>
              <Link to={ {pathname: `/goal/view`, query: {id: data.id}} }><button className="btn btn-success btn-xs"><i className="fa fa-eye"></i></button></Link>
              <Link to={ {pathname: `/goal/update`, query: {id: data.id}} }><button className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></button></Link>
              <button className="btn btn-danger btn-xs" ><i className="fa fa-trash-o " data-toggle="modal" data-target={"#"+data.goalName}></i></button>
                                      <div id={data.goalName} className="modal fade" role="dialog">
                                        <div className="modal-dialog">
                                          <div className="modal-content">
                                          <div className="modal-header">
                                          <button type="button" className="close" data-dismiss="modal">&times;</button>
                                          <h4 className="modal-title">ลบเป้าหมาย</h4>
                                          </div>
                                          <div className="modal-body">
                                          <p>{data.goalName}  จะถูกลบอย่างถาวร ยืนยันเพื่อทำการลบ</p>
                                          </div>
                                          <div className="modal-footer">
                                          <button type="button" className="btn btn-default"  data-dismiss="modal" onClick={this.handleDelete(data.id)}>ตกลง</button>
                                          <button type="button" className="btn btn-default" data-dismiss="modal">ยกเลิก</button>
                                          </div>
                                          </div>
                                         </div>
                                        </div>
          </td>
          </tr>
        );
      });
  
    }

    renderFromSearch(){
      return (
        <div className="row mt">
              <div className="col-lg-12">
                      <div className="content-panel">
                          <h4><i className="fa fa-angle-right"></i> รายการเป้าหมาย</h4>
                          <hr />
                          <table className="table table-striped table-advance table-hover">
                            <thead>
                                <tr>
                                  <th> ลำดับ </th>
                                  <th> ชื่อเป้าหมาย</th>
                                  <th> วันเริ่มต้น</th>
                                  <th> วันสิ้นสุด</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                { this.renderTable() }
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
      );
    }

    
    render() {
      var DateTimeField = require('react-bootstrap-datetimepicker');
      return (
        <section id="main-content">
          <section className="wrapper">
          <br></br>
						<div className="btn-group btn-group-justified">
						  <div className="btn-group">
              <Link to={ {pathname: `/goalmanagement`} }><button type="button" className="btn btn-default btn-lg btn-block" >เป้าหมายของฉัน</button></Link>
						  </div>
						  <div className="btn-group">
              <Link to={ {pathname: `/goalmanagementOtherUser`} }><button type="button" className="btn btn-warning btn-lg btn-block">เป้าหมายผู้ใต้บังคับบัญชา</button></Link>
						  </div>
						  <div className="btn-group">
						  <Link to={ {pathname: '/reportallgoal'}}><button type="button" className="btn btn-default btn-lg btn-block">รายงานความสำเร็จ</button></Link>
						  </div>
						</div>  
      				
      			
            <div className="row"> 
                <div className="col-md-8">
                    <h3><i className="fa fa-angle-right"></i> การจัดการเป้าหมายผู้ใต้บังคับบัญชา</h3>
                </div>
                <div className="col-md-4 text-right" style={{marginTop: '15px'}}>

                  <Link to={ {pathname: `/goal/createOtherUser`} }><button type="button" className="btn btn-primary" >เพิ่มเป้าหมายให้ผู้ใต้บังคับบัญชา</button></Link>
                </div>        
            </div>


            <div className="row">
                <div className="col-lg-12">
                  <div className="form-panel">           
                      <form className="form-horizontal style-form" id="search-user" onSubmit={this.handleSubmit}>
                          <div className="form-group">
                            <br></br>
                              <label className="col-sm-2 col-sm-2 control-label">ชื่อเป้าหมาย</label>
                              <div className="col-sm-3">
                                  <input type="text" className="form-control" name="goalName" value={this.state.goalName} onChange={this.handleChange}/>
                              </div>
                              <label className="col-sm-2 col-sm-2 control-label">สถานะ</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;          
                              <div className="btn-group">
                                <select className="form-control" name="status" value={this.state.username} onChange={this.handleChange}>
                                    <option value="0">--เลือกสถานะ--</option>
                                    <option value="1">Open</option>
                                    <option value="2">In Progrees</option>
                                    <option value="3">Achieved</option>
                                </select>
                                
                                </div>
                              <br></br><br></br><br></br>
                              <label className="col-sm-2 col-sm-2 control-label">วันเริ่มต้นเป้าหมาย</label> 
                              <div className="col-sm-3">
                              <div className='input-group date' id='daterangepicker'>

                             <DateTimeField />
                            </div>
                            <span id="startDate" className="error-message"></span>
                            </div>
                            <label className="col-sm-2 col-sm-2 control-label">วันสิ้นสุดเป้าหมาย</label>
                              <div className="col-sm-3">
                              <div className='input-group date' id='daterangepicker'>
                                <input type='text' className="form-control" name="endDate" value={this.state.endDate} onChange={this.handleChange} />
                                <span className="input-group-addon">
                                <span className="glyphicon glyphicon-calendar"></span>
                             </span>
                            </div>
                            <span id="endDate" className="error-message"></span>
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

            {this.renderFromSearch()}

          </section>
        </section>
      );
    }
  }
  
  export default GoalmanagementOtherUser ;