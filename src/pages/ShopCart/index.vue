<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="sku in cartList" :key="sku.skuId">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="sku.isChecked == 1"
              @click="changeIsChecked(sku)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="sku.imgUrl" />
            <div class="item-msg">{{ sku.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ sku.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeSkuNum(-1, sku)"
              >-</a
            >
            <input
              autocomplete="off"
              type="number"
              :value="sku.skuNum"
              @blur="writeSkuNum(sku)"
              minnum="1"
              class="itxt"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeSkuNum(1, sku)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ sku.skuNum * sku.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteSku(sku.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isCheckedAll"
          @click="changeAllChecked(isCheckedAll)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ sum }}</i>
        </div>
        <div class="sumbtn">
          <!-- <button @click="test">测试</button> -->
          <router-link to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { mapGetters, useStore } from "vuex";
export default {
  name: "ShopCart",
  setup(props) {
    const store = useStore();

    let getData = async function () {
      try {
        await store.dispatch("getCartList")
      } catch (error) {
        console.log(error)
      }
    };

    let cartList = computed(
      mapGetters(["cartList"]).cartList.bind({ $store: store })
    );

    onMounted(() => {
      getData();
    });

    let sum = computed(() => {
      let total = 0;
      // 判断是否有数据
      if (cartList.value) {
        total = cartList.value.reduce((total, cart) => {
          if (cart.isChecked) {
            total += cart.skuNum * cart.skuPrice;
          }
          return total;
        }, 0);
      }
      return total;
    });

    let isCheckedAll = computed(() => {
      if (cartList.value) {
        return cartList.value.every((item) => item.isChecked);
      }
      return false;
    });

    let test = function () {
      console.log(cartList.value);
    };
    // 全选改变商品选项
    let checkedAll = function () {
      if (isCheckedAll.value) {
        cartList.value.forEach((sku) => {
          sku.isChecked = 0;
        });
      } else {
        cartList.value.forEach((sku) => {
          sku.isChecked = 1;
        });
      }
    };

    // 防抖操作完成1s后修改
    let skuValue = 0;
    let timer;
    let changeSkuNum = function (changeValue, sku) {
      // 判断变化是否小于等于1，如果是则退出
      if (changeValue + sku.skuNum < 1) {
        return;
      }
      console.log(changeValue);
      skuValue += changeValue;
      sku.skuNum += changeValue;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        // 发送请求
        console.log(skuValue);
        const skuAdd = { skuId: sku.skuId, skuNum: skuValue };
        store.dispatch("addOrUpdateShopCart", skuAdd);
        skuValue = 0;
      }, 700);
    };

    // 输入框失去焦点后更改商品数量
    let writeSkuNum = function (sku) {
      console.log(sku);
      if (event.target.value < 1) event.target.value = 1;
      skuValue = event.target.value - sku.skuNum;
      console.log(skuValue);
      const skuAdd = { skuId: sku.skuId, skuNum: skuValue };
      skuValue = 0;
      store.dispatch("addOrUpdateShopCart", skuAdd).then(
        setTimeout(() => {
          getData();
        }, 100)
      );
    };

    // 删除商品
    let deleteSku = async function (skuId) {
      try {
        await store.dispatch("delSku", skuId)
      } catch (error) {
        console.log(error)
      }
    };

    // 改变选中状态
    let changeIsChecked = async function (sku) {
      sku.isChecked = !sku.isChecked;
      let isChecked = sku.isChecked ? "1" : "0";
      try {
        await store.dispatch("changeSkuIsChecked", { skuId: sku.skuId, isChecked })
      } catch (error) {
        console.log(error)
      }
    };

    // 删除全部选中的商品
    let deleteAllChecked =async function () {
      try {
        await store.dispatch("deleteAllChecked")
        getData()
      } catch (error) {
        console.log(error)
      }
    };

    // 所有商品选中
    let changeAllChecked =async function (isCheckedAll) {
      let changeValue = !isCheckedAll ? "1" : "0"
      try {
        await store.dispatch("allChecked",changeValue)
        getData()
      } catch (error) {
        console.log(error)
      }
    };

    return {
      cartList,
      sum,
      test,
      isCheckedAll,
      checkedAll,
      changeSkuNum,
      writeSkuNum,
      deleteSku,
      changeIsChecked,
      deleteAllChecked,
      changeAllChecked
    };
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>