import React, { Component } from "react";
import MainLayout from "../../components/main-layout";
import CommonApi from "../../api/common-api"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class EvaluationDetail extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            evaluationName: "",
            description: "",
            questions: [],
            userTypeInEva: []
            //questions: [{value: null}],
            //redirect: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

      }

      componentWillMount() {
        let id = this.props.location.query.id;
        this.state.evaluationName = this.props.location.query.evaluationName;
        this.state.description = this.props.location.query.description;
        this.setState(this.state);
        console.log(this.state)
        // this.apiGetEset(id);
        this.apiGetQset(id);  
        this.apiGetUTEset(id);
      }

      // apiGetEset(id){
      //   CommonApi.instance.get('/evaluation/getevaluation/'+id)
      //   .then(response => {
      //       let responseData = response.data;
      //       this.setState(
      //         {
      //           evaluationName : responseData.evaluationName,
      //           description: responseData.description,
      //         }  
      //       );
      //       console.log(this.state);
      //   });
      // }

      setUTE(id){
        let result = false;
        this.state.userTypeInEva.forEach(data => {
          if(data.utEuserTypeid == id){
            result = true;
          }
        });
        return result;
      }

      apiGetUTEset(id){
        CommonApi.instance.get('/evaluation/getusertypeineva/'+id)
        .then(response => {
            let responseData = response.data;
            this.setState(
              {userTypeInEva: response.data
              }
             
            );
             console.log(this.state.userTypeInEva)
            console.log(this.state);
        });
      }

      apiGetQset(id){
        CommonApi.instance.get('/question/getquestion/'+id)
        .then(response => {
            let responseData = response.data;
            this.setState(
              {questions: response.data
              }
             
            );
             console.log(this.state.questions)
            console.log(this.state);
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

      }

    render() {

      const { redirect } = this.state;
      if (redirect) {
        return <Redirect to='/evaluationmanagement'/>;
      }
      let questions = this.state.questions;
      return (
        <section id="main-content">
          <section className="wrapper">

            <div className="row"> 
                <div className="col-md-12">
                    <h3><i className="fa fa-angle-right"></i> ดูรายละเอียดแบบประเมิน</h3>
                </div>
            </div>
            <div className="row mt">
              <div className="col-lg-12">
                <div className="form-panel">
                    <h4 className="mb"><i className="fa fa-angle-right"></i> รายละเอียดแบบประเมิน</h4>
                    <form className="form-horizontal style-form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">ชื่อแบบประเมิน</label>
                              <div className="col-sm-5">
                                    <input type="text" className="form-control" name="evaluationName" value={this.state.evaluationName}  disabled/>
                              </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 col-sm-2 control-label">คำชี้แจง</label>
                            <div className="col-sm-5">
                                <textarea className="form-control rounded-0" rows="5" name="description" value={this.state.description} onChange={this.handleChange} disabled/>
                            </div>
                        </div>

                        <div className="row">
                            <label className="col-sm-2 col-sm-2 control-label">คำถาม</label>
                            <div className="col-sm-5">
                            {this.state.questions.map((question, index) => (
                                    <input type="text" className="form-control" value={question.value} disabled />
                            ))} 
                          </div>
                        </div>
                        
                        <div className="form-group"></div>
                        <div className="row">
                            <label className="col-sm-2 col-sm-2 control-label">กำหนดบทบาทผู้ใช้แบบประเมิน<span className="error-message">*</span></label>
                            <div className="col-sm-5">
                                    <div className="checkbox">
                                      <label>
                                        <input type="checkbox" value="" disabled checked={this.setUTE(1)}/> นักเรียน
                                        </label>
                                    </div>
                                    <div className="checkbox">
                                      <label>
                                        <input type="checkbox" value="" disabled checked={this.setUTE(2)}/> อาจารย์
                                        </label>
                                    </div>
                                    <div className="checkbox">
                                      <label>
                                        <input type="checkbox" value="" disabled checked={this.setUTE(3)}/> ประธานหลักสูตร
                                        </label>
                                    </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <Link to={ {pathname: `/evaluationmanagement`} }><button type="button" className="btn btn-info">กลับ</button></Link>
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
  
  export default EvaluationDetail;