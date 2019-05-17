<template lang='html'>
  <transition name='slide'>
    <div class='my-user'>
      <div class='back' @click='back'>
        <i class='icon-back'></i>
      </div>

      <div class='switches-wrapper'>
        <my-switches :switches='switches' :currentIndex='currentIndex' @switch='switchItem'></my-switches>
      </div>

      <div ref="playBtn" class='play-btn' @click='random'>
        <i class='icon-play'></i>
        <span class='text'>随机播放全部</span>
      </div>

      <div class="list-wrapper" ref="listWrapper">
        <!-- 我的收藏 -->
        <my-scroll ref="favoriteRef" class="list-scroll" v-if='currentIndex === 0' :data='favoriteList'>
          <div class="list-inner">
            <my-song-list :songs='favoriteList' @select='selectSong'></my-song-list>
          </div>
        </my-scroll>
        <!-- 播放列表 -->
        <my-scroll ref="playListRef" class="list-scroll" v-if='currentIndex === 1'>
          <div class="list-inner">
            <my-song-list :songs='playHistory' @select='selectSong'></my-song-list>
          </div>
        </my-scroll>
      </div>

      <div class='no-result-wrapper' v-show="noResult">
        <my-no-result></my-no-result>
      </div>
    </div>
  </transition>
</template>

<script>
  import MySwitches from '@/components/Base/MySwitches/MySwitches'
  import MyNoResult from '@/components/Base/MyNoResult/MyNoResult'
  import MyScroll from '@/components/Base/MyScroll/MyScroll'
  import MySongList from '@/components/Base/MySongList/MySongList'
  import { mapActions, mapGetters } from "vuex";
  import { SingerSong } from '@/common/js/SingerSongClass'


  export default {
    name:'user',
    data() {
      return {
        switches: [
          {name: '我的收藏'},
          {name: '最近播放'}
        ],
        currentIndex: 0
      }
    },
    computed: {
      ...mapGetters(['playHistory','favoriteList']),
      noResult() {
        if (this.currentIndex === 0) {
          return !this.favoriteList.length
        }
        if (this.currentIndex === 1) {
          return !this.playHistory.length
        }
      }
    },
    methods: {
      ...mapActions(['savefavoriteList', 'delfavoriteList']),
      back() {
        this.$router.back();
      },
      switchItem(index) {
        this.currentIndex = index
      },
      random() {

      },
      selectSong(item, index) {

      }
    },
    components: {
      MySwitches,
      MyNoResult,
      MyScroll,
      MySongList
    }
  }
</script>

<style lang='scss' scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mixin.scss';

.my-user {
  position: fixed;
  top:0;
  bottom:0;
  z-index: 100;
  width: 100%;
  background:$color-background;
  &.slide-enter-active, &.slide-leave-active {
    transition: all 0.3s;
  }
  &.slide-enter,&.slide-leave-to {
    transform: translate3D(100%, 0, 0);
  }

  .back {
    position: absolute;
    top: 5px;
    left: 6px;
    z-index: 50;
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }

  .switches-wrapper {
    margin: 10px 0 30px 0;
  }

  .play-btn {
    box-sizing: border-box;
    width: 135px;
    padding: 7px 0;
    margin: 0 auto;
    text-align: center;
    border: 1px solid $color-text-l;
    color: $color-text-l;
    border-radius: 100px;
    font-size: 0px;
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
  .list-wrapper {
    position: absolute;
    top: 110px;
    bottom: 0px;
    width: 100%;
    .list-scroll {
      height: 100%;
      overflow: hidden;
      .list-inner {
        padding: 20px 30px;
      }
    }
  }
  .no-result-wrapper {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
  }
}

</style>
