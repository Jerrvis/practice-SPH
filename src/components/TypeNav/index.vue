<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="showList">
          <div class="all-sort-list2" @click="goSearch">
            <!-- 鼠标在那个类名上，那个类名就存在class:cur -->
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a :data-categoryname="c1.categoryName"
                :data-category1id="c1.categoryId">{{ c1.categoryName }}</a>
                <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
              </h3>
              <!-- 二三级分类 -->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a :data-categoryname="c2.categoryName"
                      :data-category2id="c2.categoryId">{{ c2.categoryName }}</a>
                      <!-- <router-link to="/search">{{ c2.categoryName }}</router-link> -->
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryname="c3.categoryName"
                        :data-category3id="c3.categoryId">{{ c3.categoryName }}</a>
                        <!-- <router-link to="/search">{{ c3.categoryName }}</router-link> -->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>

      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { onMounted, customRef, ref } from "@vue/runtime-core";
import { useRoute, useRouter } from 'vue-router';
import { useStore, mapState } from "vuex";
import { throttle } from 'lodash';
export default {
  name: "TypeNav",
  // mapstate
  computed: {
    ...mapState({ categoryList: (state) => state.home.categoryList }),
  },
  setup() {
    let showList = ref(false)
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    // 组件挂载完毕 向服务器发送请求
    onMounted(() => {
      // 将请求得到的数据储存在仓库内
      // store.dispatch("categoryList", "home");
      // 组件挂载完毕
      if(route.path=='/home' || route.path =='/'){
        showList.value = true
      }
    });

    // 设置lodash节流器 每50ms只触发一次
    // 当前鼠标在那个元素
    // let currentIndex = ref(-1);
    let changeIndex = throttle(function (index) {
      currentIndex.value = index;
    },50)
    // 当前鼠标离开元素
    let leaveIndex = function () {
      currentIndex.value = -1;
      if(route.path != '/home' && route.path != '/'){
        showList.value = false;
      }
    }

    let enterShow = function () {
      showList.value = true;
    }


    //通过vue3的customRef去实现防抖
    function antishakeRef(value, delay) {
      let timer;
      return customRef((track, trigger) => {
        return {
          get() {
            track(); //告诉Vue这个value值是需要被“追踪”的
            return value;
          },
          set(newValue) {
            clearTimeout(timer);
            timer = setTimeout(() => {
              value = newValue;
              trigger(); //告诉Vue去更新界面
            }, delay);
          },
        };
      });
    }

    // 事件委派实现搜索功能
    let goSearch = function(event){
      //子节点a标签中加上 :dataCategoryName的自定义属性

      // 获取到当前触发时间的节点，需要带有dataCategory属性
      let element = event.target
      let {categoryname,category1id,category2id,category3id} = element.dataset;
      if(categoryname){
        let location = {name:'search'}
        let query = {categoryName:categoryname}
        if(category1id){
          query.category1Id = category1id
        }else if(category2id){
          query.category2Id = category2id
        }else if(category3id){
          query.category3Id = category3id
        }
        location.query = query
        if (route.params){
          location.params = route.params;
        }
        router.push(location)
      }
    }

    let isShowList = function(){
      showList = true;
    }
    
    // 设置防抖时间为5ms，初始化被跟踪数据为-1
    let currentIndex = antishakeRef(-1,50);
    

    return {
      changeIndex,
      currentIndex,
      leaveIndex,
      goSearch,
      showList,
      enterShow,
      isShowList
    };
  },
};
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          // style实现二三级分类隐藏
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background: skyblue;
        }
        // .item:hover{
        //   color: skyblue; // 添加鼠标悬停颜色
        // }
      }
    }
    // 过渡动画开始状态
    .sort-enter{
      height: 0;
      
    }
    // 过渡动画结束状态
    .sort-enter-to{
      height: 461px;
    }
    .sort-enter-active{
      transition: all .5s linear;
    }
  }
}
</style>
