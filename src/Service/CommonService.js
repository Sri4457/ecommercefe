import axios from 'axios';

const login_url="http://localhost:8080/login"
const view_all_products="http://localhost:8080/product/viewall";
const get_product_by_id="http://localhost:8080//product/viewbyid";
class CommonService
{
    login(Users)
    {
        return axios.post(login_url,Users);
    }
    getAllProducts(){
        return axios.get(view_all_products);
    }
    getProductById(id)
    {
        return axios.get(get_product_by_id+"/"+id);
    }
}
export default new CommonService()