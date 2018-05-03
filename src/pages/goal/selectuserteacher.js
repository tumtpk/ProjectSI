import React, { Component } from "react";
import MainLayout from "../../components/main-layout";
import CommonApi from "../../api/common-api"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class GoalCreateOtherUserSelectUserTeacher extends Component { 

    constructor(props) {
        super(props);
        this.state = {
        goalName: "",
        description: "",
        startDate: "",
        endDate: "",
        categoryID: "",
        circleID: "",
        checklists: [{value: null}],
        redirect: false,
        firstname: null,
        lastname: null,
        status: 0,
        email:null,
        userTypeID:null,
        dataSearch: [],
        users: [],
        userID: null,
        redirect: false,
        hiddenAll: true,
        personalID: "",
       }
    
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleAddUsers = this.handleAddUsers.bind(this);
        // this.handleRemoveUsers = this.handleRemoveUsers.bind(this);
        this.handleAddTodoItem = this.handleAddTodoItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handledelTodoItem = this.handledelTodoItem.bind(this);
        this.handleAddAll= this.handleAddAll.bind(this);
        this.handledelAll = this.handledelAll.bind(this);   
      }

      componentWillMount() {
        // console.log(this.props.location.query);
        this.state.goalName = this.props.location.query.goalName;
        this.state.description = this.props.location.query.description;
        this.state.categoryID = this.props.location.query.categoryID;
        this.state.circleID = this.props.location.query.circleID;
        this.state.startDate = this.props.location.query.startDate;
        this.state.endDate = this.props.location.query.endDate;  
        this.state.checklists = this.props.location.query.checklists;
        this.state.circleType = this.props.location.query.circleType;
        this.setState(this.state);
        console.log(this.state)
        CommonApi.instance.get('/user/getuserByCommanderId', {

         })
         .then(response => {
             this.setState({dataSearch: response.data});
             console.log(this.state.dataSearch);
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


      handleChange(e) {
        this.setState({
          textvalue:e.target.value
        })
      }

      handleAddAll = () => (evt) => {
        
        for (let index = 0; index < this.state.dataSearch.length; index++) {
          if (this.state.dataSearch[index].isShow == true){
            this.state.dataSearch[index].isShow = false;
            this.state.users.push(this.state.dataSearch[index].userID);
          }
          else{
            this.state.dataSearch[index].isShow = false;
          }
        }

        this.setState({ 
          users: this.state.users, 
          dataSearch: this.state.dataSearch,
          hiddenAll: false
        });

        console.log(this.state.users);
      }

      

      handleAddTodoItem = (id, index) => (evt) => {
        this.state.users.push(id);
        this.state.dataSearch[index].isShow = false;
        // this.state.dataSearch[index].push({isShow: false});
        this.setState({
          users: this.state.users,
          dataSearch: this.state.dataSearch
        })

        console.log(this.state.users);
      }

      handledelAll = () => (evt) => {
        for (let index = 0; index < this.state.dataSearch.length; index++) {
          if (this.state.dataSearch[index.isShow == false]){
            this.state.dataSearch[index].isShow = true;
          }
          else{
            this.state.dataSearch[index].isShow = true;
          }
        }
        this.state.users = [];
        this.setState({ 
          users: this.state.users, 
          dataSearch: this.state.dataSearch,
          hiddenAll: true
        });

        console.log(this.state.users);
      }

      handledelTodoItem = (id, userIndex) => (evt) =>{
        this.state.dataSearch[userIndex].isShow = true;

        for (let index = 0; index < this.state.users.length; index++) {
          if(this.state.users[index] == id){
            this.state.users.splice(index, 1);
          }
        }

        this.setState({
          users: this.state.users,
          dataSearch: this.state.dataSearch
        })

        console.log(this.state.users);
      }

      handleSubmit(event) {
     //   event.preventDefault();
     console.log(this.state.users);
        CommonApi.instance.post('/goal/create',this.state)
        .then(response => {
            if(response.status == 200 && response.data.result){
                this.setState({redirect: true});
            }else{
                console.log(response.data.message)
            }
        });
      }

    renderFromSearch(){
      const { redirect } = this.state;

      if (redirect) {
        return <Redirect to='/goalmanagementOtherUser'/>;
      }

      return (
        <div className="row mt">
              <div className="col-lg-12">
                      <div className="content-panel">
                        <div className="text-center">
                        <img src="/theme/img/pagenation2.jpg"  width="150" height="70" />
                    </div>
                          <h4><i className="fa fa-angle-right"></i> รายการอาจารย์ในหลักสูตร</h4>
                          <hr />
                          <table className="table table-striped table-advance table-hover">
                            <thead>
                                <tr>
                                <th><button type="button" className={ this.state.hiddenAll == true ? "btn btn-theme03 btn-xs show":"btn btn-theme04 btn-xs hidden" } onClick={this.handleAddAll()} > เลือกทั้งหมด</button>
                                    <button type="button" className={ this.state.hiddenAll == true ? "btn btn-theme03 btn-xs hidden": "btn btn-theme04 btn-xs show" } onClick={this.handledelAll()} > เอาออกทั้งหมด</button>
                                </th>
                                  <th> รหัสนักศึกษา </th>
                                  <th> ชื่อ</th>
                                  <th> นามสกุล</th>
                                  <th> บทบาท </th>
                                  <th> สถานะ</th>
                                </tr>
                              </thead>
                              
                              <tbody>
                              { this.state.dataSearch.map((data,index) => (
                                <tr>
                                  <td>
                                    <button type="button" className={ data.isShow == undefined || data.isShow == true  ? "btn btn-theme03 btn-xs show ":"btn btn-theme03 btn-xs hidden" } onClick={this.handleAddTodoItem(data.userID, index)}><i className="fa fa-square-o"  > </i> </button>
                                    <button type="button" className={ data.isShow == undefined || data.isShow == true  ? "btn btn-theme03 btn-xs hidden ":"btn btn-theme03 btn-xs show" } onClick={this.handledelTodoItem(data.userID, index)}><i className="fa fa-check-square-o"></i> </button>
                                  </td>
                                  <td>{ data.personalID}</td>
                                  <td>{ data.firstname }</td>
                                  <td>{ data.lastname }</td>
                                  <td>{ data.userTypeID}</td>
                                  <td>{ (data.status == 1) ? "เปิดใช้งาน" : "ปิดใช้งาน" }</td>
                                </tr>
                              ))}
                              </tbody>
                              
                          </table>
                          <div className="text-right" style={{marginRight: '10px'}}>
                          <button type="button" className="btn btn-success" onClick={this.handleSubmit}> บันทึก </button>
                          <Link to={ {pathname: `/goal/createGoalCourse`, query: {goalName:this.state.goalName, description:this.state.description, startDate:this.state.startDate, endDate:this.state.endDate, checklists:this.state.checklists, category:this.state.categoryID, circle:this.state.circleID, userID:this.state.userID}} }><button type="button" className="btn btn-danger">ยกเลิก</button></Link>
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
  
  export default GoalCreateOtherUserSelectUserTeacher; 