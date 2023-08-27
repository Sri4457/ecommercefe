import React, { Component } from 'react'
import AdminService from '../../Service/AdminService';

export default class ViewAllUsers extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            users : []
        }

    }
    componentDidMount(){
        AdminService.getUser().then((res) =>{
            this.setState({ users: res.data});
        });
    }
    
    blockUser =(id) =>{
        AdminService.blockUser(id).then((res)=>{
            if(res.data.error)
            {
                window.alert(res.data.msg);
            }
            else{
                window.confirm(res.data.msg);
                
            }
            window.location.href = '/admin/users/viewall';
        })
    }
    unblockUser =(id) =>{
        AdminService.releaseUser(id).then((res)=>{
            if(res.data.error)
            {
                window.alert(res.data.msg);
            }
            else{
                window.confirm(res.data.msg);
                
            }
            window.location.href = '/admin/users/viewall';
        })
    }
     deleteuser = (id) =>{
        AdminService.deletUser(id).then((res)=>{
            if(res.data.error)
            {
                window.alert(res.data.msg);
            }
            else{
                window.confirm(res.data.msg);
            }
            window.location.href = '/admin/users/viewall';
        })
    }

    vieworders=(id)=>{
        window.location.href=`/admin/user/orders/${id}`;
    }

  render() {
    return (
      <div className='container'>
        <h2 className='text-center'>Users List</h2>
        <div className='row'>
            {this.state.users.length>0 ? (
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <td>Users user Name</td>
                        <td>User Email</td>
                        <td>User Status</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.users.map(
                            user =>
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.userstatus}</td>
                                <td>{user.userstatus==='blocked' ? <button type="button" onClick={()=>this.unblockUser(user.id)} class="btn btn-success">UnBlock</button> : <button type="button" onClick={()=>this.blockUser(user.id)} class="btn btn-success">Block</button> }
                                &nbsp;&nbsp;&nbsp;&nbsp;<button type="button" onClick={()=> this.deleteuser(user.id)} class="btn btn-danger">Delete</button>
                                &nbsp;&nbsp;&nbsp;&nbsp;<button type="button" onClick={()=> this.vieworders(user.id)} class="btn btn-danger">View Orders</button>
                            
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            ):(
                <center>
                    <br></br>
                    <h4>No Users</h4>
                </center>
            )}
        </div>
      </div>
    )
  }
}
