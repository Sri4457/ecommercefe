import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserService from '../Service/UserService';
import UserHeaderComponent from './UserHeaderComponent';

export default function UpdateUser() {
    const username=useParams().username;
    const [password,setPword]=useState('');
    const [passp,setPassMsg]=useState('');
    const [email,setEmail]=useState('');
    const [emailp,setEmailMsg]=useState('')
    const [userstatus,setStatus]=useState('');
    const [id,setId]=useState(0)

    // const [addAddressButton, setAddressButton]=useState(false);
    const [address,setAddress]=useState('');
    // const [newaddress,setNewAddress]=useState();

    useEffect(()=>{
      
      UserService.getUserById(username).then((res)=>{
        setId(res.data.id);
        setPword(res.data.password);
        setEmail(res.data.email);
        setStatus(res.data.userstatus);
        setAddress(res.data.address);
      })
    },[])
    const navigateToPage  = (url)=>{
      window.location.href=url;
    }
    const changeEmail= (event) =>
    {
      let em=event.target.value;
      setEmail(em);
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
      setPword(pass);
      //console.log(pass.length);
      if(pass.length<8 || pass.length>15)
      {
        setPword('Please Enter Valid Length');
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
          setPword(pass);
          setPassMsg('');
        }
        else{
          setPassMsg('The Password should contain atleast one upperletter, one lower letter, one digit, one special character that accepts only @, #');
        }
      }
    }
  

    // const changeAddressButton = ()=>{
    //   setAddressButton(true);
    // }

    const changeAddress = (event)=>{
      setAddress(event.target.value);
      
    }

    const updateuser = (e)=>{
      let user={id: id,username: username, password: password,email: email, userstatus: userstatus,address: address};
      UserService.updateUser(user).then((res)=>{
        if(res.data.error)
        {
          window.alert(res.data.msg);
          
        }
        else{
          window.confirm(res.data.msg);

        }
        navigateToPage(`/user/updateprofile/${username}`);
      })
    }
   
  return (
    <>

    <div className='container'>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h3 className='text-center'>Update User</h3>
                    <div className='card-body'>
                        <form>
                            <div className='form-group'>
                                <label>UserName :</label>
                                <input type="text" placeholder='Enter UserName' name='username' value={username} disabled className='form-control'/>
                            </div>
                            <div className='form-group'>
                                <label>Email :</label>
                                <input type="email"  name='email' value={email}  onChange={changeEmail} className='form-control'/>
                                <p>{emailp}</p>
                            </div>
                            <div className='form-group'>
                                <label> Password :</label>
                                <input type="text"  name='password' value={password}  onChange={changePassword} className='form-control'/>
                                <p>{passp}</p>                            
                            </div>
                            <div className='form-group'>
                                <label> Address :</label>
                                
                                      <input type="text" name='address' value={address} onChange={changeAddress} className='form-control'/>
                                    
                            </div>
                            {/* <button type='button' onClick={changeAddressButton}>Add Address</button>
                            {
                              addAddressButton &&
                              <div className='form-group'>
                                <label> New Address :</label>
                                <input type="text" placeholder='Enter New Address' value={newaddress} onChange={changeNewAddress} className='form-control'/>
                                <button type='button'onClick={addAddress} >Add</button>
                              </div>
                            } */}
                            <div className='form-group'>
                                <label> Status :</label>
                                <input type="text" placeholder='Your Status' name='userstatus' value={userstatus} disabled className='form-control'/>
                            </div>
                            <br></br>
                            <button type="button" onClick={updateuser} class="btn btn-success">Update</button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
      </>
  )
}

