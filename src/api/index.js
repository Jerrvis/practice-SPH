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