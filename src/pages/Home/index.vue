<template>
  <div>
    <!-- 三级联动已经注册为全局组件，不需要引用 -->
    <type-nav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor" />
    <Brand/>
    <!-- <button @click="add">点击我加1</button>
    <button>点击我减1</button>
    <span>仓库的数据{{count}}</span> -->
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
// 引入vuex
import { mapState } from 'vuex';
import store from '@/store'
import { computed } from '@vue/runtime-core'
export default {
  name:'Home',
  components: { 
    ListContainer, 
    Recommend, 
    Rank,
    Like,
    Floor,
    Brand 
  },
    computed:{
    ...mapState({floorList:(state)=> state.home.floorList})
  },
  setup(){
    // let count = computed(()=>{return store.state.home.count})
    // let add = ()=>{store.dispatch("countAdd",'home')}
    return {
      // count
    }
  }
  
}
</script>

<style>

</style>