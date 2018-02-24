import React, { Component } from "react";
import MainLayout from "../../components/main-layout";
import CommonApi from "../../api/common-api"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class CircleDetail extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            circleCode: "",
            circleName: "",
            circleTime: "",
            status: 0,
            redirect: false,
        }
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

      }

      componentWillMount() {
        let id = this.props.location.query.id;
        this.apiGetUset(id);
      }

      apiGetUset(circleCode){
        CommonApi.instance.get('/circle/getcircle/'+circleCode)
        .then(response => {
            let responseData = response.data;
            this.setState(
              {
                circleCode : responseData.circleCode,
                circleName: responseData.circleName,
                circleTime: responseData.circleTime,
                status: responseData.status
              }
            );
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

      handleSubmit(event) {
        event.preventDefault();

        CommonApi.instance.post('/circle/create', this.state)
        .then(response => {
            if(response.status == 200){
                this.setState({redirect: true});
            }
        });
      }

    render() {

      const { redirect } = this.state;

      if (redirect) {
        return <Redirect to='/circlemanagement'/>;
      }

      return (
        <section id="main-content">
          <section className="wrapper">

            <div className="row"> 
                <div className="col-md-12">
                    <h3><i className="fa fa-angle-right"></i> ดูรายละเอียดรอบการปรับปรุงกระบวนการ</h3>
                </div>
            </div>

            <div className="row mt">
              <div className="col-lg-12">
                <div className="form-panel">
                    <h4 className="mb"><i className="fa fa-angle-right"></i> รายละเอียดรอบการปรับปรุงกระบวนการ</h4>
                    <form className="form-horizontal style-form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                              <label className="col-sm-3 col-sm-3 control-label">รหัสรอบการปรับปรุงกระบวนการ</label>
                              <div className="col-sm-5">
                                    <input type="text" className="form-control" name="circleCode" value={this.state.circleCode} onChange={this.handleChange} disabled />
                              </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 col-sm-3 control-label">ชื่อรอบการปรับปรุงกระบวนการ</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" name="circleName" value={this.state.circleName} onChange={this.handleChange} disabled />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-3 col-sm-3 control-label">ระยะเวลาที่กำหนด</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" name="circleTime" value={this.state.circleTime} onChange={this.handleChange} disabled />
                            </div>
                            <label className="col-sm-3 col-sm-3 control-label">วัน</label>
                        </div>

                            <div className="form-group">
                              <label className="col-sm-3 col-sm-3 control-label">สถานะ</label>
                              <div className="col-sm-5">
                                <div className="btn-group">
                                    <select className="form-control" name="status" value={this.state.status} onChange={this.handleChange} disabled >
                                        <option value="1">เปิดใช้งาน</option>
                                        <option value="2">ปิดใช้งาน</option>
                                    </select>
                                </div>
                              </div>
                            </div>
                        
                        <div className="text-right">
                            <Link to={ {pathname: `/circlemanagement`} }><button type="button" className="btn btn-info">กลับ</button></Link>
                        </div>
                    </form>
                </div>
              </div>
            </div>

          </section>
        </section>
      );
    }
  }
  
  export default CircleDetail;