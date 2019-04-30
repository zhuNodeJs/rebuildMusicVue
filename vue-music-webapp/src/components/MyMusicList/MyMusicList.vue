<template>
  <div class="my-music-list">
    <!-- 返回按钮 -->
    <div class="back" @click='back'>
      <i class="icon-back"></i>
    </div>
    <!-- 顶部的歌手的名字 -->
    <h1 class="title" v-html="title"></h1>

  </div>
</template>

<script>
  export default {
    name: 'MyMusicList',
    data () {
      return {

      }
    },
    props: {
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      },
      bgImage: {
        type: String,
        default: ''
      }
    },
    methods: {
      back() {
        this.$router.back();
      }
    },
    computed: {

    },
    mounted() {
      console.log('>>>>', this.songs)
      console.log('>>>>', this.title)
      console.log('>>>>', this.bgImage)
    },
    created () {

    },
    destroyed () {

    },
    watch: {
      songs(newVal) {
        console.log('传入的songs的值为：', newVal)
      }
    }
  }
</script>

<style scoped lang='scss'>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mixin.scss';

.my-music-list {
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  z-index: 100;
  background: $color-background;
  .back {
    position:absolute;
    top:0;
    left: 6px;
    z-index: 100;
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    @include no-wrap;
    text-align: center;
    font-size: $font-size-large;
    color: $color-text;
    line-height: 40px;

  }
}
</style>
