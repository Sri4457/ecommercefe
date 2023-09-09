import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminService from '../Service/AdminService';

export default function ViewOrders() {
    const username=useParams().username;
    const [orders,setOrders]=useState([]);
    

    useEffect(()=>{
        console.log(username)
        AdminService.getOrdersByUname(username).then((res)=>{
            setOrders(res.data);
        })
    },[]);

    const navigateToPage= (url)=>{
        window.location.href=url;
    }

    const updatestatus= (e)=>{
        const orderitem = `username=${username}&e=${encodeURIComponent(JSON.stringify(e))}`;
        navigateToPage(`/admin/user/orders/updatestatus?${orderitem}`);
    }


  return (
    <div className='container'>
        <h2 className='text-center'>Orders List</h2>
        <div className='row'>
            {orders.length>0 ? (
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <td>Product Category</td>
                        <td>Product Name</td>
                        <td>Product Cost</td>
                        <td>No of items</td>
                        <td>Total Cost of product</td>
                        <td>Status of order</td>
                        <td>Order Date</td>
                        <td>Address</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(
                            order=>
                            <tr key={order.id}>
                                <td>{order.category}</td>
                                <td>{order.pname}</td>
                                <td>{order.pcost}</td>
                                <td>{order.quantity}</td>
                                <td>{order.cost}</td>
                                <td>
                                    {order.order_status}
                                </td>
                                <td>{order.orderdate}</td>
                                <td>{order.address}</td>
                                <td>
                                    <button className='btn btn-warning' onClick={()=> updatestatus(order)} >Update Status</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            ): (
                <center>
                    <br></br>
                    <h4>No Orders for this User</h4>
                </center>
            )}
        </div>
      </div>
  )
}
