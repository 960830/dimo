//1. 先导入axios对象
import axios from 'axios';

import config from '../config';

import { Toast } from 'vant';

let { baseUrl } = config;

//2. 创建axios的对象
const Server = axios.create({
    baseURL: baseUrl, //基础url地址
    timeout: 3000,//超时时间
});

//3. 请求拦截器配置
Server.interceptors.request.use((config) => {
    if (!config.hideloading) {
        Toast.loading({
            forbidClick: true
        })
    }
    let token = sessionStorage.getItem('token');
    config.headers.authorization = 'Bearer ' + token;

    return config;
}, (error) => {
    return Promise.reject(error);
});

//4. 相应拦截器
Server.interceptors.response.use((response) => {
    // console.log(response);
    //过滤返回的data值
    Toast.clear();
    if (response.status == 200) {
        return response.data;
    }
    return response;
}, (error) => {
    return Promise.reject(error);
});

//5. 抛出对象接口
export default Server;