import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserService from '../Service/UserService';

export default function UserOrders() {
    const id=parseInt(useParams().id);
    const [orders,setOrders]=useState([]);

    useEffect(()=>{
        UserService.getOrdersByUId(id).then((res)=>{
            setOrders(res.data);
        })
    },[])
  return (
    <div className='container'>
        <h2 className='text-center'>Orders List</h2>
        { orders.length>0 ? (
        <div className='row'>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <td>Product Category</td>
                        <td>Product Name</td>
                        <td>Product Cost</td>
                        <td>No of items</td>
                        <td>Total Cost of product</td>
                        <td>Status of order</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(
                            cart =>
                            <tr key={cart.id}>
                                <td>{cart.category}</td>
                                <td>{cart.pname}</td>
                                <td>{cart.pcost}</td>
                                <td>{cart.quantity}</td>
                                <td>{cart.cost}</td>
                                <td>
                                    {cart.order_status}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            </div>
            ) : (
                <center>
                    <br></br>
                    <h4>No Orders</h4>
                </center>  
            )}
      </div>
  )
}
