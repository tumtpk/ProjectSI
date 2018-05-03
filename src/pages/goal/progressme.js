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

class ProgressMe extends Component { 

    constructor(props) {
        super(props);
        this.state = {
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
          select: [],
          goalHandlerId:null,
        };
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        //this.handleProgress = this.handleProgress.bind(this);
        this.handleSaveProgress = this.handleSaveProgress.bind(this);
        //this.handlechangeProgress = this.handlechangeProgress.bind(this);
        this.selectedChecklists = new Set(); 
      }

      componentWillMount() {
        CommonApi.instance.post('/goal/searchbyself', {

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

      toggleCheckbox = (id,index)  => () => {
        if (this.selectedChecklists.has(id)) {
          this.selectedChecklists.delete(id);
          this.state.select[index] = false;
        } else {
          this.selectedChecklists.add(id);
          this.state.select[index] = true;
        }
        this.setState({select: this.state.select});
      }

      // handlechangeProgress = (clpId) => (evt) => {
      //   this.state.checklistProgresses.forEach( (checklistP,index) => {
      //     if(checklistP.clpId == clpId){
      //       if(checklist.checklistProgress1 == 1){
      //         checklist.checklistProgress1 = 2;
      //       }
      //       else{
      //         checklist.checklistProgress1 = 1;
      //       }
      //     }
      //     console.log(checklist);
      //   });
      // } 

      handleSaveProgress(event) {
        this.state.checklistProgresses = Array.from(this.selectedChecklists);
        console.log(this.state.checklistProgresses);
        const newChecklistProgresses = this.state.checklistProgresses.map((checklistProgress, sidx) => {
          return { ...checklistProgress, id: checklistProgress };
        });
        this.state.checklistProgresses = newChecklistProgresses;
        CommonApi.instance.post('/checklistprogress/saveProgress' ,this.state)
        .then(response => {
          if(response.status == 200 && response.data.result){
              this.setState({redirect: true});
          }else{
              console.log(response.data.message)
          }
        });
      }
      
      handleProgress = (id) => (evt) => {
        CommonApi.instance.get('/checklist/getchecklists/'+id)
        .then(response => {
          let responseData = response.data;
          this.state.checklists = responseData;
          this.state.checklists.forEach((data,index) => {
            if(this.state.goalHandlerId == null){
              this.state.goalHandlerID = data.goalHandlerID;
            }
            if(this.state.id == null){
              this.state.id = data.goalID;
            }
            if(data.checklistProgress1 == 2){
              this.state.select[index] = true;
              this.selectedChecklists.add(data.clpId);
            }
            else{
              this.state.select[index] = false;
            }
          });

          this.setState({checklists: response.data});
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
      CommonApi.instance.post('/goal/searchbyself', {
            goalName: this.state.goalName,
            categoryID: this.state.categoryID,
            circleType: this.state.circleType,

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

    renderTableChecklist(){

      return _.map(this.state.checklists,(data, index)  => {
        return (
          <tr>
            <td>
            <div className="checkbox">
                <label>
                    <input type="checkbox" checked={this.state.select[index]} onChange={this.toggleCheckbox(data.clpId,index)}/> {data.value}
                </label>
            </div>
            </td>
          </tr>
        );
      });
  
    }

    renderTable(){
      this.state.number = 0
      let today = new Date();
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
        return (
          <tr>
            <td>{ this.state.number}</td>
            <td>{ data.goalName }</td>
            <td>{ data.categoryName }</td>
            <td>{ (data.circleType == 1) ? "รอบการดำเนินการตามปฎิทินการศึกษา" : "รอบการดำเนินงานกำหนดเอง" }</td>
            <td><span className="badge bg-success" data-placement="bottom" title={"วันเริ่มต้น: "+ moment(new Date(data.startDate)).format('DD/MM/YYYY')}>{status}</span></td>
            <td>
              <button className="btn btn-warning btn-xs" data-toggle="modal" data-target="#modal"  data-placement="bottom" title="รายงานความคืบหน้ารายการตรวจสอบ" onClick={this.handleProgress(data.id)}><i className="fa fa-tasks" ></i></button> 
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
                          <h4><i className="fa fa-angle-right"></i> รายการเป้าหมายของฉัน</h4>
                          <hr />
                          <table className="table table-striped table-advance table-hover">
                            <thead>
                                <tr>
                                  <th> ลำดับ </th>
                                  <th> ชื่อเป้าหมาย</th>
                                  <th> หมวดหมู่ของเป้าหมาย</th>
                                  <th> รอบการดำเนินงาน</th>
                                  <th> สถานะ</th>
                                  <th> รายงานความคืบหน้า</th>
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
      let circleList = this.state.circleList;
      let categoryList = this.state.categoryList;
      return (
        <section id="main-content">
          <section className="wrapper">

            <div className="row"> 
                <div className="col-md-8">
                    <h3><i className="fa fa-angle-right"></i> รายงานความคืบหน้ารายการตรวจสอบ</h3>
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
          
          <div id="modal" className="modal fade" role="dialog" >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">รายงานความคืบหน้ารายการตรวจสอบ</h4>
                </div>
                <div className="modal-body">
                <ProgressBar width="50%" message="50%"/>
              
                  <div className="panel-heading">
                    <div className="pull-left">
                    <h5><i className="fa fa-tasks"></i> รายการตรวจสอบ</h5></div>
                  </div>
                  <div className="custom-check goleft mt">
                    <table className="table table-hover custom-check" id="tableModal">
                      <tbody>
                        { this.renderTableChecklist() }
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="modal-footer">
                <button type="submit" className="btn btn-success"  data-dismiss="modal" onClick={this.handleSaveProgress}>ตกลง</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal">ยกเลิก</button>
                </div>
              </div>
            </div>
          </div>

        </section>

      );
    }
  }
  
  export default ProgressMe;