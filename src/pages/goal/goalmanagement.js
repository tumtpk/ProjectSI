import React, { Component } from "react";
import axios from "axios";
import CommonApi from "../../api/common-api"
import { Link } from 'react-router-dom';

const initialState = {
  goalName: "",
  description: "",
  startDate: "",
  endDate: "",
  categoryID: 0,
  circleID: 0,
  checklists: [{value: null}]
};

class Goalmanagement extends Component { 

    constructor(props) {
        super(props);
        this.state = initialState;
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
      }

      componentWillMount() {
        CommonApi.instance.post('/goal/search', {
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
              goalName: this.state.goalName,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              //status: this.state.status
        })
        .then(response => {
            this.setState({dataSearch: response.data});
        });
    }

    renderTable(){
      return _.map(this.state.dataSearch, data => {
        return (
          <tr>
            <td>{ data.goalName }</td>
            <td>{ data.startDate }</td>
            <td>{ data.endDate }</td>
            <td>
              <button className="btn btn-warning btn-xs"><i className="fa fa-tasks" ></i></button>
                
              <Link to={ {pathname: `/goal/view`, query: {id: data.id}} }><button className="btn btn-success btn-xs"><i className="fa fa-eye"></i></button></Link>
              <Link to={ {pathname: `/goal/update`, query: {id: data.id}} }><button className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></button></Link>
              <a href="delete"><button className="btn btn-danger btn-xs"><i className="fa fa-trash-o"></i></button></a>
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
                              <div className='input-group date' id='datetimepicker1'>
                                <input type='text' className="form-control" name="startDate" value={this.state.startDate} onChange={this.handleChange} />
                                <span className="input-group-addon">
                                <span className="glyphicon glyphicon-calendar"></span>
                             </span>
                            </div>
                            <span id="startDate" className="error-message"></span>
                            </div>
                            <label className="col-sm-2 col-sm-2 control-label">วันสิ้นสุดเป้าหมาย</label>
                              <div className="col-sm-3">
                              <div className='input-group date' id='datetimepicker1'>
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
  
  export default Goalmanagement;