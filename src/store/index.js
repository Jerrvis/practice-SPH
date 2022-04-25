import Vuex from 'vuex';

// 引入模块仓库
import home from './home'
import search from './search'
import detail from './detail';

export default new Vuex.Store({
  modules:{home, search, detail} 
});