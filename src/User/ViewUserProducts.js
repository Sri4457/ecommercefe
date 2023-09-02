import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommonService from '../Service/CommonService';
import UserService from '../Service/UserService';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export default function ViewProducts() {
    const userid=parseInt(useParams().id);
    const [products,setProducts]=useState([]);
    const [qty,setQty]=useState(0);
    const [productscat, setProductCat]=useState([]);
    const [selectedCategory,setCategory]=useState('');
    
    

    const navigateToPage = (url) =>
    {
        window.location.href = url;
    }
    useEffect(()=>{
        
        CommonService.getAllProducts().then((res)=>{
            setProducts(res.data);
        })
        CommonService.getAllCategories().then((res)=>{
            setProductCat(res.data);

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

    const sortproducts =(e)=>{
        //console.log(selectedCategory);
        if(selectedCategory==='select category' ||selectedCategory==='' )
        {
            CommonService.getProductsBySort(e).then((res)=>{
                setProducts(res.data);
            })
        }
        else{
            CommonService.getProductsBySortByCategory(selectedCategory,e).then((res)=>{
                setProducts(res.data);
            })
        }
    }

    const searchproducts = (event) =>{
       // console.log(event.target.value);
        if(event.target.value==='')
        {
            if(selectedCategory==='select category' ||selectedCategory==='' )
            {
                CommonService.getAllProducts().then((res) =>{
                    setProducts(res.data )
                });
            }
            else{
                CommonService.getProductsByCategory(selectedCategory).then((res)=>{
                    setProducts(res.data);
                })
            }
        }
        else
        {
            if(selectedCategory==='select category' ||selectedCategory==='' )
            {
                CommonService.getProductBySearchName(event.target.value).then((res) =>{
                    setProducts(res.data )
                });
            }
            else{
                CommonService.getProductsByCategoryBySearchName(selectedCategory,event.target.value).then((res)=>{
                    setProducts(res.data);
                })
            }
        }
        
    }
    const setSelectedCategory= (e)=>{
        setCategory(e.target.value);
        if(e.target.value==='select category')
        {
            CommonService.getAllProducts().then((res)=>{
                setProducts(res.data);
            })
        }
        else{
            CommonService.getProductsByCategory(e.target.value).then((res)=>{
                setProducts(res.data);
            })
        }
    }
  return (
    <div>
    <div className='container'>
        <h2 className='text-center'>Products List</h2>
        <div className='row'>
        <div className='col-md-3'>
            <select value={selectedCategory} onChange={setSelectedCategory} >
                <option value='select category'>Select Category</option>
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
            {products.length> 0 ? (
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
                        products.map(
                            product =>
                            <tr key={product.id}>
                                <td>{product.category}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
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
