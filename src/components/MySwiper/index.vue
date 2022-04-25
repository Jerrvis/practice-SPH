<template>
  <swiper
    :loop="true"
    :modules="modules"
    :slides-per-view="1"
    :space-between="50"
    navigation
    :autoplay="true"
    :pagination="{ clickable: true }"
  >
  <!-- :scrollbar="{ draggable: addScrollbar }" -->
    <swiper-slide
      class="swiper-slide"
      v-for="carousel in list"
      :key="carousel.id"
    >
      <img :src="carousel.imgUrl" />
    </swiper-slide>
  </swiper>
</template>

<script>
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default {
  name: "myswiper",
  components: { Swiper, SwiperSlide },
  props: ["list"],
  setup() {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
    };
  },
};
</script>

<style>
</style>