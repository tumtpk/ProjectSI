import React, { Component } from "react";
import MainLayout from "../../components/main-layout";
import CommonApi from "../../api/common-api"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


class GoalCreateOtherUser extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            goalName: "",
            description: "",
            startDate: "",
            endDate: "2016-02-10",
            categoryID: 0,
            circleID: 0,
            checklists: [{value: null}],
            circleList: [],
            categoryList: []
        }
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddChecklists = this.handleAddChecklists.bind(this);
        this.handleRemoveChecklists = this.handleRemoveChecklists.bind(this);
        this.handleChecklistsValueChange = this.handleChecklistsValueChange.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
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


      handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
          [name]: value
        });
        document.getElementById(name).innerHTML = null;
      }

      handleAddChecklists = () => {
        this.setState({
            checklists: this.state.checklists.concat([{ value: null }])
        });
      }

      handleRemoveChecklists = (index) => () => {
        this.setState({
            checklists: this.state.checklists.filter((s, sidx) => index !== sidx)
        });
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

        CommonApi.instance.post('/goal/create', this.state)
        .then(response => {
            if(response.status == 200 && response.data.result){
                this.setState({redirect: true});
            }else{
                console.log(response.data.message)
                this.handleValidate(response.data.message);
            }
        });
      }

    handleValidate(messages){
        
        let require = ["goalName","description","categoryID","circleID","startDate"];
        require.forEach(element => {
           
            document.getElementById(element).innerHTML = null;
        });
        this.state.checklists.map((checklist, sidx) => {
            document.getElementById('checklists['+sidx+']').innerHTML = null;
        });
        messages.forEach(element => {
            console.log(element);
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
                <div className="text-center">
                <img src="/theme/img/pagenation1.jpg"  width="150" height="70" />
            </div>
                    <h4 className="mb"><i className="fa fa-angle-right"></i> กรอกข้อมูลเป้าหมาย</h4>
                    <form className="form-horizontal style-form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">ชื่อแบบเป้าหมาย<span className="error-message">*</span></label>
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

                      
                        <div className="row">
                            <label className="col-sm-2 col-sm-2 control-label">รายการตรวจสอบ<span className="error-message">*</span></label>
                            <div className="col-sm-5">
                                <button type="button" className="btn btn-primary" onClick={this.handleAddChecklists}>เพิ่ม</button>
                            </div>
                        </div>
                        {this.state.checklists.map((checklist, index) => (
                        <div className="row">
                            <label className="col-sm-2 col-sm-2 control-label"></label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder={`รายการตรวจสอบที่ ${index + 1}`}
                                            value={checklist.value} 
                                            onChange={this.handleChecklistsValueChange(index)} />
                                    <span id={'checklists['+index+']'} className="error-message"></span>
                                    <span className="input-group-btn">
                                        <button className="btn btn-danger" type="button" onClick={this.handleRemoveChecklists(index)} disabled={index==0 ? 'disabled' : ''}>ลบ</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        ))}
                          <div className="form-group">
                        </div>
                        <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">หมวดหมู่<span className="error-message">*</span></label>
                              <div className="col-sm-5">
                                <div className="btn-group">
                                <select className="form-control" name="categoryID" value={this.state.categoryID} onChange={this.handleChange}>
                        
                                    <option value="0">--เลือกหมวดหมู่--</option>
                                    {categoryList.map((category, index) => (
                                        <option value="{category.id}">{category.categoryName}</option>
                                    ))}
                                    </select>
                                    <span id="categoryID" className="error-message"></span>
                                </div>
                              </div>
                            </div>

                            <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">รอบการดำเนินงาน<span className="error-message">*</span></label>
                              <div className="col-sm-5">
                                <div className="btn-group">
                                    <select className="form-control" name="circleID" value={this.state.circleID} onChange={this.handleChange}>
                                    <option value="0">--เลือกรอบการดำเนินงาน--</option>
                                    {circleList.map((circle, index) => (
                                        <option value="{circle.id}">{circle.circleName}</option>
                                    ))}
                                    </select>
                                    <span id="circleID" className="error-message"></span>
                                </div>
                              </div>
                            </div>

                        <div className="form-group">
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
                        </div>

                        <div className="form-group">
                              <label className="col-lg-2 col-sm-2 control-label">วันสิ้นสุดเป้าหมาย</label>
                              <div className="col-sm-5">
                                  <p className="form-control-static" name="endDate">02/22/2018</p>
                              </div>
                          </div>
                        <div className="text-right">
                            <Link to={ {pathname: `/goal/createOtherUser`} }><button type="button" className="btn btn-info">กลับ</button></Link>
                            <Link to={ {pathname: `/goal/selectuser`} }><button type="submit" className="btn btn-success">ถัดไป</button></Link>
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
  
  export default GoalCreateOtherUser;