// cart 模块的仓库

import { reqCartList, reqDelSku, reqChangeSkuIsChecked } from "@/api";

const state = {
  carList: []
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.carList = cartList
  }
};
const actions = {
  // 发送请求获取购物车数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("GETCARTLIST", result.data[0].cartInfoList)
    }
  },
  // 发送请求删除商品
  async delSku({ commit },skuId) {
    let result = await reqDelSku(skuId);
    if (result.code == 200) {
      return 'ok'
    }else{
      return Promise.reject('fail')
    }
  },
  // 修改商品是否选中
  async changeSkuIsChecked({ commit },{skuId,isChecked}) {
    let result = await reqChangeSkuIsChecked(skuId,isChecked);
    if (result.code == 200) {
      return 'ok'
    }else{
      return Promise.reject('fail')
    }
  },
  // 删除全部选中的商品
  deleteAllChecked({ dispatch,getters }) {
    // context:小仓库：commit【提交mutations】 getters【计算属性】 dispatch【派发action】
    let PromiseAll = []
    getters.cartList.forEach(item => {
      if(item.isChecked == 1){
        let promise = dispatch('delSku',item.skuId)
        PromiseAll.push(promise)
      }
    });
    // 只要全部都成功才能成功
    // 有一个失败则算作失败
    return Promise.all(PromiseAll)
  },
  allChecked({ dispatch,getters },changeValue) {
    // context:小仓库：commit【提交mutations】 getters【计算属性】 dispatch【派发action】
    let PromiseAll = []
    getters.cartList.forEach(item => {
      if(item.isChecked != changeValue){
        let promise = dispatch('changeSkuIsChecked',{skuId:item.skuId,isChecked:changeValue})
        PromiseAll.push(promise)
      }
    });
    // 只要全部都成功才能成功
    // 有一个失败则算作失败
    return Promise.all(PromiseAll)
  }
};
const getters = {
  cartList(state) {
    return state.carList
  }
};

export default {
  state, mutations, actions, getters
}