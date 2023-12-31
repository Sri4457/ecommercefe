import React, { Component } from 'react'
import AdminService from '../../Service/AdminService';

export default class AddProduct extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            name:'',
            category:'',
            count:'',
            price: '',
        }

        
    }

    navigateToPage = (url) => {
        window.location.href = url;
    }

    changeInputField= (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addProduct =(e)=>
    {
        e.preventDefault();
        let products={name: this.state.name, category: this.state.category, price: parseInt(this.state.price,10),count : parseInt(this.state.count) };
        if(this.state.name.length===0)
        {
            window.alert('Name Should not be Empty');
            this.navigateToPage('/admin/product/add');
        }
        else if(this.state.category.length===0)
        {
            window.alert('Category Should not be Empty');
            this.navigateToPage('/admin/product/add');
        }
        else if(this.state.price.length===0)
        {
            window.alert('Price Should not be Empty');
            this.navigateToPage('/admin/product/add');
        }
        else if(this.state.count.length===0)
        {
            window.alert('No of Items Count Should not be Empty');
            this.navigateToPage('/admin/product/add');
        }
        else{
        AdminService.saveProduct(products).then((res)=>
        {
            if(res.data.error)
            {
                window.alert(res.data.msg);
                this.navigateToPage('/admin/product/add');
            }
            else
            {
                window.confirm(res.data.msg);
                this.navigateToPage('/admin/product/viewall');
            }
        });
    }
    }
  render() {
    
    return (
        <div className='container'>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h3 className='text-center'>Add Product</h3>
                    <div className='card-body'>
                        <form>
                            <div className='form-group'>
                                <label>Product Category :</label>
                                <input type="text" placeholder='Enter Product Category' name='category' value={this.state.category} onChange={this.changeInputField} className='form-control'/>
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label>Product Name :</label>
                                <input type="text" placeholder='Enter Product Name' name='name' value={this.state.name} onChange={this.changeInputField} className='form-control'/>
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label>Product Price :</label>
                                <input type="text" placeholder='Enter Product Price' name='price' value={this.state.price} onChange={this.changeInputField} className='form-control'/>
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label>Product Quantity :</label>
                                <input type="text" placeholder='Enter Product Quantity' name='count' value={this.state.count} onChange={this.changeInputField} className='form-control'/>
                            </div>
                            <br></br>
                            <button type="button" onClick={this.addProduct} class="btn btn-success">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
