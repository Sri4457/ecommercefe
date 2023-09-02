import axios from 'axios';

const login_url="http://localhost:8080/login"
const view_all_products="http://localhost:8080/product/viewall";
const get_product_by_id="http://localhost:8080/product/viewbyid";
const sort_product="http://localhost:8080/product/sort";
const search_product_by_name="http://localhost:8080/product/search";
const get_all_categpries="http://localhost:8080/product/viewallcategories";
const get_products_by_category="http://localhost:8080/product/getproductsbycategory";
const get_sort_products_by_category="http://localhost:8080/product/sortbycategory";
const get_products_by_name_by_category="http://localhost:8080/product/searchNameByCategory"
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
    getAllCategories(){
        return axios.get(get_all_categpries);
    }

    getProductsByCategory(cat)
    {
        return axios.get(get_products_by_category+"/"+cat);
    }
    getProductsBySortByCategory(category,path)
    {
        return axios.get(get_sort_products_by_category+"/"+category+"/"+path);
    }

    getProductsByCategoryBySearchName(category,name)
    {
        return axios.get(get_products_by_name_by_category+"/"+category+"/"+name);
    }
}
export default new CommonService()