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
  id: null,
  circleName: null,
  circleTime: 0,
  status: 0,
  dataSearch: null,
  number:1
};

class Circlemanagement extends Component { 

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
        CommonApi.instance.post('/circle/search', {
              id: this.state.id,
              circleName: this.state.circleName,
              circleTime: this.state.circleTime,
              status: this.state.status
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

      handleDelete = (id) => (evt) => {
        CommonApi.instance.get('/circle/delete/'+id) 
        .then(response => {
          this.handleSearch();
        });
    }

      handleClear(event){
        document.getElementById("search-circle").reset();
        this.state = initialState;
        this.handleSearch();
      }

    handleSearch(){
      console.log(this.state);
        // CommonApi.instance.defaults.headers.common['Authorization'] = 'Bearer tGOL83hqWSlBZAXBxonr3sN_OThf1YGQGMoPLrb1lscOW-LeyC2JImp-Chd_udagbPiosPb-6nzGU_lF1JPr2VXoKn0HTJ4bEvP6-yBkQrkfRGKz62H69QXJKIhJn9x2hGi--etIc9RVO-dTl5wu_w03oovndT8EN2BVm8Mda9p-k03g5EKt4KSw2qcEqnj-JGwSW0_23SK2Yc6fjOhIjMoqyvPMpPtzlBqb_5-LTyKqReshbvVtKPWoXNf2ld71IxYLdkbpwLWX2kd30k7b3FdEM8XgEVBSKri9ert_DgVoEBl6g1PO8PEgIiofwqYw1L8yPDQrjpsz-FoELUdVZl9uMEoSIGA7EibdHX4Ltsqm2cB62C3nM7eUaphtRwH7RZ-QHMwXlEfiAB86BMzo0OxvK7Q4j_5atJOUg_0ZGr0Eb5yU2CHjqEjrh8zztS5W_g9nvR5Ed6HEjp5O-HfwDs3-t730YVhcvCyCoHXnhR4';
        CommonApi.instance.post('/circle/search', {
              id: this.state.id,
              circleName: this.state.circleName,
              circleTime: this.state.circleTime,
              status: this.state.status
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
            <td>{ data.circleName }</td>
            <td>{ data.circleTime }</td>
            <td>{ (data.status == 1) ? "เปิดใช้งาน" : "ปิดใช้งาน" }</td>
            <td>
              <Link to={ {pathname: `/circle/view`, query: {id : data.id}} }><button className="btn btn-success btn-xs"><i className="fa fa-eye"></i></button></Link>
              <Link to={ {pathname: `/circle/update`, query: {id : data.id }} }><button className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></button></Link>
              <button className="btn btn-danger btn-xs" data-toggle="modal" data-target={"#"+data.id}><i className="fa fa-trash-o " ></i></button>
                                      <div id={data.id} className="modal fade" role="dialog">
                                        <div className="modal-dialog">
                                          <div className="modal-content">
                                          <div className="modal-header">
                                          <button type="button" className="close" data-dismiss="modal">&times;</button>
                                          <h4 className="modal-title">ลบรอบการดำเนินงาน</h4>
                                          </div>
                                          <div className="modal-body">
                                          <p>{data.circleName} จะถูกลบอย่างถาวร ยืนยันเพื่อทำการลบ</p>
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
                      <div className="content-panel">
                          <h4><i className="fa fa-angle-right"></i> รายการรอบการดำเนินงาน</h4>
                          <hr />
                          <table className="table table-striped table-advance table-hover">
                            <thead>
                                <tr>
                                  <th> ลำดับ </th>
                                  <th> ชื่อรอบ</th>
                                  <th> ระยะเวลา(วัน)</th>
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
      return (
        <section id="main-content">
          <section className="wrapper">
            <div className="row"> 
                <div className="col-md-8">
                    <h3><i className="fa fa-angle-right"></i> การจัดการรอบการดำเนินงาน</h3>
                </div>
                <div className="col-md-4 text-right" style={{marginTop: '15px'}}>
                  <Link to={ {pathname: `/circle/create`} }><button type="button" className="btn btn-primary" >เพิ่มรอบ</button></Link>
                </div>
            </div>


            <div className="row">
                <div className="col-lg-12">
                  <div className="form-panel">
                  
                  
                      <form className="form-horizontal style-form" id="search-circle" onSubmit={this.handleSubmit}>
                          <div className="form-group">
                            <br></br>
                              <label className="col-sm-2 col-sm-2 control-label">ชื่อรอบการดำเนินงาน</label>
                              <div className="col-sm-4">
                                  <input type="text" className="form-control" name="circleName" value={this.state.circleName} onChange={this.handleChange} /> 
                              </div>
                              <label className="col-sm-2 col-sm-2 control-label">ระยะเวลาที่กำหนด</label>        
                              <div className="col-sm-3">
                                <input type="text" className="form-control" name="circleTime" valua={this.state.circleTime} onChange={this.handleChange} />
                              </div>
                              <label className="col-sm-1 col-sm-1 control-label">วัน</label>
                          <br></br><br></br><br></br>
                              <label className="col-sm-2 col-sm-2 control-label">สถานะ</label>
                               <div className="btn-group"  className="col-sm-2"> 
                                <select className="form-control" name="status" value={this.state.status} onChange={this.handleChange}>
                                    <option value="0">--เลือกสถานะ--</option>
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

            {this.renderFromSearch()}

          </section>
        </section>
      );
    }
  }
  
  export default Circlemanagement;