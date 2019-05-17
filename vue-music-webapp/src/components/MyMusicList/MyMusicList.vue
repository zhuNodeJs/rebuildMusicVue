<template>
  <div class="my-music-list">
    <!-- 返回按钮 -->
    <div class="back" @click='back'>
      <i class="icon-back"></i>
    </div>
    <!-- 顶部的歌手的名字 -->
    <h1 class="title" v-html="title"></h1>

    <!-- 随机播放全部 -->
    <div ref="bgImageRef" class="bg-image" :style="bgStyle">
      <!-- 随机播放全部 -->
      <div ref="playRef" v-show="songs.length > 0" @click='playRandom' class="play-wrapper">
        <div class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>

      <!-- 蒙层 -->
      <div class="filter" ref="filterRef"></div>
    </div>

    <!-- 推层 -->
    <div class="bg-layer" ref="bgLayerRef"></div>

    <my-scroll class="list" @scroll='scroll' ref="scrollRef" :data='songs' :probe-type='probeType'
      :listen-scroll='listenScroll'>
      <div class="song-list-wrapper">
        <my-song-list @select='selectItem' :songs='songs' :rank='rank'></my-song-list>
      </div>

      <!-- 显示loading组件 -->
      <div v-show="!songs.length" class="loading-container">
        <my-loading></my-loading>
      </div>
    </my-scroll>
  </div>
</template>

<script>
  import MyLoading from '@/components/Base/MyLoading/MyLoading'
  import MySongList from '@/components/Base/MySongList/MySongList'
  import MyScroll from '@/components/Base/MyScroll/MyScroll'
  import { mapActions } from 'vuex'
  import { playlistMixin } from "@/common/js/mixin";

  const TRANSFORMY_RESERVED = 40

  export default {
    name: 'MyMusicList',
    mixins: [playlistMixin],
    components: {
      MyLoading,
      MySongList,
      MyScroll
    },
    data() {
      return {
        // 推层上移的距离
        scrollY: 0
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
      },
      // 子组件排行奖杯的图片
      rank: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      ...mapActions(['selectPlay', 'randomPlay']),
      handlePlayList(playlist) {
        // 当有迷你播放器时，调整滚动底部距离
        let bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.scrollRef.$el.style.bottom = bottom;
        this.$refs.scrollRef.refresh();
      },
      scroll(pos) {
        // console.log('distance>>>', pos)
        this.scrollY = pos.y
      },
      selectItem(item, index) {
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      playRandom() {
        console.log(this)
        this.randomPlay({
          list: this.songs
        })
      },
      back() {
        this.$router.back();
      }
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    mounted() {
      this.bgImageHeight = this.$refs.bgImageRef.clientHeight
      // console.log(this.bgImageHeight)
      // 滚动区域的初始的top, $el为DOM元素
      this.$refs.scrollRef.$el.style.top = `${this.$refs.bgImageRef.clientHeight}px`
      console.log('>>>', this.playlist)
    },
    created() {
      this.probeType = 3;
      this.listenScroll = true;
    },
    destroyed() {
    },
    watch: {
      // 推荐到动画模块
      scrollY(newVal) {
        // console.log('newVal>>>', newVal)
        let minscrollY = -this.bgImageHeight + TRANSFORMY_RESERVED
        let moveY = Math.max(minscrollY, newVal)
        let zIndex = 0

        this.$refs.bgLayerRef.style['transform'] = `translate3D(0, ${moveY}px, 0)`
        this.$refs.bgLayerRef.style['webkitTransform'] = `tanslated3d(0, ${moveY}px, 0)`

        let scale = 1
        let blur = 0

        const formula = Math.abs(newVal / this.bgImageHeight)

        if (newVal > 0) {
          zIndex = 10
          scale = 1 + formula
          this.$refs.bgImageRef.style['transform'] = `scale(${scale})`
          this.$refs.bgImageRef.style['webkitTransform'] = `scale(${scale})`
        } else {
          blur = Math.min(20 * formula, 20)
          this.$refs.filterRef.style['backdrop-filter'] = `blur(${blur}px)`
          this.$refs.filterRef.style['webkitBackdrop-filter'] = `blur(${blur}px)`
        }

        // 不推导顶，留一个部分
        if (newVal < minscrollY) {
          zIndex = 10
          this.$refs.bgImageRef.style.paddingTop = 0
          this.$refs.bgImageRef.style.height = `${TRANSFORMY_RESERVED}px`
          //  隐藏 随机播放按钮
          this.$refs.playRef.style.display = 'none'
        } else {
          this.$refs.bgImageRef.style.paddingTop = '70%'
          this.$refs.bgImageRef.style.height = 0
          // 显示 随机播放按钮
          this.$refs.playRef.style.display = 'block'
        }
        this.$refs.bgImageRef.style.zIndex = zIndex;
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
      position: absolute;
      top: 0;
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

    .bg-image {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 70%;
      transform-origin: top;
      background-size: cover;

      .play-wrapper {
        position: absolute;
        bottom: 20px;
        z-index: 50;
        width: 100%;

        .play {
          box-sizing: border-box;
          width: 135px;
          padding: 7px 0px;
          margin: 0 auto;
          text-align: center;
          border: 1px solid $color-theme;
          color: $color-theme;
          border-radius: 100px;
          font-size: 0;

          .icon-play {
            display: inline-block;
            vertical-align: middle;
            margin-right: 6px;
            font-size: $font-size-medium-x;
          }

          .text {
            display: inline-block;
            vertical-align: middle;
            font-size: $font-size-small;
          }
        }
      }

      .filter {
        position: absolute;
        top: 0;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
      }
    }

    .bg-layer {
      position: relative;
      height: 100%;
      background: $color-background;
    }

    .list {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      background: $color-background;

      .song-list-wrapper {
        padding: 20px 30px;
      }

      .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
