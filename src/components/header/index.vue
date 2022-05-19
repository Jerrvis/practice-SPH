<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!haveUserInfo">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <p v-else>
            <router-link to="/center">{{userName}}</router-link>
            <a class="register" @click="logout">退出登陆</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <router-link to="/center">我的尚品汇</router-link>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, getCurrentInstance, onBeforeUnmount, computed } from "vue";
import { useStore } from 'vuex';
export default {
  name: "",
  setup() {
    const store = useStore()
    const router = useRouter();
    const route = useRoute();
    let keyword = ref("");
    const ins=getCurrentInstance()
    const bus= ins.appContext.config.globalProperties.$bus
    let goSearch = function () {
      // 字符串形式传参 搜索跳转路由 可传params
      // router.push('/search/'+this.keyword +'?k=' + this.keyword.toUpperCase())
      // 对象传参 params 需要路由命名
      let location = {
        name: "search",
        params: { keyword: this.keyword || undefined },
      };
      if (route.query) {
        location.query = route.query;
      }
      router.push(location);
      // 其他对象写法
      // router.push({path:'/search/'+this.keyword,query:{k:this.keyword.toUpperCase()}})
    }
    onMounted(()=>{
        bus.on("clearKeyword",()=>{
          keyword.value = '';
        });
        // 如果有token 则获取信息
        if(store.state.user.token){
          try {
            store.dispatch('getUserInfo')
          } catch (error) {
            // 失效错误，清理token重新登陆
            console.log(error)
          }
        }
      })

    onBeforeUnmount(()=>{
      bus.off("clearKeyword")
    })

    let haveUserInfo = computed(()=>{
      if(store.state.user.userInfo.name){
        userName.value = store.state.user.userInfo.name
        return true
      }
      return false
    })

    let userName = ref('')

    // 退出登陆
    let logout = function(){
      // 向服务器发送通知
      try {
        store.dispatch('userLogout')
        router.push('home')
      } catch (error) {
        console.log(error)
      }
    }
    return {
        goSearch,
        keyword,
        haveUserInfo,
        userName,
        logout
    };
  },
};
</script>

<style lang='less' scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>