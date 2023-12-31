import axios from 'axios'

const view_all_users="http://localhost:8080/admin/user/viewall";
const view_all_new_users="http://localhost:8080/admin/user/viewnewusers"
const add_user="http://localhost:8080/user/add"
const add_product="http://localhost:8080/admin/product/add"
const view_orders="http://localhost:8080/admin/countordersby"
const delete_user="http://localhost:8080/admin/user/delete"
const update_user="http://localhost:8080/admin/user/block"
const release_user="http://localhost:8080/admin/user/release"
const delete_ptoduct="http://localhost:8080/admin/product/delete"
const get_product_by_id="http://localhost:8080/admin/product/findbyid"
const update_product="http://localhost:8080/admin/product/update"
const delete_product_by_qty="http://localhost:8080/admin/product/deletebyqty"
const get_orders_by_uname="http://localhost:8080/admin/user/viewordersbyuname"
const update_status_of_order="http://localhost:8080/admin/orders/updateorder"
const get_all_orders="http://localhost:8080/admin/viewallorders";
const get_categories_of_orders="http://localhost:8080/admin/viewallcategoriesoforders"
class AdminService{

    getUser(){
        return axios.get(view_all_users);
    }

    getAllNewUsers(){
        return axios.get(view_all_new_users);
    }

    saveUser(Users)
    {
        return axios.post(add_user,Users);
    }

    saveProduct(Products)
    {
        return axios.post(add_product,Products);
    }

    getProductById(id)
    {
        //console.log(id);
        return axios.get(get_product_by_id+"/"+id);
    }
    getCountBySpecificDate(DateDto)
    {
        return axios.post(view_orders,DateDto);
    }

    deletUser(id)
    {
        return axios.delete(delete_user+"/"+id);
    }

    blockUser(p)
    {
        return axios.put(update_user+"/"+p);
    }

    releaseUser(p)
    {
        return axios.put(release_user+"/"+p);
    }

    deleteProduct(id)
    {
        return axios.delete(delete_ptoduct+"/"+id);
    }

    updateProduct(p)
    {
        return axios.put(update_product,p);
    }

    deleteProductByQty(qty)
    {
        return axios.delete(delete_product_by_qty+"/"+qty);
    }

    getOrdersByUname(uname)
    {
        console.log(uname);
        return axios.get(get_orders_by_uname+"/"+uname);
    }

    updateOrderStatus(username,or)
    {
        return axios.put(update_status_of_order+"/"+username,or);
    }

    getAllOrders(){
        return axios.get(get_all_orders);
    }

    getAllCategories(){
        return axios.get(get_categories_of_orders);
    }

}

export default new AdminService()