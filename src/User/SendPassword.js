import React from 'react'
import { useState } from 'react'
import UserService from '../Service/UserService';

export default function SendPassword() {

  const [username,setUname]=useState('');

  const navigateToPage = (url) => {
    window.location.href = url;
  }
  const changeUserName= (event) =>
    {
      setUname(event.target.value);
    }
  
   const getpassword = (e) => {
    if(username.length ===0 )
    {
        window.alert("Please Fill Username field");
        navigateToPage('/user/forgetpassword');
    }
    else{
      UserService.getPassword(username).then((res)=>{
        if(res.data.error)
        {
            window.alert(res.data.msg);
            navigateToPage('/user/forgetpassword');
        }
        else
        {
            window.confirm(res.data.msg);
            navigateToPage('/');
        }
      })
    }
    }
  return (
    <div>
        <br></br>
      <div className='container'>
          <div className='container'>
              <div className='row'>
                  <div className='card col-md-6 offset-md-3 offset-md-3'>
                      <h3 className='text-center'>Retrive Password</h3>
                      <div className='card-body'>
                          <form>
                              <label>User Name :</label>
                                  <input type="text" placeholder='Enter UserName' name='username' value={username} onChange={changeUserName} className='form-control' required/>
                             
                              <br></br>
                              <button type="button" onClick={getpassword} class="btn btn-success">Send Password</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    </div>
  )
}

