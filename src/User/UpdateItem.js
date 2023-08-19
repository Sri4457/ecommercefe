import React, { useEffect, useState } from 'react'
import CommonService from '../Service/CommonService';
import { useParams } from 'react-router-dom';
import UserService from '../Service/UserService';

export default function UpdateItem() {

    const cartid=parseInt(useParams().cid);
    const [prodname,setProdName]=useState('');
    const [prodcat,setProdCat]=useState('');
    const [price,setPrice]=useState(0);
    const [qty,setQty]=useState(0);
    const [userid,setUserId]=useState(0);
   
    const navigateToPage =(url)=>{
        window.location.href=url;
    }
    const changeQuantity = (event)=>{
        setQty(event.target.value);
    }

    useEffect(()=>{
        UserService.getCartById(cartid).then((res)=>{
            setProdName(res.data.productname);
            setProdCat(res.data.productcat);
            setPrice(res.data.price);
            setQty(res.data.qty);
            setUserId(res.data.userid);
        })
    },[]);

    const updateCart = e =>
    {
        e.preventDefault();
        let cart={id: cartid,userid: userid,productname:prodname, productcat: prodcat,price: price, qty: qty};
        UserService.updateCart(cart).then((res)=>{
            if(res.data.error)
            {
                window.alert(res.data.msg);
                navigateToPage(`/user/updatecartitem/${cartid}`);
            }
            else{
                window.confirm(res.data.msg);
                navigateToPage(`/user/viewcart/${userid}`);
            }
        })
    }

    const deleteitemincart=e =>{
        e.preventDefault();
        UserService.deleteItemInCart(cartid).then((res)=>{
            if(res.data.error)
            {
                window.alert(res.data.msg);
                navigateToPage(`/user/updatecartitem/${cartid}`);
            }
            else{
                window.confirm(res.data.msg);
                navigateToPage(`/user/viewcart/${userid}`);
            }
        })
    }
  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h3 className='text-center'>Update Cart Item</h3>
                    <div className='card-body'>
                        <form>
                        <div className='form-group'>
                                <label>Product Category :</label>
                                <input type="text" placeholder='Enter Product Category' name='prodcat' value={prodcat}  className='form-control' disabled/>
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label>Product Name :</label>
                                <input type="text" placeholder='Enter Product Name' name='prodname' value={prodname} className='form-control' disabled/>
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label>Product Price :</label>
                                <input type="text" placeholder='Enter Product Price' name='price' value={price} className='form-control' disabled/>
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label>Item Quantity in Cart :</label>
                                <input type="text" placeholder='Enter Product Quantity' name='qty' value={qty} onChange={changeQuantity} className='form-control'/>
                            </div>
                            <br></br>
                            <button type="button" onClick={updateCart} class="btn btn-warning">Update Item</button>
                            &nbsp;&nbsp;&nbsp; <button type="button" onClick={deleteitemincart} class="btn btn-danger">Delete Item</button>
                        
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
  )
}
