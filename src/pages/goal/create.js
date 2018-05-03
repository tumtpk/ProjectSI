import React, { Component } from "react";
import MainLayout from "../../components/main-layout";
import CommonApi from "../../api/common-api"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


class GoalCreate extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            goalName: "",
            description: "",
            startDate: "01/01/0001",
            endDate: "01/01/0001",
            numberDate:0,
            categoryID: 0,
            circleID: 17,
            checklists: [{value: null},{value: null},{value: null}],
            circleList: [],
            categoryList: [],
            userID:"",
            redirect: false,
            duplicateMessage1: "",
            duplicateMessage2: "",
            duplicate: true,
            circleType:0,
            flag:1
        }
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddChecklists = this.handleAddChecklists.bind(this);
        this.handleRemoveChecklists = this.handleRemoveChecklists.bind(this);
        this.handleChecklistsValueChange = this.handleChecklistsValueChange.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        // this.handlerNumberDate = this.handlerNumberDate.bind(this);
      }

      componentWillMount() {
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

    //   handlerNumberDate = (value) => (evt) => {
    //     this.state.numberDate = value;
    //   }

      handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
          [name]: value
        });
        document.getElementById(name).innerHTML = null;

            // event.preventDefault();
            // var myDate = new Date(this.state.startDate); 
            // console.log(this.state.numberDate);
            // console.log(myDate);
            // myDate.setDate(myDate.getDate() + 10 );
            // myDate = myDate.toLocaleDateString("en-TH");
            // this.state.endDate = myDate;
            // console.log(this.state.endDate);
      }

      handleAddChecklists = () => {
        this.setState({
            checklists: this.state.checklists.concat([{ value: null }])

        });
      }


      handleRemoveChecklists = (index) => () => {
      if (index != 0){
        this.setState({
            checklists: this.state.checklists.filter((s, sidx) => index !== sidx)
        });
        }
      else{
        alert("เป้าหมาย ต้องประกอบด้วยอย่างน้อย 1 รายการตรวจสอบ")
      }
      }

      handleChecklistsValueChange = (index) => (evt) => {
        const newChecklist = this.state.checklists.map((checklist, sidx) => {
          if (index !== sidx) return checklist;
          return { ...checklist, value: evt.target.value };
        });
    
        this.setState({ checklists: newChecklist });
      }

      handleSubmit(event) {
        event.preventDefault();

        console.log(this.state);

        CommonApi.instance.post('/goal/isDuplicateNameCreate' ,this.state)
        .then(response => {
            if(response.status == 200 && response.data.result == false){
                this.setState({ duplicate: false, duplicateMessage1: "ชื่อเป้าหมายซ้ำ!", duplicateMessage2: "กรุณากรอกชื่อเป้าหมายใหม่อีกครั้ง."});
            }
            else{
                this.setState({ duplicate: true, duplicateMessage1: "",duplicateMessage2: ""});

                CommonApi.instance.post('/goal/create',this.state)
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
        });
      }

    handleValidate(messages){
        
        let require = ["goalName","description","categoryID","circleID","circleType"];
        require.forEach(element => {
            document.getElementById(element).innerHTML = null;
        });
        this.state.checklists.map((checklist, sidx) => {
            document.getElementById('checklists['+sidx+']').innerHTML = null;
        });
        console.log(messages)
        messages.forEach(element => {
            document.getElementById(element.key).innerHTML = element.message;
        });
    }

    render() {
      const { redirect } = this.state;

      if (redirect) {
        return <Redirect to='/goalmanagement'/>;
      }

      let circleList = this.state.circleList;
      let categoryList = this.state.categoryList;
      console.log(this.state.circleID)
      return (
        <section id="main-content">
          <section className="wrapper">

            <div className="row"> 
                <div className="col-md-12">
                    <h3><i className="fa fa-angle-right"></i> เป้าหมายของฉัน</h3>
                </div>
            </div>

            <div className="row mt">
              <div className="col-lg-12">
                <div className="form-panel">
                <div className="alert alert-danger alert-dismissable" hidden={this.state.duplicate}>
						  <strong>{this.state.duplicateMessage1}</strong> {this.state.duplicateMessage2}
						</div>
                    <h4 className="mb"><i className="fa fa-angle-right"></i> กรอกข้อมูลเป้าหมาย</h4>
                    <form className="form-horizontal style-form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">ชื่อเป้าหมาย<span className="error-message">*</span></label>
                              <div className="col-sm-5">
                                    <input type="text" className="form-control" name="goalName" value={this.state.goalName} onChange={this.handleChange} />
                                    <span id="goalName" className="error-message"></span>
                              </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 col-sm-2 control-label">คำอธิบาย<span className="error-message">*</span></label>
                            <div className="col-sm-5">
                                <textarea className="form-control rounded-0" rows="5" name="description" value={this.state.description} onChange={this.handleChange}/>
                                <span id="description" className="error-message"></span>
                            </div>
                        </div>

                        <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">หมวดหมู่<span className="error-message">*</span></label>
                              <div className="col-sm-10">
                                <div className="btn-group">
                                <select className="form-control" name="categoryID" value={this.state.categoryID} onChange={this.handleChange} >
                        
                                    <option value="0">--เลือกหมวดหมู่--</option>
                                    {categoryList.map((category, index) => (
                                        <option value={category.id}>{category.categoryName}</option>
                                    ))}
                                    </select>
                                    <span id="categoryID" className="error-message"></span>
                                </div>
                              </div>
                            </div>
                      
                        <div className="row">
                            <label className="col-sm-2 col-sm-2 control-label">รายการตรวจสอบ<span className="error-message">*</span></label>
                            <div className="col-sm-5">
                                <button type="button" className="btn btn-primary" onClick={this.handleAddChecklists}>เพิ่ม</button>
                            </div>
                        </div>
                        {this.state.checklists.map((checklist, index) => (
                        <div className="row">
                            <label className="col-sm-2 col-sm-2 control-label"></label>
                            <div className="col-sm-4">
                                <div className='input-group date' id='datetimepicker2'>
                                    <input type="text" className="form-control" placeholder={`รายการตรวจสอบที่ ${index + 1}`}
                                            value={checklist.value} 
                                            onChange={this.handleChecklistsValueChange(index)} />
                                    <span className="input-group-addon btn btn-theme04 btn-xs" onClick={this.handleRemoveChecklists(index)}>
                                            <span className="fa fa-times" ></span>
                                    </span>
                                </div>
                                <span id={'checklists['+index+']'} className="error-message"></span>
                            </div>
                        </div>
                        ))}
                          <div className="form-group">
                        </div>


                             <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">รูปแบบรอบการดำเนินงาน<span className="error-message">*</span></label>
                              <div className="col-sm-5">
                                <div className="btn-group">
                                    <select className="form-control" name="circleType" value={this.state.circleType} onChange={this.handleChange}>
                                    <option value="0">--เลือกรูปแบบรอบการดำเนินงาน--</option>
                                    <option value="1"> รอบการดำเนินงานตามปฏิทินการศึกษา</option>
                                    <option value="2"> รอบการดำเนินงานกำหนดเอง</option>
                                    </select>
                                    <span id="circleType" className="error-message"></span>
                                </div>
                              </div>
                            </div>

                            <div  className={  this.state.circleType == 1 ? "form-group show":"form-group  hidden" }>
                              <label className="col-sm-2 col-sm-2 control-label">รอบการดำเนินงานตามกำหนด<span className="error-message">*</span></label>
                              <div className="col-sm-5">
                                <div className="btn-group">
                                    <select className="form-control" name="circleID" value={this.state.circleID} onChange={this.handleChange}>
                                    <option value="0">--เลือกรอบการดำเนินงาน--</option>
                                    {circleList.map((circle, index) => (
                                        <option value={circle.id} >{circle.circleName}</option>     
                                    ))}

                                    </select>
                                    <span id="circleID" className="error-message"></span>
                                </div>
                              </div>
                            </div>

                        <div className={  this.state.circleType == 2 ? "form-group show":"form-group  hidden" }>
                            <label className="col-sm-2 col-sm-2 control-label">วันเริ่มต้นเป้าหมาย</label>
                            <div className="col-sm-3">
                            <div className='input-group date' id='datetimepicker1'>
                                <input type='date' className="form-control" name="startDate" value={this.state.circleList.startDate} onChange={this.handleChange} />
                            <span className="input-group-addon">
                                <span className="glyphicon glyphicon-calendar"></span>
                             </span>

                            </div>
                            <span id="startDate" className="error-message"></span>
                        </div>
                        

                        <div className={  this.state.circleType == 2 ? "form-group2 show":"form-group2  hidden" }>
                              <label className="col-lg-2 col-sm-2 control-label">วันสิ้นสุดเป้าหมาย</label>
                              <div className="col-sm-3">
                            <div className='input-group date' id='datetimepicker1'>
                                <input type='date' className="form-control" name="endDate" value={this.state.endDate} onChange={this.handleChange} min={this.state.startDate}/>
                            <span className="input-group-addon">
                                <span className="glyphicon glyphicon-calendar"></span>
                             </span>

                            </div>
                            <span id="endDate" className="error-message"></span>
                        </div>
                          </div>
                    </div>
                        <div className="text-right">
                            <button type="submit" className="btn btn-success">บันทึก</button>
                            <Link to={ {pathname: `/goalmanagement`} }><button type="button" className="btn btn-danger">ยกเลิก</button></Link>
                            
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

  
  export default GoalCreate;