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
      if(res.data===null)
        {
          this.navigateToPage("/");
        }
        else if(res.data.id===1){
          this.navigateToPage("/admin");
        }
        else
        {
          console.log(res.data.id);
          this.navigateToPage(`/user/${res.data.id}`);
        }
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