// 交易使用的仓库

import { reqAddressInfo, reqOrderInfo } from "@/api";

const state = {
  addressList:[],
  orderInfo:[],
};
const mutations = {
  GETADDRESS(state,data){
    state.addressList = data
  },
  GETORDERINFO(state,data){
    state.orderInfo = data
  }
};
const actions = {
  // 获取地址列表
  async getUserAddress({commit}){
    let result = await reqAddressInfo()
    console.log(result)
    if(result.code== 200){
      commit('GETADDRESS',result.data)
      return Promise.resolve('成功')
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 获取订单列表
  async getOrderInfo({commit}){
    let result = await reqOrderInfo()
    console.log(result)
    if(result.code== 200){
      commit('GETORDERINFO',result.data)
      return Promise.resolve('成功')
    }else{
      return Promise.reject(new Error('fail'))
    }
  }
};
const getters = {
  addressList(state){
    return state.addressList
  },
  orderInfo(state){
    return state.orderInfo
  }
};

export default{
  state, mutations, actions, getters
}