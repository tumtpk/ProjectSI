import React, { Component } from "react";
import MainLayout from "../../components/main-layout";
import CommonApi from "../../api/common-api"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Checkbox from '../../Checkbox';

const items = [
    'นักศึกษา',
    'อาจารย์',
    'ประธานหลักสูตร',
  ];

class EvaluationUpdate extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            evaluationName: "",
            description: "",
            questions: [{value: null}],
            redirect: false,
            duplicateMessage1: "",
            duplicateMessage2: "",
            duplicate: true,
            redirect: false,
            userTypeInEva: []
        }
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddQuestions = this.handleAddQuestions.bind(this);
        this.handleRemoveQuestions = this.handleRemoveQuestions.bind(this);
        this.handleQuestionsValueChange = this.handleQuestionsValueChange.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        this.selectedCheckboxes = new Set();
      }

      componentWillMount() {
       let id = this.props.location.query.id;
       this.state.id = this.props.location.query.id;
        this.state.evaluationName = this.props.location.query.evaluationName;
        this.state.description = this.props.location.query.description;
        this.setState(this.state);
        // this.apiGetEset(id);
        this.apiGetQset(id);
        this.apiGetUTEset(id);
      }

      setUTE = label => {
        let check = false;
        this.state.userTypeInEva.map(item => {
            console.log(this.state.userTypeInEva);
            if (label == item.utEuserTypeName) {
                check = true;
            }
        });
        return check;
      }
      
      createCheckbox = label => (
        <Checkbox
                label={label}
                handleCheckboxChange={this.toggleCheckbox}
                key={label}
                isChecked={this.setUTE(label)}
            />
      )
    
      createCheckboxes = () => (
        items.map(this.createCheckbox)
      )

      toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
          this.selectedCheckboxes.delete(label);
        } else {
          this.selectedCheckboxes.add(label);
        }
      }

      apiGetUTEset(id){
        CommonApi.instance.get('/evaluation/getusertypeineva/'+id)
        .then(response => {
            let responseData = response.data;
            this.setState(
              {userTypeInEva: response.data}
            );
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
            //console.log(this.state);
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

      handleAddQuestions = () => {
        this.setState({
            questions: this.state.questions.concat([{ value: null }])
        });
      }

      handleRemoveQuestions = (index) => () => {
        this.setState({
            questions: this.state.questions.filter((s, sidx) => index !== sidx)
        });
      }

      handleQuestionsValueChange = (index) => (evt) => {
        const newQuestion = this.state.questions.map((question, sidx) => {
          if (index !== sidx) return question;
          return { ...question, value: evt.target.value };
        });
    
        this.setState({ questions: newQuestion });
      }

      handleSubmit(event) {
        event.preventDefault();

        console.log(this.state);

        CommonApi.instance.post('/evaluation/isDuplicateNameUpdate' ,this.state)
        .then(response => {
            if(response.status == 200 && response.data.result == false){
                this.setState({ duplicate: false, duplicateMessage1: "ชื่อแบบประเมินซ้ำ!", duplicateMessage2: "กรุณากรอกชื่อแบบประเมินใหม่อีกครั้ง."});
            }
            else{
                this.setState({ duplicate: true, duplicateMessage1: "",duplicateMessage2: ""});
                CommonApi.instance.post('/question/isDuplicateNameCreate' ,this.state)
                .then(response =>{
                    if (response.status == 200 && response.data.result == true){
                        CommonApi.instance.post('/evaluation/update',this.state)
                        .then(response =>{
                            if(response.status == 200 && response.data.result){
                                this.setState({redirect: true});
                            }
                            else{
                                this.handleValidate(response.data.message);
                            }

                        }
                    )

                    }
                    else{
                        this.setState({ duplicate: false, duplicateMessage1: "แบบประเมินนี้มีคำถามซ้ำกัน!", duplicateMessage2: "กรุณากรอกคำถามใหม่อีกครั้ง."});
                    }
                })
                
            }
        });
      }


    handleValidate(messages){
        let require = ["evaluationName","description"];
        require.forEach(element => {
            document.getElementById(element).innerHTML = null;
        });
        this.state.questions.map((question, sidx) => {
            document.getElementById('questions['+sidx+']').innerHTML = null;
        });
        messages.forEach(element => {
            document.getElementById(element.key).innerHTML = element.message;
            
        });
       console.log(messages)
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
                    <h3><i className="fa fa-angle-right"></i> แก้ไขแบบประเมิน</h3>
                </div>
            </div>
 
            <div className="row mt">
              <div className="col-lg-12">
                <div className="form-panel">
                <div className="alert alert-danger alert-dismissable" hidden={this.state.duplicate}>
						  <strong>{this.state.duplicateMessage1}</strong> {this.state.duplicateMessage2}
						</div>
                    <h4 className="mb"><i className="fa fa-angle-right"></i> กรอกข้อมูลแบบประเมิน</h4>
                    <form className="form-horizontal style-form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">ชื่อแบบประเมิน<span className="error-message">*</span></label>
                              <div className="col-sm-5">
                                    <input type="text" className="form-control" name="evaluationName" value={this.state.evaluationName} onChange={this.handleChange} />
                                    <span id="evaluationName" className="error-message"></span>
                              </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 col-sm-2 control-label">คำชี้แจง<span className="error-message">*</span></label>
                            <div className="col-sm-5">
                                <textarea className="form-control rounded-0" rows="5" name="description" value={this.state.description} onChange={this.handleChange}/>
                                <span id="description" className="error-message"></span>
                            </div>
                        </div>
                        <div className="row">
                            <label className="col-sm-2 col-sm-2 control-label">คำถาม<span className="error-message">*</span></label>
                            <div className="col-sm-5">
                                <button type="button" className="btn btn-primary" onClick={this.handleAddQuestions}>เพิ่ม</button>
                            </div>
                        </div>
                  
                        {this.state.questions.map((question, index) => (
                        <div className="row">
                            <label className="col-sm-2 col-sm-2 control-label"></label>
                             
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder={`คำถามที่ ${index + 1}`}
                                            value={question.value} 
                                            onChange={this.handleQuestionsValueChange(index)} />
                                    <span id={'questions['+index+']'} className="error-message"></span>
                                    <span className="input-group-btn">
                                        <button className="btn btn-danger" type="button" onClick={this.handleRemoveQuestions(index)} disabled={index==0 ? 'disabled' : ''}>ลบ</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        ))}

                        <div className="form-group"></div>
                        <div className="row">
                            <label className="col-sm-2 col-sm-2 control-label">กำหนดบทบาทผู้ใช้แบบประเมิน<span className="error-message">*</span></label>
                            <div className="col-sm-5">
                                {this.createCheckboxes()}
                            </div>
                        </div>
                          
                        <div className="text-right">
                            <button type="submit" className="btn btn-success">บันทึก</button>
                            <Link to={ {pathname: `/evaluationmanagement`} }><button type="button" className="btn btn-danger">ยกเลิก</button></Link>
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
  
  export default EvaluationUpdate;