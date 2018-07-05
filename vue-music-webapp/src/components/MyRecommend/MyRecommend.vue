<template>
  <div class="my-recommend" ref="recommendRef">
    <my-scroll class="recommend-content" ref="scroll">
      <div>
        <div v-if="recommends.length" class="slide-wrapper">
          <my-slider :loop='bloop' :autoPlay='bautoPlay'>
            <div v-for="(recommend, key) in recommends" :key="key">
              <a :href="recommend.linkUrl">
                <img :src="recommend.picUrl" class="needsClick">
              </a>
            </div>
          </my-slider>
        </div>
        <!-- 歌单推荐列表 -->
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item, index) in lists" :key="index" class="item" @click="selectItem(item)">
              <div class="icon">
                <img v-lazy="item.imgurl" alt="" width="60" height="60">
              </div>
              <div class="text">
                <p v-html="item.creator.name" class="name"></p>
                <p v-html="item.dissname" class="desc"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- loading组件 -->
      <div v-show="!lists.length" class="loading-container">
        <my-loading></my-loading>
      </div>
    </my-scroll>
  </div>
</template>

<script>
import MyScroll from 'components/Base/MyScroll/MyScroll'
import MySlider from 'components/Base/MySlider/MySlider'
import MyLoading from 'components/Base/MyLoading/MyLoading'
import { getRecommend, getList } from 'api/recommend'
  export default {
    name: 'MyRecommend',
    data() {
      return {
        bloop: true, // 轮播图--是否轮播
        bautoPlay: true, // 轮播图--是否自动轮播
        recommends:[],
        lists: []
      }
    },
    created() {
      this._getRecommend()
      setTimeout(() => {
        this._getList()
      }, 1000)
    },
    methods: {
      _getRecommend() {
        getRecommend().then(res => {
          if (res.code == 0) {
            this.recommends = res.data.slider
          }
        })
      },
      _getList() {
        getList().then(res => {
          if (res.code == 0) {
            this.lists = res.data.list
          }
        })
      }
    },
    components: {
      MyScroll,
      MySlider,
      MyLoading
    }
  }
</script>

<style lang='scss' scoped>
@import "~common/scss/const.scss";
@import "~common/scss/mixin.scss";
.my-recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0px;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slide-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .recommend-list {
      .list-title {
        text-align: center;
        font-size: $font-size-medium;
        height: 65px;
        line-height: 65px;
        color: $color-theme;
      }
      .item {
        @include display-flex;
        box-sizing: border-box;
        @include flex-direction(center);
        @include align-items(center);
        padding: 0 20px 20px 20px;
        .icon {
          flex: 0 0 60px;
          width: 60px;
          box-sizing: content-box;
          padding-right: 20px;
        }
        .text {
          @include display-flex;
          @include flex-direction(column);
          @include justify-content(center);
          @include flex(1);
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
          .name {
            margin-bottom: 10px;
            color: $color-text;
          }
          .desc {
            color: $color-text-d;
          }
        }
      }
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
