<template>
  <div>

  </div>
</template>

<script>
  import MyMusicList from '@/components/MyMusicList/MyMusicList'
  export default {
    name: 'MyRankDetail',
    components: {
      MyMusicList
    },
    data() {
      return {
        songs: []
      }
    },
    methods: {
      // 获取指定排行榜单的详情
      _getRankDetail() {
        // 禁止直接刷新详情页（获取不到排行 id)
        if (!this.rankList.id) {
          this.$router.push('/rank')
          return;
        }
      }
    },
    created() {
      // this._getRankDetail()
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
