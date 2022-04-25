// search 模块的仓库

// 引入搜索函数
import { reqGetSearchInfo } from "@/api";

const state = {
  searchList:{}
};
const mutations = {
  GETSEARCHLIST(state, value){
    // 返回的数据为对象
    state.searchList = value
  }
};
const actions = {
  async getSearchList({commit},params={}){
    let result = await reqGetSearchInfo(params);
    if(result.code == 200){
      commit("GETSEARCHLIST",result.data)
    }
  }
};
// getters主要作用是：简化仓库中的数据
// 可以把我们将来在组件中的数据简化一下
const getters = {
  // 传入的参数为当前search仓库的state，并非大仓库的state
  goodsList(state){
    return state.searchList.goodsList || []
  },
  trademarkList(state){
    return state.searchList.trademarkList || []
  },
  attrsList(state){
    return state.searchList.attrsList || []
  }
};

export default{
  state, mutations, actions, getters
}