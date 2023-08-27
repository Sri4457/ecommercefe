import React, { useEffect, useState } from 'react'
import UserService from '../Service/UserService';
import { useParams } from 'react-router-dom';

export default function ViewCart() {

    const id=parseInt(useParams().id);
    const [carts,setCarts]=useState([]);
    

    useEffect(()=>{
        UserService.getCartByUId(id).then((res)=>
        {
            setCarts(res.data);
        })
    },[])

    const navigateToPage = (url) =>
    {
        window.location.href = url;
    }

   const deleteProduct= (id) =>{
    UserService.deleteItemInCart(id).then((res)=>{
        if(res.data.error)
        {
            window.alert(res.data.msg);
        }
        else{
            window.confirm(res.data.msg);
        }
        navigateToPage(`/user/viewcart/${id}`);
    })
   }

   const submitcart = ()=>{
    UserService.submitcart(carts).then((res)=>{
        if(res.data.error)
        {
            window.alert(res.data.msg);
            navigateToPage(`/user/viewcart/${id}`);
        }
        else{
            window.confirm(res.data.msg);
            navigateToPage(`/user/vieworders/${id}`);
        }
    })
   }

   const updatecart = (cid) =>{
    navigateToPage(`/user/updatecartitem/${id}/${cid}`);
   }

  return (
    <div className='container'>
        <h2 className='text-center'>Cart Item List</h2>
            {carts.length>0 ? (
                <div className='row'>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <td>Product Category</td>
                            <td>Product Name</td>
                            <td>Product Cost</td>
                            <td>No of items</td>
                            <td>Cost</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            carts.map(
                                cart =>
                                <tr key={cart.id}>
                                    <td>{cart.productname}</td>
                                    <td>{cart.productcat}</td>
                                    <td>{cart.price}</td>
                                    <td>{cart.qty}</td>
                                    <td>{cart.price*cart.qty}</td>
                                    <td><button type="button" onClick={()=> deleteProduct(cart.id)} class="btn btn-danger">Delete Item</button>
                                    &nbsp;&nbsp;&nbsp;<button type="button" onClick={()=> updatecart(cart.id)} class="btn btn-warning">Update Item</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh', 
                    }}
                >
                    <button className="btn btn-primary" onClick={()=> submitcart()}>Submit Cart</button>
                </div>
                </div>
            ):
            (
                <center>
                    <br></br>
                    <h4>No Items in Cart</h4>
                </center>
                
            ) }
        
      </div>
  )
}
