import React, { Component } from "react";
import MainLayout from "../../components/main-layout";
import CommonApi from "../../api/common-api"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class GoalCreateOtherUserSelectUser extends Component { 

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
        this.setState(this.state);
        CommonApi.instance.post('/user/search', {
               firstname: this.state.firstname,
               lastname: this.state.lastname,
               status: this.state.status,
               email: this.state.email,
               userTypeID: this.state.userTypeID,
               userID:this.state.userID

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
            this.state.dataSearch[index].isShow = false;
            this.state.users.push(this.state.dataSearch[index].users);
        }

        this.setState({ 
          users: this.state.users, 
          dataSearch: this.state.dataSearch
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
            this.state.dataSearch[index].isShow = true;
        }
        this.state.users = [];
        this.setState({ 
          users: this.state.users, 
          dataSearch: this.state.dataSearch
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
                          <h4><i className="fa fa-angle-right"></i> รายการผู้ใต้บังคับบัญชา</h4>
                          <hr />
                          <table className="table table-striped table-advance table-hover">
                            <thead>
                                <tr>
                                  <th> ชื่อ</th>
                                  <th> นามสกุล</th>
                                  <th> บทบาท </th>
                                  <th> สถานะ</th>
                                  <th><button type="button" className="btn btn-theme03" onClick={this.handleAddAll()} > เลือกทั้งหมด</button>
                                      <button type="button" className="btn btn-theme04" onClick={this.handledelAll()} > เอาออกทั้งหมด</button></th>
                                </tr>
                              </thead>
                              
                              <tbody>
                              { this.state.dataSearch.map((data,index) => (
                                <tr>
                                  <td>{ data.firstname }</td>
                                  <td>{ data.lastname }</td>
                                  <td>{ data.userTypeID}</td>
                                  <td>{ data.status }</td>
                                  <td>
                                    <button type="button" className={ data.isShow == undefined || data.isShow == true  ? "btn btn-theme03 show ":"btn btn-theme04 hidden" } onClick={this.handleAddTodoItem(data.userID, index)}><i className="fa fa-check"> </i> เลือก</button>
                                    <button type="button" className={ data.isShow == undefined || data.isShow == true  ? "btn btn-theme04 hidden ":"btn btn-theme04 show" } onClick={this.handledelTodoItem(data.userID, index)}><i className="glyphicon glyphicon-remove"></i> เอาออก</button>
                                  </td>
                                </tr>
                              ))}
                              </tbody>
                              
                          </table>
                          <div className="text-right" style={{marginRight: '10px'}}>
                          <button type="button" className="btn btn-success" onClick={this.handleSubmit}> บันทึก </button>
                          <Link to={ {pathname: `/goal/createOtherUser`, query: {goalName:this.state.goalName, description:this.state.description, startDate:this.state.startDate, endDate:this.state.endDate, checklists:this.state.checklists, category:this.state.categoryID, circle:this.state.circleID, userID:this.state.userID}} }><button type="button" className="btn btn-danger">ยกเลิก</button></Link>
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