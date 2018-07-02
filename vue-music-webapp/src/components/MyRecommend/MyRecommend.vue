<template>
  <div class="my-recommend" ref="recommendRef">
    <my-scroll class="recommend-content" ref="scroll">
      <div>
        <div v-if="recommends.length" class="slide-wrapper">
          <my-slider>
            <div v-for="(recommend, key) in recommends" :key="key">
              <a :href="recommend.linkUrl">
                <img :src="recommend.picUrl" class="needsClick">
              </a>
            </div>
          </my-slider>
        </div>
      </div>
    </my-scroll>
  </div>
</template>

<script>
import MyScroll from 'components/Base/MyScroll/MyScroll'
import MySlider from 'components/Base/MySlider/MySlider'
  export default {
    name: 'MyRecommend',
    data() {
      return {
        recommends: [
          {
            linkUrl: 'https://c.y.qq.com/node/m/client/music_headline/index.html?_hidehd=1&_button=2&zid=852116',
            picUrl: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/296978.jpg'
          },
          {
            linkUrl: 'https://c.y.qq.com/node/m/client/music_headline/index.html?_hidehd=1&_button=2&zid=852116',
            picUrl: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/296978.jpg'
          },
          {
            linkUrl: 'https://c.y.qq.com/node/m/client/music_headline/index.html?_hidehd=1&_button=2&zid=852116',
            picUrl: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/296978.jpg'
          },
          {
            linkUrl: 'https://c.y.qq.com/node/m/client/music_headline/index.html?_hidehd=1&_button=2&zid=852116',
            picUrl: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/296978.jpg'
          },
          {
            linkUrl: 'https://c.y.qq.com/node/m/client/music_headline/index.html?_hidehd=1&_button=2&zid=852116',
            picUrl: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/296978.jpg'
          }
        ]
      }
    },
    created() {
      this._getRecommend()
    },
    methods: {
      _getRecommend() {

      }
    },
    components: {
      MyScroll,
      MySlider
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

}
</style>
