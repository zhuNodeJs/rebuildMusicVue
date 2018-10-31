<template>
  <transition name="slide" class="my-rank-detail">
    <my-music-list></my-music-list>
  </transition>
</template>

<script>
import MyMusicList from '@/components/MyMusicList/MyMusicList'
  export default {
    name: 'rankdetail',
    components: {
      MyMusicList
    }
  }
</script>

<style scoped lang='scss'>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mixin.scss';

.my-rank-detail {

}
.slide-enter-active, .slide-leave-active {
  transition: all .3s ease;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
</style>
