import axios from 'axios'
import store from "../../store/store.js";

/**设置拦截器每个请求都要加上token**/
axios.interceptors.request.use(

  config => {
    if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `${store.state.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });


export  default  axios ;
