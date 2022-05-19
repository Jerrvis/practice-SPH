// detail 模块的仓库

import { reqGoodInfo,reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from '@/utils/uuid_token'

const state = {
  goodInfo:{},
  uuid_token:getUUID()
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
  },
  // 发送存入购物车，没有返回新数据，因此不需要存储
  // 因为是async 函数 必定返回的是promise
  async addOrUpdateShopCart({commit},{skuId,skuNum}){
    let result = await reqAddOrUpdateShopCart(skuId,skuNum)
    if(result.code == 200){
      return "ok"
    }else {
      return Promise.reject(new Error("fail"))
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