// 配置路由 
import {createRouter,createWebHistory} from 'vue-router';

import routes from './routes'

const routerHistory = createWebHistory()
const router = createRouter({
  history:routerHistory,
  routes,
  scrollBehavior(to,from,savedPosition){
    return {top: 0}
  }
})

export default router