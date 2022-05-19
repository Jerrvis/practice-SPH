<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div class="address clearFix" v-for="ad in addressList" :key="ad.id">
        <span
          class="username"
          :class="{ selected: ad.id == sentAddress }"
          @click="setSentAddress(ad)"
          >{{ ad.consignee }}</span
        >
        <p @click="setSentAddress(ad)">
          <span class="s1">{{ ad.fullAddress }}</span>
          <span class="s2">{{ ad.phoneNum }}</span>
          <span class="s3" v-show="ad.isDefault == '1'">默认地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span
          class="username"
          :class="{ selected: payment === 0 }"
          @click="setPayment(0)"
          >在线支付</span
        >
        <span
          class="username"
          style="margin-left: 5px"
          :class="{ selected: payment === 1 }"
          @click="setPayment(1)"
          >货到付款</span
        >
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail" v-if="orderInfo.orderDetailVoList">
        <h5>商品清单</h5>
        <ul
          class="list clearFix"
          v-for="good in orderInfo.orderDetailVoList[0].orderDetailList"
          :key="good.skuId"
        >
          <li>
            <img
              :src="good.imgUrl"
              style="width: 100px; height: 100px"
              alt=""
            />
          </li>
          <li>
            <p>
              {{ good.skuName }}
            </p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{ good.orderPrice }}</h3>
          </li>
          <li>X{{ good.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
          v-model="message"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b
            ><i>{{ orderInfo.totalNum }}</i
            >件商品，总商品金额</b
          >
          <span>¥{{ orderInfo.originalTotalAmount }}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:　<span>¥{{ orderInfo.totalAmount }}</span>
      </div>
      <button id="test" @click="testButton">测试</button>
      <div class="receiveInfo">
        寄送至:
        <span>{{}}</span>
        收货人：<span>张三</span>
        <span>15010658793</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
} from "@vue/runtime-core";
import { mapGetters, useStore } from "vuex";
import { reqSubOrder } from "@/api";
import { useRouter } from "vue-router";
export default {
  name: "Trade",
  setup(props) {
    const store = useStore();
    const api = getCurrentInstance().appContext.config.globalProperties.$api;
    const router = useRouter();

    onMounted(() => {
      store.dispatch("getUserAddress");
      store.dispatch("getOrderInfo");
      // 设置当前为默认地址
      addressList.value.forEach((item) => {
        if (item.isDefault == "1") {
          sentAddress.value = item.id;
          addressMsg = item;
        }
      });
      console.log("............");
    });

    let testButton = function () {
      // 添加一个测试用的按钮 <button id='test' @click="testButton">测试</button>
      console.log(orderInfo.detailArrayList);
    };

    let addressList = computed(
      mapGetters(["addressList"]).addressList.bind({ $store: store })
    );

    let orderInfo = computed(
      mapGetters(["orderInfo"]).orderInfo.bind({ $store: store })
    );

    // 地址ID
    let sentAddress = ref("-1");

    // 设置地址id
    let setSentAddress = function (ad) {
      sentAddress.value = ad.id;
      addressMsg = ad;
    };

    // 支付方式的值
    let payment = ref(0);

    // 改变支付方式
    let setPayment = function (code) {
      payment.value = code;
    };

    // 客户留言
    let message = ref("");

    // 地址信息
    let addressMsg = reactive({});

    let orderId = null

    // 发送订单
    let submitOrder = async function () {
      let { tradeNo,detailArrayList } = store.state.trade.orderInfo;
      let data = {
        consignee: addressMsg.consignee,
        consigneeTel: addressMsg.phoneNum,
        deliveryAddress: addressMsg.fullAddress,
        paymentWay: "ONLINE",
        orderComment: message.value,
        orderDetailList: detailArrayList
      };
        try {
          let result = await reqSubOrder(tradeNo, data);
          console.log(data)
          if(result.code === 200){
            console.log('success')
            orderId = result.data
            router.push(`/pay?orderId=`+orderId)
          }else {
            throw result.message
          }
        } catch (error) {
          alert(error)
        }
    };

    return {
      testButton,
      addressList,
      orderInfo,
      sentAddress,
      setSentAddress,
      payment,
      setPayment,
      message,
      submitOrder,
    };
  },
};
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;

      background: #feedef;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;

        li {
          line-height: 30px;

          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>