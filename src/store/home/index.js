// home 模块的仓库

import {reqCategoryList, reqGetBannerList, reqGetFloorList} from "@/api";

const state = {
  // count:0,
  categoryList:[],
  bannerList:[],
  floorList:[]
};
const mutations = {
  // countADD(state,value){
  //   state.count += value;
  // },
  CATEGORYLIST(state,value){
    state.categoryList = value;
  },
  GETBANNERLIST(state,value){
    state.bannerList = value;
  },
  GETFLOORLIST(state,value){
    state.floorList = value;
  }
};
const actions = {
  // countAdd({commit}){
  //   commit('countADD',1);
  // },
  async categoryList({commit}){
    let result = await reqCategoryList();
    if (result.code == 200){
      commit("CATEGORYLIST",result.data)
    }
  },
  // 获取首页轮播图
  async getBannerList({commit}){
    let result = await reqGetBannerList();
    if(result.code == 200){
      commit("GETBANNERLIST",result.data)
    }
  },
  // 获取floor 数据
  async getFloorList({commit}){
    let result = await reqGetFloorList();
    if(result.code == 200){
      commit("GETFLOORLIST",result.data)
    }
  }
};
const getters = {};

export default {
  state, mutations, actions, getters
}