import React, { useState } from 'react'
import AdminService from '../Service/AdminService';

export default function AddUser () {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [email,setEmail] = useState('');
  const userstatus='blocked';
  const [passmsg,setPassMsg]=useState('');
  const [emailmsg,setEmailMsg]=useState('');

  const navigateToPage = (url) => {
    window.location.href = url;
  }
  const changeUserName= (event) =>
    {
      setUsername(event.target.value);
    }
  const changeEmail= (event) =>
    {
      let em=event.target.value;
      if(em.length<10 || em.length>50)
      {
        setEmailMsg('Provide a email with valid length');
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
              setEmail(em);
              setEmailMsg('');
            }
            else{
              setEmailMsg("Enter Email that ends with com or in");
            }
          }
          else{
            setEmailMsg("Enter Email should be of gmail or yahoo");
          }
        }
        else{
          setEmailMsg('The email should contain @');
        }
      }
    }
    const changePassword =(event) =>
    {
      let pass=event.target.value;
      //console.log(pass.length);
      if(pass.length<8 || pass.length>15)
      {
        setPassMsg('Please Enter Valid Length');
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
          setPassword(pass);
          setPassMsg('');
        }
        else{
          setPassMsg('The Password should contain atleast one upperletter, one lower letter, one digit, one special character that accepts only @, #');
        }
      }
    }
  
   const adduser = (e) => {
      let users={username: username, password: password, email: email, userstatus: userstatus};
      AdminService.saveUser(users).then((res)=>{
        if(res.data.error)
        {
            window.alert(res.data.msg);
            navigateToPage('/user/add');
        }
        else{
            window.confirm(res.data.msg);
            navigateToPage('/');
        }
      });
    }
  return (
    <div>
      <div className='container'>
          <div className='container'>
              <div className='row'>
                  <div className='card col-md-6 offset-md-3 offset-md-3'>
                      <h3 className='text-center'>Add User</h3>
                      <div className='card-body'>
                          <form>
                              <div className='form-group'>
                                  <label>UserName :</label>
                                  <input type="text" placeholder='Enter UserName' name='username' value={username} onChange={changeUserName} className='form-control' required/>
                              </div>
                              <div className='form-group'>
                                  <label>Email :</label>
                                  <input type="email" placeholder='Enter Email' name='email' onChange={changeEmail} className='form-control' required/>
                                  <p>{emailmsg}</p>
                              </div>
                              <div className='form-group'>
                                  <label> Password :</label>
                                  <input type="password" placeholder='Enter Password' name='password'  onChange={changePassword} className='form-control' required/>
                                  <p>{passmsg}</p> 
                             </div>
                              <button type="button" onClick={adduser} class="btn btn-success">Add</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    </div>
  )
}
