import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Welcome from '../Main/Welcome';
import AddProduct from '../Admin/AdminProduct/AddProduct';
import ViewOrderBtwdates from'../Admin/ViewOrdersBtwDates';
import DeleteProductsByQty from '../Admin/AdminProduct/DeleteProductsByQty'
import HeaderComponent from '../Admin/AdminHeaderComponent';
import ViewAllUsers from '../Admin/AdminUser/ViewAllUsers';
import UpdateProduct from '../Admin/AdminProduct/UpdateProduct';
import UpdateUser from '../User/UpdateProfile';
import ViewUserProducts from '../User/ViewUserProducts';
import ViewCart from '../User/ViewCart';
import UpdateItem from '../User/UpdateItem';
import WelcomeHeader from '../common/WelcomeHeader';
import AdminAddUser from '../Admin/AdminUser/AdminAddUser';
import Admin from '../Admin/Admin';
import UserHeaderComponent from '../User/UserHeaderComponent';
import UserOrders from '../User/UserOrders';
import ViewOrders from '../Admin/ViewOrders';
import UpdateOrderStatus from '../Admin/UpdateOrderStatus';
import AddUser from '../User/AddUser';
import ViewProductsAdmin from '../Admin/AdminProduct/ViewProductsAdmin'
import SendPassword from '../User/SendPassword';
import UpdateOrdersInReport from '../Admin/UpdateOrdersInReport';

export default function RoutingComponent() {
  return (
    <Router>
          <Routes>
            <Route exact path='/' element={
              <>
                <WelcomeHeader/>
                <Welcome />
              </>
            }/>
            <Route path='/logout' element={
              <>
              <WelcomeHeader/>
              <Welcome />
            </>
            }/>
            <Route path='/admin' element={
              <>
              <HeaderComponent/>
              <Admin/>
              </>
            }/>
              <Route path='/admin/user/add' element={
              <>
                <HeaderComponent/>
                <AdminAddUser />
              </>
            }/>
              <Route path='/admin/product/add'  element={
              <>
                <HeaderComponent/>
                <AddProduct />
              </>
            }/>
              <Route path='/admin/product/viewall' element={
              <>
                <HeaderComponent/>
                <ViewProductsAdmin />
              </>
            }/>
              <Route path='/admin/countordersby' element={
              <>
                <HeaderComponent/>
                <ViewOrderBtwdates />
              </>
            }/>
              <Route path='/admin/users/viewall' element={
              <>
                <HeaderComponent/>
                <ViewAllUsers />
              </>
            }/>
              <Route path= '/admin/product/update/:id' element={
              <>
                <HeaderComponent/>
                <UpdateProduct />
              </>
            }/>   
              <Route path='/admin/product/deletebyqty' element={
              <>
                <HeaderComponent/>
                <DeleteProductsByQty />
              </>
            }/>
            <Route path='/admin/user/orders/:id' element={
                <>
                  <HeaderComponent/>
                  <ViewOrders/>
                </>
              }/>
              <Route path='/admin/user/orders/updatestatus' element={
                <>
                  <HeaderComponent/>
                  <UpdateOrderStatus/>
                </>
              }/>

              <Route path='/admin/user/orders/updatestatusinreport' element={
                <>
                  <HeaderComponent/>
                  <UpdateOrdersInReport/>
                </>
              }
              />

              <Route path='/user/add' element={
                <>
                  <WelcomeHeader/>
                  <AddUser></AddUser>
                </>
              }/>

              <Route path='/user/forgetpassword' element={
                <>
                  <WelcomeHeader/>
                  <SendPassword/>
                </>
              }/>

              <Route path='/user/:id' element={
                <>
                  <UserHeaderComponent/>
                  <UpdateUser/>
                </>
              }/>
              <Route path='/user/updateprofile/:id' element={
                <>
                <UserHeaderComponent/>
                <UpdateUser/>
                </>
              } /> 
              <Route path='/user/viewproducts/:id' element={
                <>  
                  <UserHeaderComponent/>
                  <ViewUserProducts/>
                </>
              } />
              <Route path='/user/viewcart/:id' element={
                <>
                  <UserHeaderComponent/>
                  <ViewCart/>
                </>
              }/>
              <Route path='/user/updatecartitem/:id/:cid' element={
                <>
                  <UserHeaderComponent/>
                  <UpdateItem/>
                </>
              }/>
              <Route path='/user/vieworders/:id' element={
                <>
                  <UserHeaderComponent/>
                  <UserOrders/>
                </>
              }/>
              
          </Routes>
      </Router>
  )
}
