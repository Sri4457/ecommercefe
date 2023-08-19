import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommonService from '../Service/CommonService';
import UserService from '../Service/UserService';

export default function ViewProducts() {
    const userid=parseInt(useParams().id);
    const [products,setProducts]=useState([]);
    const [qty,setQty]=useState(0);
    

    const navigateToPage = (url) =>
    {
        window.location.href = url;
    }
    useEffect(()=>{
        
        CommonService.getAllProducts().then((res)=>{
            setProducts(res.data);
        })
    },[])

    const changeQty = (event)=>{
        setQty(event.target.value);
    }

    const addCart = (e) =>{
        
        let cart={userid: userid, productname: e.name,productcat: e.category,price: e.price, qty: qty};
        UserService.addToCart(cart).then((res)=>{
            console.log(res);
            if(res.data.error)
            {
                window.alert(res.data.msg);
                navigateToPage(`/user/viewproducts/${userid}`);
            }
            else{
                window.confirm(res.data.msg);
                navigateToPage(`/user/viewcart/${userid}`);
            }
        })
    }

  return (
    <div >
        <h2 className='text-center'>Products List</h2>
        <div className='row'>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <td>Product Category</td>
                        <td>Product Name</td>
                        <td>Product Cost</td>
                        <td>No of items</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(
                            product =>
                            <tr key={product.id}>
                                <td>{product.category}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td><input type="text" name={qty} onChange={changeQty} className='form-control'></input></td>
                                <td><button type="button" onClick={()=> addCart(product)} class="btn btn-warning">Add To Cart</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
      </div>
  )
}
