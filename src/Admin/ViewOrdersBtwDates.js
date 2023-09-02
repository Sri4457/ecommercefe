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
            count:'',
            category:[],
            setCat:''
        }
        this.changeFromDate=this.changeFromDate.bind(this);
        this.changeTodate=this.changeTodate.bind(this);
        this.getcount=this.getcount.bind(this);
        this.setSelectedCategory=this.setSelectedCategory.bind(this);
    }
    
    componentDidMount = (e)=>{
        
        CommonService.getAllCategories().then((res)=>{
            this.setState({ category: res.data});

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
            this.setState({count: res.data.msg});
        });
    }
    setSelectedCategory=(e)=>{
        this.setState({setCat: e.target.value});
    }
  render() {
    return (
        <div className='container'>
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
                            <div className='form-group'>
                                <label>The Count :</label>
                                <br>
                                </br>
                                <p>{this.state.count}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
