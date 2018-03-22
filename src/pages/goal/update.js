import React, { Component } from "react";
import MainLayout from "../../components/main-layout";
import CommonApi from "../../api/common-api"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class GoalUpdate extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            goalName: "",
            description: "",
            startDate: "",
            endDate: "",
            categoryID: "",
            circleID: "",
            checklistName: [{value: null}],
            redirect: false,

        }
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddChecklist = this.handleAddChecklist.bind(this);
        this.handleRemoveChecklist= this.handleRemoveChecklist.bind(this);
        this.handleChecklistValueChange = this.handleChecklistValueChange.bind(this);
        this.handleValidate = this.handleValidate.bind(this);

      }

      componentWillMount() {
        let id = this.props.location.query.id;
        this.setState({id: id});
        this.apiGetUset(id);
      }

      apiGetUset(id){
        CommonApi.instance.get('/goal/getgoal/'+id)
        .then(response => {
            let responseData = response.data;
            this.setState(
              {
                goalName : responseData.goalName,
                description: responseData.description,
                startDate: responseData.startDate,
                startDate: responseData.startDate,
                endDate: responseData.endDate,
                categoryID: responseData.categoryID,
                circleID: responseData.circleID,
                checklistName: responseData.checklistName,

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

      handleAddChecklist= () => {
        this.setState({
            checklistName: this.state.checklistName.concat([{ value: null }])
        });
      }

      handleRemoveChecklist = (index) => () => {
        this.setState({
            checklistName: this.state.checklistName.filter((s, sidx) => index !== sidx)
        });
      }

      handleChecklistValueChange = (index) => (evt) => {
        const newChecklist = this.state.checklistName.map((checklistName, sidx) => {
          if (index !== sidx) return checklistName;
          return { ...checklistName, value: evt.target.value };
        });
    
        this.setState({ checklistName: newChecklist });
      }

      handleSubmit(event) {
        event.preventDefault();

        console.log(this.state);

        CommonApi.instance.post('/goal/update', this.state)
        .then(response => {
            if(response.status == 200 && response.data.result){
                this.setState({redirect: true});
            }else{
                this.handleValidate(response.data.message);
            }
        });
      }

    handleValidate(messages){
        let require = ["goalName","description","startDate"];
        require.forEach(element => {
            document.getElementById(element).innerHTML = null;
        });
        this.state.checklistName.map((checklistName, sidx) => {
            document.getElementById('checklistName['+sidx+']').innerHTML = null;
        });
        messages.forEach(element => {
            document.getElementById(element.key).innerHTML = element.message;
        });
    }

    render() {

      const { redirect } = this.state;

      if (redirect) {
        return <Redirect to='/goalmanagement'/>;
      }

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
                    <h4 className="mb"><i className="fa fa-angle-right"></i> แก้ไขข้อมูลเป้าหมาย</h4>
                    <form className="form-horizontal style-form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">ชื่อแบบเป้าหมาย</label>
                              <div className="col-sm-5">
                                    <input type="text" className="form-control" name="goalName" value={this.state.goalName} onChange={this.handleChange} />
                              </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 col-sm-2 control-label">คำอธิบาย</label>
                            <div className="col-sm-5">
                                <textarea className="form-control rounded-0" rows="5" name="description" value={this.state.description} onChange={this.handleChange}/>
                            </div>
                        </div>

                      
                        <div className="row">
                            <label className="col-sm-2 col-sm-2 control-label">รายการตรวจสอบ</label>
                            <div className="col-sm-5">
                                <button type="button" className="btn btn-primary" onClick={this.handleAddChecklist}>เพิ่ม</button>
                            </div>
                        </div>
                        {this.state.checklistName.map((checklistName, index) => (
                        <div className="row">
                            <label className="col-sm-2 col-sm-2 control-label"></label>
                            <div className="col-sm-5">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder={`รายการตรวจสอบที่ ${index + 1}`}
                                            value={checklistName.value} 
                                            onChange={this.handleChecklistValueChange(index)} />
                                    <span id={'checklistName['+index+']'} className="error-message"></span>
                                    <span className="input-group-btn">
                                        <button className="btn btn-danger" type="button" onClick={this.handleRemoveChecklist(index)} disabled={index==0 ? 'disabled' : ''}>ลบ</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        ))}
                          <div className="form-group">
                        </div>
                        <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">หมวดหมู่</label>
                              <div className="col-sm-5">
                                <div className="btn-group">
                                    <select className="form-control" name="category" value={this.state.category} onChange={this.handleChange}>
                                        <option value="0">--เลือกหมวดหมู่--</option>
                                        <option value="1">Web Application</option>
                                        <option value="2">Study</option>
                                        <option value="3">Learning</option>
                                        <option value="4">Web Moblie</option>
                                    </select>
                                </div>
                              </div>
                            </div>

                            <div className="form-group">
                              <label className="col-sm-2 col-sm-2 control-label">รอบการดำเนินงาน</label>
                              <div className="col-sm-5">
                                <div className="btn-group">
                                    <select className="form-control" name="circle" value={this.state.circle} onChange={this.handleChange}>
                                        <option value="0">--เลือกรอบการดำเนินงาน--</option>
                                        <option value="1">รายสัปดาห์</option>
                                        <option value="2">รายเดือน</option>
                                        <option value="3">รายปี</option>
                                    </select>
                                </div>
                              </div>
                            </div>

                        <div className="form-group">
                            <label className="col-sm-2 col-sm-2 control-label">วันเริ่มต้นเป้าหมาย</label>
                            <div className="col-sm-3">
                            <div className='input-group date' id='datetimepicker1'>
                                <input type='text' className="form-control" />
                            <span className="input-group-addon">
                                <span className="glyphicon glyphicon-calendar"></span>
                             </span>
                            </div>
                        </div>
                        </div>

                        <div className="form-group">
                              <label className="col-lg-2 col-sm-2 control-label">วันสิ้นสุดเป้าหมาย</label>
                              <div className="col-sm-5">
                                  <p className="form-control-static">02/22/2018</p>
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
  
  export default GoalUpdate;