import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import Welcome from './Main/Welcome';
import ViewNewUsers from './Admin/AdminUser/ViewNewUsers';
import AddProduct from './Admin/AdminProduct/AddProduct';
import ViewAdminProducts from './Admin/AdminProduct/ViewAdminProducts';
import AddUser from './common/AddUser';
import ViewOrders from'./Admin/ViewOrders';
import DeleteProductsByQty from './Admin/AdminProduct/DeleteProductsByQty'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HeaderComponent from './Admin/HeaderComponent';
import ViewAllUsers from './Admin/AdminUser/ViewAllUsers';
import UpdateProduct from './Admin/AdminProduct/UpdateProduct';
import UpdateUser from './User/UpdateUser';
import ViewUserProducts from './User/ViewUserProducts';
import ViewCart from './User/ViewCart';
import UpdateItem from './User/UpdateItem';

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
              <Route path='/admin/product/viewall' Component={ViewAdminProducts} />
              <Route path='/admin/countordersby' Component={ViewOrders} />
              <Route path='/admin/users/viewall' Component={ViewAllUsers}/>
              <Route path= '/admin/product/update/:id' Component={UpdateProduct } />   
              <Route path='/admin/product/deletebyqty' Component={DeleteProductsByQty}/> 


              <Route path='/user/:id' Component={UpdateUser}/>   
              <Route path='/user/viewproducts/:id' Component={ViewUserProducts} />
              <Route path='/user/viewcart/:id' Component={ViewCart}/>
              <Route path='/user/updatecartitem/:cid' Component={UpdateItem}/>
          </Routes>
        </div>
      </Router>
  )
}

export default App;
