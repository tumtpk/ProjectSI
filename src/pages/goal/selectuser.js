import React, { Component } from "react";
import axios from "axios";
import CommonApi from "../../api/common-api"
import { Link } from 'react-router-dom';

const initialState = {
  firstname: null,
  lastname: null,
  status: 0,
  userTypeID:null,
  dataSearch: null
};

class GoalCreateOtherUserSelectUser extends Component { 

    constructor(props) {
        super(props);
        this.state = initialState;
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
      }

      componentWillMount() {
        CommonApi.instance.post('/user/search', {
              firstname: this.state.firstname,
              lastname: this.state.lastname,
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

      handleClear(event){
        document.getElementById("search-user").reset();
        this.setState(initialState);
      }

    handleSearch(){
        // CommonApi.instance.defaults.headers.common['Authorization'] = 'Bearer tGOL83hqWSlBZAXBxonr3sN_OThf1YGQGMoPLrb1lscOW-LeyC2JImp-Chd_udagbPiosPb-6nzGU_lF1JPr2VXoKn0HTJ4bEvP6-yBkQrkfRGKz62H69QXJKIhJn9x2hGi--etIc9RVO-dTl5wu_w03oovndT8EN2BVm8Mda9p-k03g5EKt4KSw2qcEqnj-JGwSW0_23SK2Yc6fjOhIjMoqyvPMpPtzlBqb_5-LTyKqReshbvVtKPWoXNf2ld71IxYLdkbpwLWX2kd30k7b3FdEM8XgEVBSKri9ert_DgVoEBl6g1PO8PEgIiofwqYw1L8yPDQrjpsz-FoELUdVZl9uMEoSIGA7EibdHX4Ltsqm2cB62C3nM7eUaphtRwH7RZ-QHMwXlEfiAB86BMzo0OxvK7Q4j_5atJOUg_0ZGr0Eb5yU2CHjqEjrh8zztS5W_g9nvR5Ed6HEjp5O-HfwDs3-t730YVhcvCyCoHXnhR4';
        CommonApi.instance.post('/user/search', {
              firstname: this.state.firstname,
              lastname: this.state.lastname,
              status: this.state.status
        })
        .then(response => {
            this.setState({dataSearch: response.data});
        });
    }

    renderTable(){
      return _.map(this.state.dataSearch, data => {
        return (
          <tr>
            <td>{ data.firstname }</td>
            <td>{ data.lastname }</td>
            <td>{data.userTypeID}</td>
            <td>{ data.status }</td>
            <td>
              <button type="button" className="btn btn-theme03"><i className="fa fa-check"></i> เลือก</button>
              <button type="button" className="btn btn-theme04"><i className="glyphicon glyphicon-remove"></i> เอาออก</button>
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
                          <h4><i className="fa fa-angle-right"></i> รายการผู้ใต้บังคับบัญชา</h4>
                          <hr />
                          <table className="table table-striped table-advance table-hover">
                            <thead>
                                <tr>
                                  <th> ชื่อ</th>
                                  <th> นามสกุล</th>
                                  <th>บทบาท </th>
                                  <th> สถานะ</th>
                                  <th><button type="button" className="btn btn-theme03"> เลือกทั้งหมด</button>
                                      <button type="button" className="btn btn-theme04"> เอาออกทั้งหมด</button></th>
                                </tr>
                              </thead>
                              <tbody>
                                { this.renderTable() }
                              </tbody>
                          </table>
                          <div className="text-right" style={{marginRight: '10px'}}>
                          <Link to={ {pathname: `/createOtherUser`} }><button type="button" className="btn btn-success"> บันทึก </button></Link>
                          </div>
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
                    <h3><i className="fa fa-angle-right"></i> กำหนดผู้ดำเนินเป้าหมาย</h3>
                </div>
            </div>

            {this.renderFromSearch()}

          </section>
        </section>
      );
    }
  }
  
  export default GoalCreateOtherUserSelectUser;