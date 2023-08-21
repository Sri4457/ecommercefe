import React, { Component } from 'react'
import AdminService from '../Service/AdminService';

export default class ViewOrders extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            dateone:'',
            datetwo:'',
            count:''
        }
        this.changeFromDate=this.changeFromDate.bind(this);
        this.changeTodate=this.changeTodate.bind(this);
        this.getcount=this.getcount.bind(this);
    }
    
    changeFromDate = (event)=>{
        this.setState({dateone: event.target.value});
    }
    changeTodate = (event) =>{
        this.setState({datetwo: event.target.value});
        
    }
    getcount = (e)=>{
        e.preventDefault();
        let dateDto={dateone: this.state.dateone, datetwo: this.state.datetwo};
        AdminService.getCountBySpecificDate(dateDto).then((res)=>
        {
            this.setState({count: res.data.msg});
        });
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
