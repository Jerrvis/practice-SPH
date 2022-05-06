// 当前这个模块：API进行统一管理
import requests from "./request";
import mockRequests from './mockAjax'

// 三级联动接口
export const reqCategoryList = ()=>{
  // 发送请求(已经配置),返回的结果为Promise对象
  return requests({url:'/product/getBaseCategoryList',method:'get'})
}

// 获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequests.get('/banner');
export const reqGetFloorList = () => mockRequests.get('/floor');

// 获取商品搜索数据
/**
 * 需要带参数
 * {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}

params参数至少为空对象
*/

export const reqGetSearchInfo = (params)=>requests({
  url:'/list',
  method:'post',
  data:params
});

// 获取单个商品详细参数
// url: api/item/{skuid}  方式:get
// 发送请求(已经配置),返回的结果为Promise对象
export const reqGoodInfo = (skuId)=>{
  return requests({url:`/item/${skuId}`,method:'get'})
}

// 将产品添加到购物车中
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>{
  return requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
}

// 获取购物车数据
export const reqCartList = ()=>{
  return requests({url:`/cart/cartList`,method:'get'})
}

// 删除商品
export const reqDelSku = (skuId)=>{
  return requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
}

// 修改商品选中状态
export const reqChangeSkuIsChecked = (skuId,isChecked)=>{
  return requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
}

// 获取验证码
export const reqGetCode = (phone)=>{
  return requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
}

// 注册账号
export const reqRegister = (data)=>{
  return requests({url:`/user/passport/register`,data,method:'post'})
}

// 登陆账号
export const reqLogin = (data)=>{
  return requests({url:`/user/passport/login`,data,method:'post'})
}