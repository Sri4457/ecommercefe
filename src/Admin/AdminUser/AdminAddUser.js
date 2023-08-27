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
          userstatus: 'blocked',
          passmsg:'',
          emailmsg:''
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
      let em=event.target.value;
      if(em.length<10 || em.length>50)
      {
        this.setState({ emailmsg:'Provide a email with valid length'});
      }
      else
      {
        if(em.search("@")>=0)
        {
          let index=em.lastIndexOf("@");
          let index1=em.lastIndexOf(".");
          if(em.substring(index+1,index1)==='gmail' || em.substring(index+1,index1)==='yahoo')
          {
            if(em.substring(index1+1)==="com" || em.substring(index1+1)==="in")
            {
              this.setState({email: em});
              this.setState({emailmsg: ''});
            }
            else{
              this.setState({ emailmsg: "Enter Email that ends with com or in"});
            }
          }
          else{
            this.setState({ emailmsg: "Enter Email should be of gmail or yahoo"});
          }
        }
        else{
          this.setState({emailmsg:'The email should contain @'});
        }
      }
    }
    changePassword =(event) =>
    {
      let pass=event.target.value;
      //console.log(pass.length);
      if(pass.length<8 || pass.length>15)
      {
        this.setState({passmsg: 'Please Enter Valid Length'});
      }
      else
      {
        let ucount=0,lcount=0,dcount=0,scount=0,ocount=0;
        for(let i=0;i<pass.length;i++)
        {
          //console.log(i);
          if(pass.charAt(i)>='a' && pass.charAt(i)<='z')
          lcount++;
          else if(pass.charAt(i)>='A' && pass.charAt(i)<='Z')
          ucount++;
          else if(pass.charAt(i)>='0' && pass.charAt(i)<='9')
          dcount++;
          else if(pass.charAt(i)==='@' || pass.charAt(i)==='#')
          scount++;
          else
          ocount++;
        }
        // console.log(ucount);
        if(lcount>=1 && ucount>=1 && dcount>=1 && scount>=1 && ocount===0)
        {
          this.setState({password: pass});
          this.setState({passmsg: ''});
        }
        else{
          this.setState({passmsg: 'The Password should contain atleast one upperletter, one lower letter, one digit, one special character that accepts only @, #'});
        }
      }
    }
  
    adduser = (e) => {
     
      e.preventDefault();
      
      let users={username: this.state.username, password: this.state.password, email: this.state.email, userstatus: this.state.userstatus};
      if(this.state.username.length === 0){
        window.alert('User Name should not be empty');
        this.navigateToPage('/admin/user/add');
      }
      else if(this.state.password.length===0)
      {
        window.alert('password should not be empty');
        this.navigateToPage('/admin/user/add');
      }
      else if(this.state.email.length===0)
      {
        window.alert('Email should not be empty');
        this.this.navigateToPage('/admin/user/add');
      }
      else{
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
                                  <input type="text" placeholder='Enter UserName' name='username' value={this.state.username} onChange={this.changeUserName} className='form-control' required/>
                              </div>
                              <div className='form-group'>
                                  <label>Email :</label>
                                  <input type="email" placeholder='Enter Email' name='email' onChange={this.changeEmail} className='form-control' required/>
                                  <p>{this.state.emailmsg}</p>
                              </div>
                              <div className='form-group'>
                                  <label> Password :</label>
                                  <input type="password" placeholder='Enter Password' name='password'  onChange={this.changePassword} className='form-control' required/>
                                  <p>{this.state.passmsg}</p> 
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
