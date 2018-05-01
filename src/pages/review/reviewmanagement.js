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
  status: "รอดำเนินการ"

};

class Reviewmanagement extends Component { 

    constructor(props) {
        super(props);
        this.state = initialState;
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleSaveProgress = this.handleSaveProgress.bind(this);
        this.handlechangeProgress = this.handlechangeProgress.bind(this);
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

      handlechangeProgress = (clpId) => (evt) => {
        this.state.checklistProgresses.forEach( (checklistP,index) => {
          if(checklistP.clpId == clpId){
            if(checklist.checklistProgress1 == 1){
              checklist.checklistProgress1 = 2;
            }
            else{
              checklist.checklistProgress1 = 1;
            }
          }
          console.log(checklist);
        });
      } 

      handleSaveProgress(event) {
        CommonApi.instance.post('/checklistprogress/saveProgress' ,this.state.checklistProgresses)
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
          this.setState({checklists: response.data});
          // let ischecked = '';
          // let clTable = '';
          // if(checklists.checklistProgress1 == 2){
          //   ischecked = "checked";
          // }
          // clTable += '<input type="checkbox" class="checked" value='+checklists.clpId+' '
          // + ischecked + '/>' + checklists.checklistName;
          // document.getElementById("checkPid").innerHTML = clTable;
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
            circleID: this.state.circleID,

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

      return _.map(this.state.checklists, data => {
        console.log(data);
        return (
          <tr>
            <td>
              <span class="check">
                {React.createElement('input',{type: 'checkbox', checked:data.checklistProgress1 === 2 ? true : false})}
                &nbsp;{data.value}
              </span>
            </td>
          </tr>
        );
      });
  
    }

    renderTable(){
      console.log(this.state.dataSearch)
      this.state.number = 0
      return _.map(this.state.dataSearch, data => {
        this.state.number = this.state.number+1
        return (
          <tr>
            <td>{ this.state.number}</td>
            <td>{ data.goalName }</td>
            <td>{ data.categoryName }</td>
            <td>{ data.circleName}</td>
            <td><span className="badge bg-success">{this.state.status}</span></td>
            <td>
              <button className="btn btn-warning btn-xs" data-toggle="modal" data-target="#modal" onClick={this.handleProgress(data.id)}><i className="fa fa-tasks" ></i></button>
              <Link to={ {pathname: `/goal/view`, query: {id: data.id,goalName:data.goalName,description:data.description,categoryID:data.categoryID,categoryName:data.categoryName,circleID:data.circleID,circleName:data.circleName,startDate:data.startDate,endDate:data.endDate,circleType:data.circleType}} }><button className="btn btn-success btn-xs"><i className="fa fa-eye"></i></button></Link>
              <Link to={ {pathname: `/goal/update`, query: {id: data.id,goalName:data.goalName,description:data.description,categoryID:data.categoryID,categoryName:data.categoryName,circleID:data.circleID,circleName:data.circleName,startDate:data.startDate,endDate:data.endDate,circleType:data.circleType}} }><button className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></button></Link>
              <button className="btn btn-danger btn-xs"  data-toggle="modal" data-target={"#"+data.goalName}><i className="fa fa-trash-o "></i></button>
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

      return (
        <div className="row mt">
              <div className="col-lg-12">
						<div className="btn-group btn-group-justified">
						  <div className="btn-group">
              <Link to={ {pathname: `/goalmanagement`} }><button type="button" className="btn btn-warning btn-lg btn-block" >เป้าหมายของฉัน</button></Link>
						  </div>
						  <div className="btn-group">
              <Link to={ {pathname: `/goalmanagementOtherUser`} }><button type="button" className="btn btn-default btn-lg btn-block">เป้าหมายผู้ใต้บังคับบัญชา</button></Link>
						  </div>
						  <div className="btn-group">
						  <Link to={ {pathname: '/reportallgoal'}}><button type="button" className="btn btn-default btn-lg btn-block">รายงานความสำเร็จ</button></Link>
						  </div>
						</div> 

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
      let style = {
        width: "400px",
       height: "300px;"
      }
      
      var DateTimeField = require('react-bootstrap-datetimepicker');
      let circleList = this.state.circleList;
      let categoryList = this.state.categoryList;
      return (
        <section id="main-content">
          <section className="wrapper">

            <div className="row"> 
                <div className="col-md-8">
                    <h3><i className="fa fa-angle-right"></i> การจัดการเป้าหมาย</h3>
                </div>
                <div className="col-md-4 text-right" style={{marginTop: '15px'}}>
                  <Link to={ {pathname: `/goal/create`} }><button type="button" className="btn btn-primary" >เพิ่มเป้าหมาย</button></Link>
                </div>        
            </div>
         
            <div className="row mt">
              <div className="col-lg-12">
                <div className="col-sm-4">.col-sm-4</div>
                <div className="col-sm-4">.col-sm-4</div>
                <div className="col-sm-4">.col-sm-4</div>
            </div>
          </div>

          </section>
          
        </section>

      );
    }
  }
  
  export default Reviewmanagement;