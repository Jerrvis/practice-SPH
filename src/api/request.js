// 对于axios进行二次封装

import axios from 'axios';
// 引入进度条
import nprogress from 'nprogress';
// start ：进度条开始      done:进度条结束
// 引入进度条样式
import 'nprogress/nprogress.css';

import store from '@/store';

// 利用axios 方法create 创建一个实例
// request 就是 axios
const requests = axios.create({
  // 基础路径
  baseURL:'/api',
  // 代表请求超时时间为5s
  timeout:5000,
});

// 请求拦截器,发请求前，请求拦截器可以拦截，可以执行部分代码
requests.interceptors.request.use((config)=>{
  if(store.state.detail.uuid_token){
    // 给请求头添加userTempId(与后端协商好了)
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 给请求头添加token
  if(store.state.user.token){
    config.headers.token = store.state.user.token
    console.log(config.headers.token)
  }
  // 进度条开始
  nprogress.start();
  // config 为配置对象，
  //里面有header 请求头
  return config
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
  // 进度条结束
  nprogress.done();
  // 响应成功文档
  return res.data
},(error)=>{
  // 进度条结束
  nprogress.done();
  // 响应失败的回调函数
  return Promise.reject(new error('faild'))
})

export default requests;