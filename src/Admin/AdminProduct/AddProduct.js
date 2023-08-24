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

        this.changeName=this.changeName.bind(this);
        this.changeCategory=this.changeCategory.bind(this);
        this.changePrice=this.changePrice.bind(this);
        this.changeQuantity=this.changeQuantity.bind(this);
        this.addProduct=this.addProduct.bind(this);
    }

    navigateToPage = (url) => {
        window.location.href = url;
    }

    changeName= (event) =>{
        this.setState({name:event.target.value});
    }
    changeCategory=(event)=>{
        this.setState({category:event.target.value});
    }
    changePrice=(event)=>{
        this.setState({price:event.target.value});
    }
    changeQuantity=(event)=>{
        this.setState({count: event.target.value});
    }

    addProduct =(e)=>
    {
        e.preventDefault();
        let products={name: this.state.name, category: this.state.category, price: parseInt(this.state.price,10),count : parseInt(this.state.count) };
        console.log(products.name);
        AdminService.saveProduct(products).then((res)=>
        {
            if(res.data.error)
            window.alert(res.data.msg);
            else
            window.confirm(res.data.msg);
            this.navigateToPage('/admin/product/viewall');
        });
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
                                <input type="text" placeholder='Enter Product Category' name='category' value={this.state.category} onChange={this.changeCategory} className='form-control'/>
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label>Product Name :</label>
                                <input type="text" placeholder='Enter Product Name' name='name' value={this.state.name} onChange={this.changeName} className='form-control'/>
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label>Product Price :</label>
                                <input type="text" placeholder='Enter Product Price' name='price' value={this.state.price} onChange={this.changePrice} className='form-control'/>
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label>Product Quantity :</label>
                                <input type="text" placeholder='Enter Product Quantity' name='quantity' value={this.state.count} onChange={this.changeQuantity} className='form-control'/>
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
