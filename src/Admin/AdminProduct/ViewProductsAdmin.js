import React from 'react'
import { useState } from 'react'
import AdminService from '../../Service/AdminService';
import CommonService from '../../Service/CommonService';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect } from 'react';
import './Products.css'

export default function ViewProductsAdmin() {
    const [products,setProduct]=useState([]);
    const [productscat, setProductCat]=useState([]);
    const [changedProd,setChangedProd]=useState([]);
    const [selectedCategory,setCategory]=useState('');
    
    const navigateToPage = (url) => {
        window.location.href = url;
    }
    useEffect(()=>
    {
        CommonService.getAllProducts().then((res) =>{
            setProduct(res.data)
            setChangedProd(res.data)
             });
        
        CommonService.getAllCategories().then((res)=>{
            setProductCat(res.data);

        })
    },[]);

    const deleteproduct = (id)=>{
        AdminService.deleteProduct(id).then((res)=>{
            if(res.data.error)
            {
                window.alert(res.data.msg);
            }
            else
            {
                window.confirm(res.data.msg);
            }
            navigateToPage("/admin/product/viewall");
        })
    }

    const updateproduct=(id)=>
    {
        navigateToPage(`/admin/product/update/${id}`);
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
        setChangedProd(products.filter(prod=> prod.name.includes(event.target.value) && prod.category.includes(selectedCategory)));
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
                <input className="form-control" type='text' name='searchname' placeholder='Enter Product name to search'  onChange={searchproducts}></input>
            </div>
        </div>
        <br></br>
        <div className='row'>
            {changedProd.length>0 ? (
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <td>Product Category</td>
                        <td>Product Name</td>
                        <td>Product Cost</td>
                        <td>Product Quantity</td>
                        <td>Product Added Date</td>
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
                                <td><button type="button" onClick={()=> deleteproduct(product.id)} class="btn btn-danger" >Delete</button>
                                &nbsp;&nbsp;&nbsp;<button type="button" onClick={()=> updateproduct(product.id)} class="btn btn-warning">Update</button>
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
