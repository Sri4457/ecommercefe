import React, { Component } from 'react'
import AdminService from '../../Service/AdminService';

export default class ViewProducts extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            products: []
        }
    }

    navigateToPage = (url) => {
        window.location.href = url;
    }
    navigateToPages = (id) => {
        window.location.href = `/admin/product/update/${id}`;
    }
    componentDidMount (){
        AdminService.getAllProducts().then((res) =>{
            this.setState({ products: res.data })
        });
    }

    deleteproduct = (id)=>{
        AdminService.deleteProduct(id).then((res)=>{
            if(res.data.error)
            {
                window.alert(res.data.msg);
            }
            else
            {
                window.confirm(res.data.msg);
            }
            this.navigateToPage("/admin/product/viewall");
        })
    }

    updateproduct=(id)=>
    {
        this.navigateToPages(id);
    }
  render() {
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
                        <td>Product Quantity</td>
                        <td>Product Added Date</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.products.map(
                            product =>
                            <tr key={product.id}>
                                <td>{product.category}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.count}</td>
                                <td>{product.date}</td>
                                <td><button type="button" onClick={()=>this.deleteproduct(product.id)} class="btn btn-danger" >Delete</button>
                                &nbsp;&nbsp;&nbsp;<button type="button" onClick={()=> this.updateproduct(product.id)} class="btn btn-warning">Update</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
      </div>
    );
  }
}
