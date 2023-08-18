import React, { useState } from 'react'
import AdminService from '../../Service/AdminService';

export default function DeleteProductsByQty() {

    const [qty,setQty]=useState(0);

    const changeQty = (event) => {
        setQty(event.target.value);
    }
    const navigateToPage = (url) => {
        window.location.href = url;
    }
    const deleteProducts = (e) =>{
        e.preventDefault();
        AdminService.deleteProductByQty(qty).then((res)=>
        {
            if(res.data.error)
            {
                window.alert(res.data.msg);
                navigateToPage("/admin/product/deletebyid");
            }
            else{
                window.confirm(res.data.msg);
                navigateToPage("/admin/product/viewall");
            }
        })
    }
  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h3 className='text-center'>Add Product</h3>
                    <div className='card-body'>
                    <form>
                        <div className='form-group'>
                            <label>Enter Quantity :</label>
                            <input type="text" placeholder='Enter Product Category' name='category' value={qty} onChange={changeQty} className='form-control'/>
                        </div>
                        <br></br>
                        <button type="button" onClick={deleteProducts} class="btn btn-danger">Delete</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
