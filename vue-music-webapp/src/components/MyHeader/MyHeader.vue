<template>
  <div class="my-header">
    <div class="icon"></div>
    <h1 class="text">Children Music</h1>
    <!-- 跳转到个人中心 -->
    <router-link to="/user" class="mine" tag="div">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'MyHeader',
    data() {
      return {
      }
    }
  }
</script>

<style lang='scss' scoped>
@import "~common/scss/mixin.scss";
@import '~common/scss/const.scss';
.my-header {
  position: relative;
  height: 44px;
  text-align: center;
  color: $color-theme;
  font-size: 0;
  .icon {
    display: inline-block;
    width: 30px;
    height: 32px;
    vertical-align: top;
    @include bg-image('./logo');
    background-size: 30px 32px;
    margin-top: 6px;
    margin-right: 9px;
  }
  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: $font-size-large;
  }
  .mine {
    position: absolute;
    top: 0;
    right: 0;
    .icon-mine {
      display: block;
      padding: 12px;
      font-size: 20px;
      color: $color-theme;
    }
  }
}
</style>
