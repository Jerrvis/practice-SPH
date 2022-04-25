<template>
  <div>
    <Header></Header>
    <!-- 路由组件 -->
    <router-view></router-view>
    <!-- <button @click="test">我是个按钮</button> -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/header'
import Footer from './components/footer'
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  name:'app',
  components:{Header,Footer},
  setup(){
    const store = useStore()
    // 获取商品分类三级列表的数据
    onMounted(()=>{
      store.dispatch("categoryList");
      store.dispatch('getBannerList');
      store.dispatch('getFloorList');
    })
  }
}
</script>

<style>

</style>