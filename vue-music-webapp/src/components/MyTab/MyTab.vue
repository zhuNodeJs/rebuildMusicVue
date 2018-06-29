<template>
  <div class="my-tab">
    <router-link :to="{path: '/recommend'}" tag="div" class="tab-item">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link :to="{path: '/singer'}" tag="div" class="tab-item">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link :to="{path: '/rank'}" tag="div" class="tab-item">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link :to="{path: '/search'}" tag="div" class="tab-item">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    name:'MyTab',
    data() {
      return {
      }
    }
  }
</script>

<style lang='scss' scoped>
@import "~common/scss/const.scss";
@import "~common/scss/mixin.scss";
.my-tab {
  @include display-flex;
  height: 44px;
  line-height: 44px;
  font-size: $font-size-medium;
  .tab-item {
    @include flex(1);
    text-align: center;
    .tab-link {
      padding-bottom: 5px;
      color: $color-text-l;
    }
    &.active {
      .tab-link {
        color: $color-theme;
        border-bottom: 2px solid $color-theme;
      }
    }
  }
}
</style>
