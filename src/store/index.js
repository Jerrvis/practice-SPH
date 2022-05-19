import Vuex from 'vuex';

// 引入模块仓库
import home from './home'
import search from './search'
import detail from './detail';
import cart from './cart';
import user from './user';
import trade from './trade';

export default new Vuex.Store({
  modules:{home, search, detail, cart, user, trade} 
});