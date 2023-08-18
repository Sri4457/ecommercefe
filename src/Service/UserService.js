import axios from 'axios'
const get_user="http://localhost:8080/user";
const update_user="http://localhost:8080/user/update"

class UserService{
    getUser(user)
    {
        return axios.get(get_user+"/"+user);
    }
    updateUser(user){
        return axios.put(update_user,user);
    }
    
}
export default new UserService();