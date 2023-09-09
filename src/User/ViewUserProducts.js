import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommonService from '../Service/CommonService';
import UserService from '../Service/UserService';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export default function ViewProducts() {
    const username=useParams().username;
    const [products,setProducts]=useState([]);
    const [qty,setQty]=useState(0);
    const [productscat, setProductCat]=useState([]);
    const [selectedCategory,setCategory]=useState('');
    const [changedProd,setChangedProd]=useState([]);
    

    const navigateToPage = (url) =>
    {
        window.location.href = url;
    }
    useEffect(()=>{
        
        CommonService.getAllProducts().then((res)=>{
            setProducts(res.data);
            setChangedProd(res.data);
        })
        CommonService.getAllCategories().then((res)=>{
            setProductCat([...res.data].sort());
           // setProductCat([...productscat].sort());

        })
    },[])

    const changeQty = (event)=>{
        setQty(event.target.value);
    }

    const addCart = (e) =>{
        let cart={username: username, productname: e.name,productcat: e.category,price: e.price, qty: qty};
        UserService.addToCart(cart).then((res)=>{
            console.log(res);
            if(res.data.error)
            {
                window.alert(res.data.msg);
                navigateToPage(`/user/viewproducts/${username}`);
            }
            else{
                window.confirm(res.data.msg);
                navigateToPage(`/user/viewcart/${username}`);
            }
        })
    }

    const sortproducts =(e)=>{
        if(selectedCategory==='' )
        {
            CommonService.getProductsBySort(e).then((res)=>{
                setChangedProd(res.data);
            })
        }
        else{
            CommonService.getProductsBySortByCategory(selectedCategory,e).then((res)=>{
                setChangedProd(res.data);
            })
        }
    }

    const searchproducts = (event) =>{
        setChangedProd(changedProd.filter(prod=> prod.name.includes(event.target.value)));
    }
    const setSelectedCategory= (e)=>{
        setCategory(e.target.value);
        setChangedProd(products.filter(prod=> prod.category.includes(e.target.value)));
    }
  return (
    <div>
    <div className='container'>
        <h2 className='text-center'>Products List</h2>
        <div className='row'>
        <div className='col-md-3'>
            <select value={selectedCategory} onChange={setSelectedCategory} >
                <option value=''>Select Category</option>
                {
                    productscat.map(
                        product =>
                        <option value={product}>{product}</option>
                    )
                }
            </select>
        </div>
        <div className="col-md-6">
                <DropdownButton id="dropdown-danger-button" title="Filter Products" className="d-flex justify-content-end">
                    <Dropdown.Item onClick={()=> sortproducts('name-asc')}>Sort By Name Asc</Dropdown.Item>
                    <Dropdown.Item onClick={()=> sortproducts('name-desc')}>Sort By Name Desc</Dropdown.Item>
                    <Dropdown.Item onClick={()=> sortproducts('category-asc')}>Sort By Category Asc</Dropdown.Item>
                    <Dropdown.Item onClick={()=> sortproducts('category-desc')} >Sort By Category Desc</Dropdown.Item>
                    <Dropdown.Item onClick={()=> sortproducts('price-asc')}>Sort By Price Asc</Dropdown.Item>
                    <Dropdown.Item onClick={()=> sortproducts('price-desc')}>Sort By Price Desc</Dropdown.Item>
                    <Dropdown.Item onClick={()=> sortproducts('date-asc')}>Sort By Added Date Asc</Dropdown.Item>
                    <Dropdown.Item onClick={()=> sortproducts('date-desc')}>Sort By Added Date Desc</Dropdown.Item>
                </DropdownButton>
            </div>
            <div className='col-md-3'>
                <input className="form-control" type='text' name='searchname' placeholder='Enter Product name to search' onKeyUp={searchproducts}></input>
            </div>
        </div>
        <br></br>
        <div className='row'>
            {changedProd.length> 0 ? (
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <td>Product Category</td>
                        <td>Product Name</td>
                        <td>Product Cost</td>
                        <td>Avaliable stock</td>
                        <td>Date Product added</td>
                        <td>No of items to add in cart</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        changedProd.map(
                            product =>
                            <tr key={product.id}>
                                <td>{product.category}</td>
                                <td>{product.name}</td>
                                <td>$ {product.price}</td>
                                <td>{product.count}</td>
                                <td>{product.date}</td>
                                <td><input type="text" name={qty} onChange={changeQty} className='form-control'></input></td>
                                <td><button type="button" onClick={()=> addCart(product)} class="btn btn-warning">Add To Cart</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            ) : (
                <center>
                    <br></br>
                    <h4>No Products</h4>
                </center>
            )}
        </div>
      </div>
      </div>
  )
}
