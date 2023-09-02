import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import AdminService from '../Service/AdminService';

export default function UpdateOrdersInReport() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const dataString = queryParams.get('e');
    const orders = JSON.parse(decodeURIComponent(dataString));
    const [status,setStatus]=useState('');

   useEffect(()=>{
    setStatus(orders.order_status);
   },[])
    const changeStatus = (event) =>{
        setStatus(event.target.value);
    }
    const navigateToPage=(url) =>{
        window.location.href=url;
    }
    const updateorderstatus = e =>{
        let updateorder={id: orders.id, pname: orders.pname, category: orders.category,status: status};
        AdminService.updateOrderStatus(id,updateorder).then((res)=>{
            if(res.data.error)
            {
                window.alert(res.data.msg);
                
            }
            else{
                window.confirm(res.data.msg);
               
            }
            navigateToPage('/admin/countordersby');
        })
    }
    
  return (
    <div className='container'>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h3 className='text-center'>Update Cart Item</h3>
                    <div className='card-body'>
                        <form>
                        <div className='form-group'>
                                <label>Product Category :</label>
                                <input type="text" placeholder='Product Category' name='prodcat' value={orders.category}  className='form-control' disabled/>
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label>Product Name :</label>
                                <input type="text" placeholder='Product Name' name='prodname' value={orders.pname} className='form-control' disabled/>
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label>Product Price :</label>
                                <input type="text" placeholder='Product Price' name='price' value={orders.pcost} className='form-control' disabled/>
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label>Items placed in order:</label>
                                <input type="text" placeholder='Places Item Quantity' name='qty' value={orders.quantity} disabled className='form-control'/>
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label>Order placed Date</label>
                                <input type="text" placeholder='Order Date' name='date' value={orders.time} disabled className='form-control'/>
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label>Total cost for this Order:</label>
                                <input type="text" placeholder='Total Cost' name='cost' value={orders.cost} disabled className='form-control'/>
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label>Order Status:</label>
                                <input type="text" placeholder='Order Status' name='status' value={status} onChange={changeStatus} className='form-control'/>
                            </div>
                            <br></br>
                            <button type="button" onClick={updateorderstatus} class="btn btn-warning">Update status</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
  )
}
