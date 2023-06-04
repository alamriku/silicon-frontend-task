import apiRequest from "./ApiConfig";
import {IUserData} from  'src/models/User.d.ts';

interface IUserQuery {
    results: number;
}

class UserService {
    static getUsers(params:IUserQuery): Promise<any> {
        let url:string = '/api/';
        return apiRequest.get(url, params)
    }
}

export default UserService;
