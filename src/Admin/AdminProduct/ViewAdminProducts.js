import React, {useEffect, useState } from 'react'
import AdminService from '../../Service/AdminService';
import CommonService from '../../Service/CommonService';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export default function ViewAdminProducts() {

    const [products,setProduct]=useState([]);
    const [searchname,setSearchname]=useState('');

    const navigateToPage = (url) => {
        window.location.href = url;
    }
    useEffect(()=>
    {
        CommonService.getAllProducts().then((res) =>{
            setProduct(res.data)
             });
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

    const sortproducts = (e) =>{
        CommonService.getProductsBySort(e).then((res)=>{
            setProduct(res.data);
        })
    }

    const searchproducts = (event) =>{
        setSearchname(event.target.value);
        if(searchname==='')
        {
            CommonService.getAllProducts().then((res) =>{
                setProduct(res.data )
            });
        }
        else{
            console.log(searchname);
            CommonService.getProductBySearchName(searchname).then((res)=>{
                setProduct(res.data);
            })
        }
    }
    

  return (
    <div className='container'>
        <h2 className='text-center'>Products List</h2>
        <div className='row'>
        <div className="col-md-9">
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
            <div className="col-md-3">
                <input className="form-control" type='text' name='searchname' placeholder='Enter Product name to search' onKeyUp={searchproducts}></input>
                <p>{searchname}</p>
            </div>
        </div>
        <br></br>
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
                        products.map(
                            product =>
                            <tr key={product.id}>
                                <td>{product.category}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
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
        </div>
      </div>  )
}

// export default class ViewProducts extends Component {
//     constructor(props)
//     {
//         super(props);
//         this.state={
//             products: [],
//             searchname:''
//         }
        
//     }

//     navigateToPage = (url) => {
//         window.location.href = url;
//     }
//     navigateToPages = (id) => {
//         window.location.href = `/admin/product/update/${id}`;
//     }
//     componentDidMount (){
//         CommonService.getAllProducts().then((res) =>{
//             this.setState({ products: res.data })
//         });
//     }

//     deleteproduct = (id)=>{
//         AdminService.deleteProduct(id).then((res)=>{
//             if(res.data.error)
//             {
//                 window.alert(res.data.msg);
//             }
//             else
//             {
//                 window.confirm(res.data.msg);
//             }
//             this.navigateToPage("/admin/product/viewall");
//         })
//     }

//     updateproduct=(id)=>
//     {
//         this.navigateToPages(id);
//     }

//     sortproducts = (e) =>{
//         CommonService.getProductsBySort(e).then((res)=>{
//             this.setState({product: res.data});
//         })
//     }

//     searchproducts = (event)=>{
//         this.setState({searchname: event.target.value});
//         if(this.searchname==='')
//         {
//             CommonService.getAllProducts().then((res) =>{
//                 this.setState({ products: res.data })
//             });
//         }
//         else{
//             console.log(this.state.searchname);
//             CommonService.getProductBySearchName(this.state.searchname).then((res)=>{
//                 this.setState({products: res.data});
//             })
//         }
//     }

//   render() {
//     return (
//         <div className='container'>
//         <h2 className='text-center'>Products List</h2>
//         <div className='row'>
//         <div className="col-md-9">
//                 <DropdownButton id="dropdown-danger-button" title="Filter Products" className="d-flex justify-content-end">
//                     <Dropdown.Item onClick={()=> this.sortproducts('name-asc')}>Sort By Name Asc</Dropdown.Item>
//                     <Dropdown.Item onClick={()=> this.sortproducts('name-desc')}>Sort By Name Desc</Dropdown.Item>
//                     <Dropdown.Item onClick={()=> this.sortproducts('category-asc')}>Sort By Category Asc</Dropdown.Item>
//                     <Dropdown.Item onClick={()=> this.sortproducts('category-desc')} >Sort By Category Desc</Dropdown.Item>
//                     <Dropdown.Item onClick={()=> this.sortproducts('price-asc')}>Sort By Price Asc</Dropdown.Item>
//                     <Dropdown.Item onClick={()=> this.sortproducts('price-desc')}>Sort By Price Desc</Dropdown.Item>
//                     <Dropdown.Item onClick={()=> this.sortproducts('date-asc')}>Sort By Added Date Asc</Dropdown.Item>
//                     <Dropdown.Item onClick={()=> this.sortproducts('date-desc')}>Sort By Added Date Desc</Dropdown.Item>
//                 </DropdownButton>
//             </div>
//             <div className="col-md-3">
//                 <input className="form-control" type='text' name='searchname' value={this.state.searchname} placeholder='Enter Product to search' onInput={this.searchproducts}></input>
//                 <p>{this.state.searchname}</p>
//             </div>
//         </div>
//         <br></br>
//         <div className='row'>
//             <table className='table table-striped table-bordered'>
//                 <thead>
//                     <tr>
//                         <td>Product Category</td>
//                         <td>Product Name</td>
//                         <td>Product Cost</td>
//                         <td>Product Quantity</td>
//                         <td>Product Added Date</td>
//                         <td>Actions</td>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         this.state.products.map(
//                             product =>
//                             <tr key={product.id}>
//                                 <td>{product.category}</td>
//                                 <td>{product.name}</td>
//                                 <td>{product.price}</td>
//                                 <td>{product.count}</td>
//                                 <td>{product.date}</td>
//                                 <td><button type="button" onClick={()=>this.deleteproduct(product.id)} class="btn btn-danger" >Delete</button>
//                                 &nbsp;&nbsp;&nbsp;<button type="button" onClick={()=> this.updateproduct(product.id)} class="btn btn-warning">Update</button>
//                                 </td>
//                             </tr>
//                         )
//                     }
//                 </tbody>
//             </table>
//         </div>
//       </div>
//     );
//   }
// }
