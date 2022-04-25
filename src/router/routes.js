
const routes = [
  {
    path:'/',
    component:()=> import('../pages/Home'),
    meta:{show:true}
  },
  {
    path:'/home',
    component:()=> import('../pages/Home'),
    meta:{show:true}
  },
  {
    name:'search',
    path:'/search/:keyword?', // keyword站位符 接受params参数(?表示可传可不传)
    component:()=> import('../pages/Search'),
    meta:{show:true},
    // props:true, // 布尔写法 允许props传参 用params传参
    // props:{a:1,b:2} // 对象写法 给路由租借额外传参
    
    // 函数写法
    props:(route) =>({keyword:route.params.keyword,k:route.query.k})
  },
  {
    path:'/login',
    component:()=> import('../pages/Login'),
    meta:{show:false}
  },
  {
    path:'/register',
    component:()=> import('../pages/Register'),
    meta:{show:false}
  },
  {
    path:'/detail/:skuid',
    component:()=> import('../pages/Detail'),
    meta:{show:true}
  }

]


export default routes
