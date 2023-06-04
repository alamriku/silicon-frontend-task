import axios, {CreateAxiosDefaults, AxiosResponse} from "axios";
import {BASE_API_URL} from "src/consts/envConstant";
import qs from "qs";

const getHeaders = () => {
    let commonHeaders: any = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    };

   return commonHeaders;
};

const axiosConfig: CreateAxiosDefaults = {
    baseURL: BASE_API_URL,
    headers: getHeaders(),
    withCredentials: false,
    timeout: 30000,
};

const instance = axios.create(axiosConfig);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        switch (response.status) {
            case 200:
                return response
            default:
                alert('Application error');
                break;
        }

        return response;
    },
    function (error) {
        if (error.status == 429) {
            alert('Too much requested');
        }
        alert('server error');
        return Promise.reject(error);
    },
);

const CancelToken = axios.CancelToken;
const isCancel = axios.isCancel;

const responseBody = (response: AxiosResponse) => response.data;

export async function get(url: string, filter = {}, ) {
    let config = {
        params: filter,
        paramsSerializer(params: any) {
            return qs.stringify(params, {arrayFormat: "brackets"});
        },
    };
    return await instance.get(url, config).then(responseBody);
}


const apiRequest = {get, CancelToken, isCancel};

export default apiRequest;
