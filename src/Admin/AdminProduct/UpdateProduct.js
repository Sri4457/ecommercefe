import React, { useState, useEffect } from 'react'
import AdminService from '../../Service/AdminService';
import { useParams } from 'react-router-dom';

export default function UpdateProduct(props) {
    const id=useParams();
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');
    const [category,setCat]=useState('');
    const [price,setPrice]=useState(0.0);

    useEffect(()=>{
        console.log(id.id);
        AdminService.getProductById(id.id).then((res)=>{
            setName(res.data.name);
            setCat(res.data.category);
            setCount(res.data.count);
            setPrice(res.data.price);
        })
    },[]);
    const navigateToPage = (url) => {
        window.location.href = url;
    }
    
    const changePrice= event=>{
        setPrice(event.target.value);
    }
    const changeQuantity= event=>{
        setCount(event.target.value);
    }

    const updateProduct = e =>
    {
        e.preventDefault();
        console.log(category)
        let products={name: name, category: category, price: parseFloat(price),count : parseInt(count) };
        AdminService.updateProduct(products).then((res)=>
        {
            if(res.data.error)
            {
                window.alert(res.data.msg);
                navigateToPage(`/admin/product/update/${id}`);
            }
            else{
                window.confirm(res.data.msg);
                navigateToPage('/admin/product/viewall');
            }
        });
    }

  return (
    <div className='container'>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h3 className='text-center'>Update Product</h3>
                    <div className='card-body'>
                        <form>
                        <div className='form-group'>
                                <label>Product Category :</label>
                                <input type="text" placeholder='Enter Product Category' name='category' value={category}  className='form-control' disabled/>
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label>Product Name :</label>
                                <input type="text" placeholder='Enter Product Name' name='name' value={name} className='form-control' disabled/>
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label>Product Price :</label>
                                <input type="text" placeholder='Enter Product Price' name='price' value={price} onChange={changePrice} className='form-control'/>
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label>Product Quantity :</label>
                                <input type="text" placeholder='Enter Product Quantity' name='quantity' value={count} onChange={changeQuantity} className='form-control'/>
                            </div>
                            <br></br>
                            <button type="button" onClick={updateProduct} class="btn btn-warning">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
  )
}


