import axios from 'axios';

const login_url="http://localhost:8080/login"
const view_all_products="http://localhost:8080/product/viewall";
const get_product_by_id="http://localhost:8080/product/viewbyid";
const sort_product="http://localhost:8080/product/sort";
const search_product_by_name="http://localhost:8080/product/search";
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
    getProductsBySort(pname)
    {
        return axios.get(sort_product+"/"+pname);
    }
    getProductBySearchName(name)
    {
        return axios.get(search_product_by_name+"/"+name);
    }
}
export default new CommonService()