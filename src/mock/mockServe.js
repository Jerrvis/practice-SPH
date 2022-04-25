// 引入mockjs模块
import Mock from 'mockjs';

// 引入json数据格式(json文件不需要配置，默认暴露)
import banner from './banner.json'
import floor from './floor.json'

// mock数据：第一个参数请求地址 第二个数据 请求数据
Mock.mock('/mock/banner',{code:200,data:banner});
Mock.mock('/mock/floor',{code:200,data:floor});

