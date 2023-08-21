import React, { Component } from 'react'
import AdminService from '../../Service/AdminService';
export default class AdminAddUser extends Component {
    constructor(props)
    {
      
      super(props);
  
      this.state={
          username:'',
          password:'',
          email:'',
          userstatus: 'blocked'
      }
  
      this.changeEmail=this.changeEmail.bind(this);
      this.changePassword=this.changePassword.bind(this);
      this.changeUserName=this.changeUserName.bind(this);
      this.adduser=this.adduser.bind(this);
    }
     
    navigateToPage = (url) => {
      window.location.href = url;
    }
    changeUserName= (event) =>
    {
      this.setState({username: event.target.value});
    }
    changeEmail= (event) =>
    {
      this.setState({email: event.target.value});
    }
    changePassword =(event) =>
    {
      this.setState({password: event.target.value});
    }
  
    adduser = (e) => {
     
      e.preventDefault();
      let users={username: this.state.username, password: this.state.password, email: this.state.email, userstatus: this.state.userstatus};
      
      AdminService.saveUser(users).then((res)=>{
        if(res.data.error)
        {
            window.alert(res.data.msg);
            this.navigateToPage('/amdin');
        }
        else{
            window.confirm(res.data.msg);
            this.navigateToPage('/admin/users/viewall');
        }
      });
    }
      render() {
      return (
        <div className='container'>
          <div className='container'>
              <div className='row'>
                  <div className='card col-md-6 offset-md-3 offset-md-3'>
                      <h3 className='text-center'>Add User</h3>
                      <div className='card-body'>
                          <form>
                              <div className='form-group'>
                                  <label>UserName :</label>
                                  <input type="text" placeholder='Enter UserName' name='username' value={this.state.username} onChange={this.changeUserName} className='form-control'/>
                              </div>
                              <div className='form-group'>
                                  <label>Email :</label>
                                  <input type="email" placeholder='Enter Email' name='email' value={this.state.email} onChange={this.changeEmail} className='form-control'/>
                              </div>
                              <div className='form-group'>
                                  <label> Password :</label>
                                  <input type="password" placeholder='Enter Password' name='password' value={this.state.password} onChange={this.changePassword} className='form-control'/>
                              </div>
                              <button type="button" onClick={this.adduser} class="btn btn-success">Add</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      )
    }
}
