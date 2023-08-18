import axios from 'axios';

const login_url="http://localhost:8080/login"
class CommonService
{
    login(Users)
    {
        return axios.post(login_url,Users);
    }
}
export default new CommonService()