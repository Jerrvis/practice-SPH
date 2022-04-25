<template>
  <div class="spec-preview">
    <img :src="defaultImage" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="defaultImage" ref="bigImage"/>
    </div>
    <div class="mask" ref="maskBox"></div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { getCurrentInstance, onBeforeUnmount, onMounted } from "@vue/runtime-core";

export default {
  name: "Zoom",
  props: ["skuImagesList"],

  setup(props) {
    const bus = getCurrentInstance().appContext.config.globalProperties.$bus;

    // 设置默认图片(第一张)
    let defaultImage = ref(props.skuImagesList[0].imgUrl);

    onMounted(() => {
      // 监听 ImageList 修改图片
      bus.on("changeCurrentImage", (index) => {
        defaultImage.value = props.skuImagesList[index].imgUrl;
      });
    });

    onBeforeUnmount(()=>{
      bus.off("changeCurrentImage");
    });

    // 绑定DOM
    let maskBox = ref(null);
    let bigImage = ref(null);

    let handler = function(event){
      // console.log(event);
      // console.log(maskBox.value.offsetWidth)
      // 通过DOM获取鼠标移动事件参数
      let left = event.offsetX - maskBox.value.offsetWidth/2;
      let top = event.offsetY - maskBox.value.offsetHeight/2;

      // 确定边界
      if(left <= 0) left = 0;
      if(left >= maskBox.value.offsetWidth) left = maskBox.value.offsetWidth;
      if(top <= 0) top = 0;
      if(top >= maskBox.value.offsetHeight) top = maskBox.value.offsetHeight;
      
      // 遮罩层(绿色的那块)移动
      maskBox.value.style.left = left + 'px';
      maskBox.value.style.top = top + 'px';
      // 放大镜效果，图片窗口不动，让大图片移动两倍的小图移动距离
      bigImage.value.style.left = -2 * left + 'px';
      bigImage.value.style.top = -2 * top + 'px';
    }

    return { 
    defaultImage,
    handler,
    maskBox,
    bigImage
    };
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>