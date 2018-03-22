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
  evaluationName : null,
  description : null,
  status : 0,
  dataSearch: null,
  number:1
};

class Evaluationmanagement extends Component { 

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
        CommonApi.instance.post('/evaluation/search', {
              id: this.state.id,
              evaluationName: this.state.evaluationName,
              description: this.state.description,
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
        CommonApi.instance.get('/evaluation/delete/'+id) 
        .then(response => {
          this.handleSearch();
        });
    }

      handleClear(event){
        document.getElementById("search-evaluation").reset();
        this.state = initialState;
        this.handleSearch();
      }

    handleSearch(){
        CommonApi.instance.post('/evaluation/search', {
              evaluationName: this.state.evaluationName,

        })
        .then(response => {
            this.setState({dataSearch: response.data});
        });
    }


    renderTable(){
      this.state.number = 0
      return _.map(this.state.dataSearch, data => {
        this.state.number = this.state.number+1
        return (
          <tr>
            <td>{ this.state.number}</td>
            <td>{ data.evaluationName }</td>
            <td>{ data.status }</td>
            <td>
              <Link to={ {pathname: `/evaluation/view`, query: {id: data.id}} }><button className="btn btn-success btn-xs"><i className="fa fa-eye"></i></button></Link>
              <Link to={ {pathname: `/evaluation/update`, query: {id: data.id}} }><button className="btn btn-primary btn-xs"><i className="fa fa-edit"></i></button></Link>
              <button className="btn btn-danger btn-xs" ><i className="fa fa-trash-o " data-toggle="modal" data-target={"#"+data.id}></i></button>
                                      <div id={data.id} className="modal fade" role="dialog">
                                        <div className="modal-dialog">
                                          <div className="modal-content">
                                          <div className="modal-header">
                                          <button type="button" className="close" data-dismiss="modal">&times;</button>
                                          <h4 className="modal-title">ลบแบบประเมิน</h4>
                                          </div>
                                          <div className="modal-body">
                                          <p>{data.evaluationName} จะถูกลบอย่างถาวร ยืนยันเพื่อทำการลบ</p>
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
                          <h4><i className="fa fa-angle-right"></i> รายการแบบประเมิน</h4>
                          <hr />
                          <table className="table table-striped table-advance table-hover">
                            <thead>
                                <tr>
                                  <th> ลำดับ </th>
                                  <th> ชื่อแบบประเมิน</th>
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
                    <h3><i className="fa fa-angle-right"></i> การจัดการแบบประเมิน</h3>
                </div>
                <div className="col-md-4 text-right" style={{marginTop: '15px'}}>
                  <Link to={ {pathname: `/evaluation/create`} }><button type="button" className="btn btn-primary" >เพิ่มแบบประเมิน</button></Link>
                </div>
            </div>


            <div className="row">
                <div className="col-lg-12">
                  <div className="form-panel">
                  
                  
                      <form className="form-horizontal style-form" id="search-evaluation" onSubmit={this.handleSubmit}>
                          <div className="form-group">
                            <br></br>
                              <label className="col-sm-2 col-sm-2 control-label">ชื่อแบบประเมิน</label>
                              <div className="col-sm-3">
                                  <input type="text" className="form-control" name="evaluationName" value={this.state.evaluationName} onChange={this.handleChange}/>
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
  
  export default Evaluationmanagement; 