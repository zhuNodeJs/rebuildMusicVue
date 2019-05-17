<template>
  <div class="my-progress-bar" ref="barRef" @click.stop='progressClick'>
    <div class="bar-inner">
      <!-- 已播放的进度 -->
      <div ref="progressRef" class="progress"></div>

      <!-- 小球 -->
      <div ref="btnRef"
           @touchstart.prevent='progressTouchstart'
           @touchmove.prevent='progressTouchmove'
           @touchend='progressTouchend'
           class='progress-btn-wrapper'>
        <div class="progress-btn"></div>
          </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyProgressBar',
  methods: {
    progressClick() {

    }
  }

}
</script>

<style lang='scss' scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mixin.scss';


</style>
