<template>
  <div class="swiper-container" ref="sw">
    <div class="swiper-wrapper">
      <swiper 
      :modules="modules"
      :slides-per-view="1"
      :slidesPerView="3"
      :slidesPerGroup="2"
      :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }">
        <swiper-slide v-for="(slide, index) in skuImagesList" :key="slide.id">
          <img :src="slide.imgUrl" 
          :class="{ active:currentIndex == index}"
          @click="changeCurrentImageIndex(index)"/>
        </swiper-slide>
      </swiper>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
// import Swiper core and required modules
import { Navigation } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { ref } from '@vue/reactivity';
import { getCurrentInstance } from '@vue/runtime-core';
export default {
  name: "ImageList",
  props: ["skuImagesList"],
  components: { Swiper, SwiperSlide },

  setup(props,) {
    let skuImagesList = props.skuImagesList;
    // 绑定默认显示的第一张图片
    let currentIndex = ref(0);

    const bus = getCurrentInstance().appContext.config.globalProperties.$bus;

    // 修改当前显示的图片
    let changeCurrentImageIndex = function(index){
      currentIndex.value = index;
      // 通知 zoom修改图片
      bus.emit("changeCurrentImage",index)
    }

    return { 
      modules: [Navigation],
      skuImagesList,
      currentIndex,
      changeCurrentImageIndex
    };
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 400px;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>