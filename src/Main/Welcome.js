import React, { Component } from 'react'
import CommonService from '../Service/CommonService';
import 'react-toastify/dist/ReactToastify.css';

export default class Welcome extends Component {
    constructor(props)
    {
      super(props);
      
      this.state ={
        username:'',
        password:''
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
    
    showMsg = (res) =>{
      if(res.data.error)
        {
          this.navigateToPage("/");
        }
        else if(this.state.username==="admin"){
          this.navigateToPage("/admin");
        }
        else{
          this.navigateToPage(`/user/${this.state.username}`);
        }
      };
  login = (e)=>
  {
    e.preventDefault();
    let users={username: this.state.username,password: this.state.password};
    CommonService.login(users).then((res)=>
    {
      this.showMsg(res);
    });
  }
  render()
  {
    
    return (
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
          <center><button type="submit" onClick={this.login} className="btn btn-primary">Submit</button></center>
      </form>
    </div>
    );
  }
}
