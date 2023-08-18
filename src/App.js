import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import Welcome from './Main/Welcome';
import ViewNewUsers from './Admin/AdminUser/ViewNewUsers';
import AddProduct from './Admin/AdminProduct/AddProduct';
import ViewProducts from './Admin/AdminProduct/ViewProducts';
import AddUser from './common/AddUser';
import ViewOrders from'./Admin/ViewOrders';
import DeleteProductsByQty from './Admin/AdminProduct/DeleteProductsByQty'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HeaderComponent from './Admin/HeaderComponent';
import ViewAllUsers from './Admin/AdminUser/ViewAllUsers';
import UpdateProduct from './Admin/AdminProduct/UpdateProduct';
import UpdateUser from './User/UpdateUser';
import { useEffect } from 'react';

function App() {
  
  return(
      <Router>
        <HeaderComponent/>
        <div className='container'>
          <Routes>
            <Route path='/' exact element={<Welcome/>} ></Route>
              <Route path='/user/add' element={<AddUser/> } />
              <Route path='/admin/user/viewnewusers' Component={ViewNewUsers} />
              <Route path='/admin/product/add'  Component={AddProduct} />
              <Route path='/admin/product/viewall' Component={ViewProducts} />
              <Route path='/admin/countordersby' Component={ViewOrders} />
              <Route path='/admin/users/viewall' Component={ViewAllUsers}/>
              <Route path= '/admin/product/update/:id' Component={UpdateProduct } />   
              <Route path='/admin/product/deletebyqty' Component={DeleteProductsByQty}/> 


              <Route path='/user/:uname' Component={UpdateUser}/>   
          </Routes>
        </div>
      </Router>
  )
}

export default App;
