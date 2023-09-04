import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserService from '../Service/UserService';

export default function UpdateUser() {
    const id=useParams().id;
    const [password,setPword]=useState('');
    const [email,setEmail]=useState('');
    const [userstatus,setStatus]=useState('');
    const [username,setId]=useState('');
    // const [addAddressButton, setAddressButton]=useState(false);
    const [address,setAddress]=useState('');
    // const [newaddress,setNewAddress]=useState();

    useEffect(()=>{
      
      UserService.getUserById(id).then((res)=>{
        setPword(res.data.password);
        setEmail(res.data.email);
        setStatus(res.data.userstatus);
        setId(res.data.username);
        setAddress(res.data.address);
      })
    },[])
    const navigateToPage  = (url)=>{
      window.location.href=url;
    }
    const changeEmail = (event)=>{
      setEmail(event.target.value);
    }
    const changePassword=(event)=>{
      setPword(event.target.value);
    }

    // const changeAddressButton = ()=>{
    //   setAddressButton(true);
    // }

    const changeAddress = (event)=>{
      setAddress(event.target.value);
      
    }

    // const changeNewAddress = (event)=>{
    //   setNewAddress(event.target.value);
      
    // }
    // const addAddress = ()=>{
    //   address.push(newaddress);
    //   setAddressButton(false);
    //   window.location.reload();
    // }

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
        navigateToPage(`/user/updateprofile/${id}`);
      })
    }
   
  return (
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
                                <input type="email" placeholder='Enter Email' name='email' value={email} onChange={changeEmail} className='form-control'/>
                            </div>
                            <div className='form-group'>
                                <label> Password :</label>
                                <input type="text" placeholder='Enter Password' name='password' value={password} onChange={changePassword} className='form-control'/>
                            </div>
                            <div className='form-group'>
                                <label> Address :</label>
                                {/* {
                                  address.map(
                                    (add,index)=>{ */}
                                      <input type="text" name='address' value={address} onChange={changeAddress} className='form-control'/>
                                    {/* }
                                  )
                                }   */}
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
  )
}

