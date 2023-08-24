import React, { Component } from 'react'
import CommonService from '../Service/CommonService';
import 'react-toastify/dist/ReactToastify.css';

export default class Welcome extends Component {
    constructor(props)
    {
      super(props);
      
      this.state ={
        username:'',
        password:'',
        id:''
      }
      this.changeUsername=this.changeUsername.bind(this);
      this.changePassword=this.changePassword.bind(this);
      this.login=this.login.bind(this);
    }
    navigateToPage = (url) => {
      window.location.href = url;
    }
    changeUsername = (event)=>{
      this.setState({username: event.target.value});
    }
    changePassword = (event) =>{
      this.setState({password: event.target.value});
    }
    
  login = (e)=>
  {
    e.preventDefault();
    let users={username: this.state.username,password: this.state.password};
    
    CommonService.login(users).then((res)=>
    {
      if(res.data.error)
        {
          window.alert(res.data.msg);
          this.navigateToPage("/");
        }
        else if(res.data.id===1){
          window.confirm(res.data.msg);
          this.navigateToPage("/admin");
        }
        else
        {
          window.confirm(res.data.msg);
          this.navigateToPage(`/user/updateprofile/${res.data.id}`);
        }
    });
  }
  render()
  {
    
    return (
      
      <div className='container '>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      <div className='container'>
        
        <form className='container' >
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" id="username"  placeholder="Enter Username" onChange={this.changeUsername}/>
          </div>
          <br></br>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter Password"onChange={this.changePassword}/>
          </div>
          <br></br>
          <div className='row'>
            <button type="submit" onClick={this.login} className=" col-md-3 btn btn-success">Submit</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="col-md-3 btn btn-danger"> Register</button>
          </div>
      </form>
    </div>
    </div>
    );
  }
}
