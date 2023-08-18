import React, { Component } from 'react'
import AdminService from '../../Service/AdminService';

export default class ViewNewUsers extends Component {
    constructor(props)
    {
        super(props)

        this.state={
            users:[]
        }
    }

    componentDidMount(){
        AdminService.getAllNewUsers().then((res)=>
        {
            this.setState({users: res.data})
        });
        }
  render() {
    return (
        <div >
        <h2 className='text-center'>Users List</h2>
        <div className='row'>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <td>user Name</td>
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
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
      </div>
    )
  }
}
