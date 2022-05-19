// 配置路由 
import {createRouter,createWebHistory} from 'vue-router';

import routes from './routes'
import { getToken } from '@/utils/token';

const routerHistory = createWebHistory()
const router = createRouter({
  history:routerHistory,
  routes,
  scrollBehavior(to,from,savedPosition){
    return {top: 0}
  }
})

// 前置路由守卫判断是否需要满足条件
router.beforeEach((to,from,next)=>{
  let token = getToken()
  if(token){ // 用户已经登陆
    // 不能去登陆/注册
    if(to.path =='/login'|| to.path=='/register'){
      next('/home')
    }
    next()
  }else{ // 用户未登陆
    // 不能去个人中心
    if(to.path=='/center'){ 
      next('/login')
    }
    next()
  }
})

export default router