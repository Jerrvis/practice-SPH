// 登录与注册模块的仓库

// 引入搜索函数
import { reqGetCode, reqLogin, reqLogout, reqRegister, reqUserInfo } from "@/api";
import { setToken, getToken } from "@/utils/token";


const state = {
  code:'',
  token:getToken(),
  userInfo:{}
};
const mutations = {
  GETCODE(state,code){
    state.code = code
  },
  LOGIN(state,data){
    state.token = data.token
  },
  USERINFO(state,data){
    state.userInfo = data
  },
  // 清理token
  CLEAR(state){
    state.token = '',
    state.userInfo = {},
    setToken('')
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
  // 登陆账号
  async login({commit},user){
    let result = await reqLogin(user)
    console.log(result,'登陆账号')
    if(result.code== 200){
      commit('LOGIN',result.data)
      setToken(result.data.token)
      return '成功'
    }else{
      throw '登录失败，请重新尝试'
    }
  },
  // 获取用户信息
  async getUserInfo({commit},user){
    let result = await reqUserInfo(user)
    console.log(result,'获取用户信息')
    if(result.code== 200){
      commit('USERINFO',result.data)
      return '成功'
    }else{
      commit('CLEAR')
      console.log('token失效,清理token')
      return Promise.reject(new Error('获取用户信息失败，请重新登陆'))
    }
  },
  // 退出登陆
  async userLogout({commit},user){
    let result = await reqLogout(user)
    if(result.code== 200){
      commit('CLEAR')
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