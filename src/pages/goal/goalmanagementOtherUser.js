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
import moment from "moment";

const initialState = {
  id: null,
  goalName: null,
  description: null,
  startDate: null,
  endDate: null,
  categoryID: 0,
  circleID: 0,
  checklists: [{value: null}],
  checklistProgresses: [{value: null}],
  dataSearch: null,
  number: 1,
  circleList: [],
  categoryList: [],
  circleType: null,
  status: "รอดำเนินการ",
  userID: null,
  startDate2: null,
  status2:null,
  dataSearch: [],
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
        CommonApi.instance.post('/goal/searchbyCommanderStudent', {
        })
        .then(response => {
            this.setState({dataSearch: response.data});
        });
        CommonApi.instance.post('/circle/search', {
          status: 1
      })
      .then(response => {
          this.setState({circleList: response.data});
          
      });
      CommonApi.instance.post('/category/search', {
          status: 1
      })
      .then(response => {
          this.setState({categoryList: response.data});
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
        this.handleSearch();
      }

    handleSearch(){
        // CommonApi.instance.defaults.headers.common['Authorization'] = 'Bearer tGOL83hqWSlBZAXBxonr3sN_OThf1YGQGMoPLrb1lscOW-LeyC2JImp-Chd_udagbPiosPb-6nzGU_lF1JPr2VXoKn0HTJ4bEvP6-yBkQrkfRGKz62H69QXJKIhJn9x2hGi--etIc9RVO-dTl5wu_w03oovndT8EN2BVm8Mda9p-k03g5EKt4KSw2qcEqnj-JGwSW0_23SK2Yc6fjOhIjMoqyvPMpPtzlBqb_5-LTyKqReshbvVtKPWoXNf2ld71IxYLdkbpwLWX2kd30k7b3FdEM8XgEVBSKri9ert_DgVoEBl6g1PO8PEgIiofwqYw1L8yPDQrjpsz-FoELUdVZl9uMEoSIGA7EibdHX4Ltsqm2cB62C3nM7eUaphtRwH7RZ-QHMwXlEfiAB86BMzo0OxvK7Q4j_5atJOUg_0ZGr0Eb5yU2CHjqEjrh8zztS5W_g9nvR5Ed6HEjp5O-HfwDs3-t730YVhcvCyCoHXnhR4';
              CommonApi.instance.post('/goal/searchbyCommanderStudent', {
              goalName: this.state.goalName,
              categoryID: this.state.categoryID,
              circleType: this.state.circleType,
              //status: this.state.status
            }) 
            .then(response => {
                this.setState({dataSearch: response.data});
            });
            CommonApi.instance.post('/circle/search', {
              status: 1
            })
            .then(response => {
              this.setState({circleList: response.data});
              
            });
            CommonApi.instance.post('/category/search', {
              status: 1
            })
            .then(response => {
              this.setState({categoryList: response.data});
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
      let today = new Date();
      this.state.number = 0
      return _.map(this.state.dataSearch, data => {
        this.state.number = this.state.number+1
        let status = ""
        let startDate = new Date(data.startDate)
        if (startDate > today){
          status = "รอดำเนินการ"
        }
        else{
          status = "อยู่ระหว่างการดำเนินการ"
        }
        let status2 = ""
        let startDate2 = new Date(data.startDate2)
        if (startDate2 > today){
          status2 = "รอดำเนินการ"
        }
        else{
          status2 = "อยู่ระหว่างการดำเนินการ"
        }
        console.log(data.startDate)
        console.log(status)
        return (
          <tr>
            <td>{ this.state.number}</td>
            <td>{ data.goalName }</td>
            <td>{ data.categoryName }</td>
            <td>{ (data.circleType == 1) ? "รอบการดำเนินการตามปฎิทินการศึกษา" : "รอบการดำเนินงานกำหนดเอง" }</td>
            <td>{ (data.circleType == 1) ? <span className="badge bg-success" data-placement="bottom" title={data.circleName +" "+"วันเริ่มต้น: "+ moment(new Date(data.startDate2)).format('DD/MM/YYYY') }>{status2}</span> : <span className="badge bg-success" data-placement="bottom" title={"วันเริ่มต้น: "+ moment(new Date(data.startDate)).format('DD/MM/YYYY')}>{status}</span>}</td>
            <td> 
              <Link to={ {pathname: `/goal/view`, query: {id: data.id,goalName:data.goalName,description:data.description,categoryID:data.categoryID,categoryName:data.categoryName,circleID:data.circleID,circleName:data.circleName,startDate: moment(new Date(data.startDate)).format('DD/MM/YYYY'),endDate: moment(new Date(data.endDate)).format('DD/MM/YYYY'),circleType:data.circleType}} }><button className="btn btn-success btn-xs" data-placement="bottom" title="ดูรายละเอียด"><i className="fa fa-eye"></i></button></Link>
              <Link to={ {pathname: `/goal/update`, query: {id: data.id,goalName:data.goalName,description:data.description,categoryID:data.categoryID,categoryName:data.categoryName,circleID:data.circleID,circleName:data.circleName,startDate: moment(new Date(data.startDate)).format('YYYY-MM-DD'),endDate: moment(new Date(data.endDate)).format('YYYY-MM-DD'),circleType:data.circleType}} }><button className="btn btn-primary btn-xs" data-placement="bottom" title="แก้ไข"><i className="fa fa-edit"></i></button></Link>
              <button className="btn btn-danger btn-xs"  data-toggle="modal" data-target={"#"+data.goalName}><i className="fa fa-trash-o " data-placement="bottom" title="ลบ"></i></button>
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
                                          <button type="button" className="btn btn-success"  data-dismiss="modal" onClick={this.handleDelete(data.id)}>ตกลง</button>
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

    renderFromSearch(){
      let circleList = this.state.circleList;
      let categoryList = this.state.categoryList;
      if (this.state.dataSearch.length > 0){
      return (
        <div className="row mt">
              <div className="col-lg-12">

                      <div className="content-panel">
                          <h4><i className="fa fa-angle-right"></i> รายการเป้าหมายนักศึกษาในที่ปรึกษา</h4>
                          <hr />
                          <table className="table table-striped table-advance table-hover">
                            <thead>
                                <tr>
                                  <th> ลำดับ </th>
                                  <th> ชื่อเป้าหมาย</th>
                                  <th> หมวดหมู่ของเป้าหมาย</th>
                                  <th> รอบการดำเนินงาน</th>
                                  <th> สถานะ</th>
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
    else{
      return (
        <div className="row mt">
              <div className="col-lg-12">
              <div className="content-panel">
              <hr/>
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
      var DateTimeField = require('react-bootstrap-datetimepicker');
      let circleList = this.state.circleList;
      let categoryList = this.state.categoryList;
      return (
        <section id="main-content">
          <section className="wrapper">
    			
            <div className="row"> 
                <div className="col-md-8">
                    <h3><i className="fa fa-angle-right"></i> การจัดการเป้าหมายนักศึกษาในที่ปรึกษา</h3>
                </div>
                <div className="col-md-4 text-right" style={{marginTop: '15px'}}>

                  <Link to={ {pathname: `/goal/createOtherUser`} }><button type="button" className="btn btn-primary" >เพิ่มเป้าหมายให้นักศึกษาในที่ปรึกษา</button></Link>
                </div>        
            </div>


            <div className="row">
                <div className="col-lg-12">
                  <div className="form-panel">           
                      <form className="form-horizontal style-form" id="search-goal" onSubmit={this.handleSubmit}>
                          <div className="form-group">
                          <br></br>
                              <label className="col-sm-2 col-sm-2 control-label">ชื่อเป้าหมาย</label>
                              <div className="col-sm-3">
                                  <input type="text" className="form-control" name="goalName" value={this.state.goalName} onChange={this.handleChange}/>
                              </div>
                              <label className="col-sm-2 col-sm-2 control-label">หมวดหมู่ของเป้าหมาย</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;          
                              <div className="btn-group">
                                <select className="form-control" name="categoryID" value={this.state.categoryID} onChange={this.handleChange} >
                                    <option value="0">-- เลือกหมวดหมู่ --</option>
                                    {categoryList.map((category, index) => (
                                        <option value={category.id}>{category.categoryName}</option>
                                    ))}
                                    </select>
                                </div>
                              <br></br><br></br><br></br>
                              <label className="col-sm-2 col-sm-2 control-label">รอบการดำเนินงาน</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;          
                              <div className="btn-group">
                                    <select className="form-control" name="circleType" value={this.state.circleType} onChange={this.handleChange}>
                                    <option value="0">-- เลือกรอบการดำเนินงาน --</option>
                                    <option value="1"> รอบการดำเนินการตามปฎิทินการศึกษา </option>
                                    <option value="2"> รอบการดำเนินงานกำหนดเอง </option>
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

            {this.renderFromSearch()}

          </section>
        </section>
      );
    }
  }
  
  export default GoalmanagementOtherUser ;