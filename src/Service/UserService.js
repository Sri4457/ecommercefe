import axios from 'axios'
const get_user_id="http://localhost:8080/user";
const get_id_by_uname="http://localhost:8080/user/getid";
const update_user="http://localhost:8080/user/update";
const add_to_cart="http://localhost:8080/user/addtocart";
const get_cart_by_userid="http://localhost:8080/user/getcartbyuname";
const delete_item_in_cart="http://localhost:8080/user/deleteitem";
const get_cart_by_id="http://localhost:8080/user/getcartbyCartid";
const update_cart="http://localhost:8080/user/updatecart";
const submit_cart="http://localhost:8080/user/submitcart";
const get_user_orders="http://localhost:8080/user/orders/vieworders";
const get_password_when_password_forget="http://localhost:8080/user/forgetpassword";

class UserService{

    getUserById(id)
    {
        return axios.get(get_user_id+"/"+id);
    }

    getIdByUname(uname)
    {
        return axios.get(get_id_by_uname+"/"+uname);
    }
    updateUser(user){
        return axios.put(update_user,user);
    }

    addToCart(Cart)
    {
        return axios.post(add_to_cart,Cart);
    }
    
    updateCart(cart)
    {
        return axios.put(update_cart,cart);
    }
    getCartByUId(id)
    {
        return axios.get(get_cart_by_userid+"/"+id);
    }

    getCartById(id)
    {
        return axios.get(get_cart_by_id+"/"+id);
    }
    deleteItemInCart(id)
    {
        return axios.delete(delete_item_in_cart+"/"+id);
    }

    submitcart(carts)
    {
        return axios.post(submit_cart,carts)
    }

    getOrdersByUId(id)
    {
        return axios.get(get_user_orders+"/"+id);
    }

    getPassword(uname)
    {
        return axios.get(get_password_when_password_forget+"/"+uname);
    }
}
export default new UserService();