import { createApp } from 'vue'
import App from './App.vue'

// 引入路由
import router from '@/router'

// 三级联动组件 全局注册
import TypeNav from '@/components/TypeNav'
// 引入分液器组件 全局注册
import Pagination from '@/components/Pagination'

// 引入vuex
import store from '@/store'

// 测试
// import {reqCategoryList} from '@/api'
// reqCategoryList()

import '@/mock/mockServe';

import * as API from '@/api'

// 注册轮播图组件
import MySwiper from '@/components/MySwiper'

// 全局事件总线 on 函数
import mitt from "mitt"

const app = createApp(App);

app.use(router);
app.use(store);

// 创建事件总线
app.config.globalProperties.$bus = new mitt();
// 全局引入api
app.config.globalProperties.$api = API;

// 注册全局组件
app.component('type-nav',TypeNav);
app.component('my-swiper',MySwiper);
app.component('pagination',Pagination);
app.mount('#app')