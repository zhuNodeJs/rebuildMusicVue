<template>
  <div class="my-slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <!-- 轮播点 -->
    <div class="dots">
      <span v-for="(dot, index) in dots" :key="index" :class="{active: currentDotsIndex === index}" class="dot"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
// import
  export default {
    name: 'MySlider',
    data() {
      return {
        dots: []
      }
    },

  }
</script>

<style lang='scss' scoped>
@import "~common/scss/const.scss";
@import "~common/scss/mixin.scss";


</style>
