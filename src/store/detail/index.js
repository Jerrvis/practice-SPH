// detail 模块的仓库

import { reqGoodInfo } from "@/api";

const state = {
  goodInfo:{}
};
const mutations = {
  GETGOODINFO(state,goodInfo){
    state.goodInfo = goodInfo
  }
};
const actions = {
  // 获取floor 数据
  async getGoodInfo({commit}, skuId){
    let result = await reqGoodInfo(skuId);
    if(result.code == 200){
      commit("GETGOODINFO",result.data);
    }
  }
};
const getters = {
  categoryView(state){
    return state.goodInfo.categoryView || {};
  },
  skuInfo(state){
    return state.goodInfo.skuInfo || {};
  },
  skuSaleAttrValueList(state){
    if(state.goodInfo.skuInfo != undefined){
      return state.goodInfo.skuInfo.skuSaleAttrValueList
    }
    return  [];
  }
};

export default {
  state, mutations, actions, getters
}