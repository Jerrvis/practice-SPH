// 登录与注册模块的仓库

// 引入搜索函数
import { reqGetCode, reqLogin, reqRegister } from "@/api";

const state = {
  code:'',
  token:'',
};
const mutations = {
  GETCODE(state,code){
    state.code = code
  },
  LOGIN(state,user){
    
  }
};
const actions = {
  // 获取验证码请求,正常情况是发送到用户的手机上
  async getCode({commit},phone){
    let result = await reqGetCode(phone)
    if(result.code== 200){
      commit('GETCODE',result.data)
      return Promise.resolve('成功')
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 注册账号
  async register({commit},user){
    let result = await reqRegister(user)
    console.log(result,'res')
    if(result.code== 200){

      return '成功'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  async login({commit},user){
    let result = await reqLogin(user)
    console.log(result,'res')
    if(result.code== 200){
      return '成功'
    }else{
      return Promise.reject(new Error('fail'))
    }
  }
};
const getters = {
};

export default{
  state, mutations, actions, getters
}