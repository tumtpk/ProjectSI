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
  
class EvaluationCreate extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            evaluationName: "",
            description: "",
            questions: [{value: null}],
            redirect: false,
            duplicateMessage1: "",
            duplicateMessage2: "",
            duplicate: true,
            userTypes: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddQuestions = this.handleAddQuestions.bind(this);
        this.handleRemoveQuestions = this.handleRemoveQuestions.bind(this);
        this.handleQuestionsValueChange = this.handleQuestionsValueChange.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        this.selectedCheckboxes = new Set();
      }

      createCheckbox = label => (
        <Checkbox
                label={label}
                handleCheckboxChange={this.toggleCheckbox}
                key={label}
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

      handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
          [name]: value
        });
        document.getElementById(name).innerHTML = null;
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

        //this.state.UserTypes = this.selectedCheckboxes;
        this.state.userTypes = Array.from(this.selectedCheckboxes);
        const newUsertypes = this.state.userTypes.map((usertype, sidx) => {
            return { ...usertype, userTypeName: usertype };
        });
        this.setState({ userTypes: newUsertypes });

        console.log(this.state);

        CommonApi.instance.post('/evaluation/isDuplicateNameCreate' ,this.state)
        .then(response => {
            if(response.status == 200 && response.data.result == false){
                this.setState({ duplicate: false, duplicateMessage1: "ชื่อแบบประเมินซ้ำ!", duplicateMessage2: "กรุณากรอกชื่อแบบประเมินใหม่อีกครั้ง."});
            }
            else{
                this.setState({ duplicate: true, duplicateMessage1: "",duplicateMessage2: ""});
                CommonApi.instance.post('/question/isDuplicateNameCreate' ,this.state)
                .then(response =>{
                    if (response.status == 200 && response.data.result == true){
                        CommonApi.instance.post('/evaluation/create',this.state)
                        .then(response =>{
                            if(response.status == 200 && response.data.result){
                                this.setState({redirect: true});
                            }
                            else{
                                this.handleValidate(response.data.message);
                                console.log(response.data.message)
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
    }

    render() {

      const { redirect } = this.state;
      
      if (redirect) {
        return <Redirect to='/evaluationmanagement'/>;
      }

      return (
        <section id="main-content">
          <section className="wrapper">

            <div className="row"> 
                <div className="col-md-12">
                    <h3><i className="fa fa-angle-right"></i> เพิ่มแบบประเมิน</h3>
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
                             <br></br>
                            </div>
                        ))}
                        <div className="form-group"></div>
                        <div className="row">
                            <label className="col-sm-2 col-sm-2 control-label">กำหนดบทบาทผู้ใช้แบบประเมิน<span className="error-message">*</span></label>
                            <div className="col-sm-5">
                                {this.createCheckboxes()}
                                {/* <div className="checkbox">
                                    <label><input type="checkbox" value="1" onChange={this.handleClickUserType(1)}/> นักศึกษา</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value="2" onChange={this.handleClickUserType(2)}/> อาจารย์</label>
                                </div>
                                <div className="checkbox">
                                    <label><input type="checkbox" value="3" onChange={this.handleClickUserType(3)}/> ประธานหลักสูตร</label>
                                </div> */}
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
  
  export default EvaluationCreate; 