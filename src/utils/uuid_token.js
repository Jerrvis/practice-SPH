import {v4 as uuidv4} from 'uuid'

export const getUUID = () =>{
  // 先从本地存储查找uuid
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  if(!uuid_token){
    // 如果没有临时生成身份
    uuid_token = uuidv4()
    // 本地存储一次
    localStorage.setItem('UUIDTOKEN',uuid_token)
    return uuid_token
  }else{
    // 如果有直接返回
    return uuid_token
  }
}