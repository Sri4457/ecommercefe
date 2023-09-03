import React, { Component } from 'react'
import AdminService from '../Service/AdminService';
import CommonService from '../Service/CommonService';

export default class ViewOrders extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            dateone:'',
            datetwo:'',
            orders:[],
            category:[],
            setCat:''
        }
        this.changeFromDate=this.changeFromDate.bind(this);
        this.changeTodate=this.changeTodate.bind(this);
        this.getcount=this.getcount.bind(this);
        this.setSelectedCategory=this.setSelectedCategory.bind(this);
    }
    navigateToPage = (url)=>{
        window.location.href=url;
    }
    componentDidMount = (e)=>{
        
        CommonService.getAllCategories().then((res)=>{
            this.setState({ category: res.data});

        })

        AdminService.getAllOrders().then((res)=>{
            this.setState({orders: res.data});
        })
    }
    changeFromDate = (event)=>{
        this.setState({dateone: event.target.value});
    }
    changeTodate = (event) =>{
        this.setState({datetwo: event.target.value});
        
    }
    getcount = (e)=>{
        e.preventDefault();
        let dateDto={dateone: this.state.dateone, datetwo: this.state.datetwo, category: this.state.setCat};
        AdminService.getCountBySpecificDate(dateDto).then((res)=>
        {
            this.setState({orders: res.data});
        });
    }
    setSelectedCategory=(e)=>{
        this.setState({setCat: e.target.value});
    }

    updatestatus = (e)=>{
        const orderitem = `id=${e.uid}&e=${encodeURIComponent(JSON.stringify(e))}`;
        this.navigateToPage(`/admin/user/orders/updatestatusinreport?${orderitem}`);
    }
  render() {
    return (
        <div>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h3 className='text-center'>Get Count of Orders</h3>
                    <div className='card-body'>
                        <form>
                            <div className='form-group'>
                                <label>From Date :</label>
                                <input type="date" placeholder='Enter From date' name='dateone' value={this.state.dateone} onChange={this.changeFromDate} className='form-control'/>
                            </div>
                            <br></br>
                            <div className='form-group'>
                                <label>To date :</label>
                                <input type="date" placeholder='Enter To Date' name='datetwo' value={this.state.datetwo} onChange={this.changeTodate} className='form-control'/>
                            </div>
                            <br></br>
                            <select value={this.state.setCat} onChange={this.setSelectedCategory} >
                                <option value='select category'>Select Category</option>
                                {
                                    this.state.category.map(
                                        cat =>
                                        <option value={cat}>{cat}</option>
                                    )
                                }
                            </select>
                            <br></br>
                            <br></br>
                            <button type="button" onClick={this.getcount} class="btn btn-success">Get Count</button>
                            <br></br>
                        </form>
                    </div>
                </div>
            </div>
            <div className='row'>
                <h2 className='text-center'>Orders List</h2>
                <div className='row'>
                    {this.state.orders.length>0 ? (
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <td>User Id</td>
                                <td>Product Category</td>
                                <td>Product Name</td>
                                <td>Product Cost</td>
                                <td>No of items</td>
                                <td>Total Cost of product</td>
                                <td>Status of order</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.orders.map(
                                    order=>
                                    <tr key={order.id}>
                                        <td>{order.uid}</td>
                                        <td>{order.category}</td>
                                        <td>{order.pname}</td>
                                        <td>{order.pcost}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.cost}</td>
                                        <td>
                                            {order.order_status}
                                        </td>
                                        <td>
                                            <button className='btn btn-warning' onClick={()=> this.updatestatus(order)} >Update Status</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    ): (
                        <center>
                            <br></br>
                            <h4>No Orders</h4>
                        </center>
                    )}
                </div>
            </div>
        </div>
      </div>
    )
  }
}
