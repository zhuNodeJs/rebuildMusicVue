<template>
  <div class="my-player" v-show="playlist.length > 0">
    <!-- 正常的播放器 -->
    <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
      <div class="normal-player" v-show="fullScreen">
        <!-- 背景图 -->
        <div class="background">
          <img :src="currentSong.img" width="100%" height="100%" />
        </div>

        <!-- 顶部 -->
        <div class="top">
          <!-- 返回按钮 -->
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>

          <p v-html="currentSong.name" class="title"></p>
          <p v-html="currentSong.singer" class="subtitle"></p>
        </div>

        <!-- 中部 -->
        <div class="middle" @touchstart.prevent="middleTouchStart" @touchmove.prevent="middleTouchMove"
          @touchend="middleTouchend">
          <div class="middle-l" ref="middleRef">
            <div class="cd-wrapper" ref="cdRef">
              <div class="cd" :class='playing ? "play" : "play pause"'>
                <img :src="currentSong.img" class="image" alt="" />
              </div>
            </div>

            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{ playingLyric }}</div>
            </div>
          </div>

          <my-scroll ref="lyricList" :data="currentLyric && currentLyric.lines" class="middle-r">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p ref="lyricLine" v-for="(line,index) in currentLyric.lines"
                  :class='{"current": currentLyricLine} === index' class="text">
                  {{ line.txt }}
                </p>
              </div>
            </div>
          </my-scroll>
        </div>

        <!-- 底部操作区 -->
        <div class="bottom">

          <div class="dot-wrapper">
            <span :class='{"active": currentDot === "cd"}' class='dot'></span>
            <span :class='{"active": currentDot === "lyric"}' class='dot'></span>
          </div>

          <!-- <div class="progress-wrapper">
            <span class='time time-l'>{{currentTime | format}}</span>


            <div class="progress-bar-wrapper">
              <my-progress-bar :percent='percent' @percentChange='percentChange'></my-progress-bar>
            </div>

            <span class="time time-r">{{currentSong.duration | format}}</span>
          </div> -->


          <!-- <div class="operators">
            <div class="icon i-left">
              <i :class='iconMode'></i>
            </div>
            <div class="icon i-left" :class='songCanplay ? "" : "disable"'>
              <i class="icon-prev" @click='prevSong'></i>
            </div>
            <div class="icon i-center" :class='songCanplay ? "" : "disable"'>
              <i @click='togglePlaying' :class='playing ? "icon-pause" : "icon-play"'></i>
            </div>
            <div class="icon i-right" :class='songCanplay ? "" : "disable"'>
              <i @click='nextSong' class='icon-next'></i>
            </div>
            <div class="icon i-right">
              <i class="icon" :class='getFavoriteCls(currentSong)' @click='toggleFavoriteCls(currentSong)'></i>
            </div>
          </div> -->
        </div>
      </div>
    </transition>

    <!-- 最小化的播放器 -->
    <!-- <transition name='mini'>
      <div @click='open' v-show="!fullScreen" class="mini-player">
        <div class="icon">
          <img :src="currentSong.img" width="40" height="40" :class='playing ? "play" : "play pause"' alt="">
        </div>

        <div class="text">
          <p v-html="currentSong.name" class="name"></p>
          <p v-html="currentSong.singer" class="desc"></p>
        </div>

        <div class="control"> -->
    <!-- 圆形进度条 -->
    <!-- <my-progress-circle :percent='percent' :radius='32'>
            <i class="icon-mini" @click.stop='togglePlaying' :class='playing ? "icon-pause-mini" : "icon-play-mini"'></i>
          </my-progress-circle>
        </div>

        <div class="control" @click.stop='showPlayList'>
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>

    <my-playlist ref="playlistRef"></my-playlist> -->

    <!-- 播放器 -->
    <!-- <audio :src="currentSong.url"
           ref="audioRef"
           @play='canplay'
           @error='error'
           @timeupdate='timeupdate'
           @ended='ended'>
      Your browser does not support the audio element.
    </audio> -->
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from "vuex";
  import animations from "create-keyframe-animation";
  import MyScroll from "@/components/Base/MyScroll/MyScroll";
  import MyProgressBar from '@/components/Base/MyProgressBar/MyProgressBar';
  import { myArray, myTime } from "@/common/js/myutils";
  import Lyric from "lyric-parser";

  export default {
    name: "MyPlayer",
    data() {
      return {
        // 当前播放时间
        currentTime: 0,
        // 当前的歌词
        currentLyric: null,
        // 当前的歌词在第几行
        currentLyricLine: 0,
        // 当前在哪个分页
        currentDot: "cd",
        // cd 页小段歌词
        playingLyric: "无歌词数据",
        // 是否显示播放列表
        showList: false
      }
    },
    watch: {
      currentSong(newVal, oldVal) {
        console.log('new Old 歌曲', newVal.id, oldVal.id);
        // 播放列表没有歌曲就退出
        if (!newVal.id) {
          return;
        }
        if (newVal.id === oldVal.id) {
          return;
        }

        // 切歌时，停止当前的歌词
        if (this.currentLyric) {
          this.currentLyric.stop();
        }

        // DOM 更新了
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          // this.$refs.audioRef.play();
          this._getLyric();
        }, 1000);
      }
    },
    computed: {
      ...mapGetters(["playlist", "fullScreen", "playing", "currentSong"])
    },
    updated() {
      console.log(">>11>>>", this.currentSong);
    },
    mounted() {
    },
    filters: {
      format(value) {
        if (!value) return "";
        return myTime.format(value);
      }
    },
    methods: {
      // ...mapActions([""]),
      ...mapMutations({
        setfullScreen: "SET_FULL_SCREEN"
      }),
      // new Lyric回调函数
      handleLyric({ lineNum, txt }) {
        console.log('结果为：：：', lineNum, txt)
        // this handler called when lineNum change
        this.currentLyricLine = lineNum

        // 歌词在中间
        if (lineNum > 5) {
          let el = this.$refs.lyricLine[lineNum - 5]
          this.$refs.lyricList.scrollToElement(el, 1000)
        } else {
          this.$refs.lyricList.scrollTo(0, 0, 1000)
        }
        // 当前歌词
        this.playingLyric = txt;
      },
      // 歌词处理
      _getLyric() {
        this.currentSong.getLyric()
          .then(lyric => {
            // if (this.currentLyric.lyric !== lyric) {
            //   return
            // }

            this.currentLyric = new Lyric(lyric, this.handleLyric)
            console.log('歌词呀>>>', this.currentLyric)

            if (this.playing) {
              this.currentLyric.play()
            }

          })
          .catch(() => {
            // 获取歌词失败时
            this.currentLyric = null
            this.playingLyric = '无歌词数据'
            this.currentLyricLine = 0
          })
      },
      back() {
        this.setfullScreen(false);
      },
      // 滑动翻页
      middleTouchStart(e) {
        // console.log(e);
        this.touch.init = true;
        // 开始滑动的位置
        this.touch.startX = e.touches[0].pageX;
        this.touch.startY = e.touches[0].pageY;

        // console.log('this.touch>>>>', this.touch)
      },
      middleTouchMove(e) {
        // console.log('yuyulou', e.touches[0].pageX)
        if (!this.touch.init) {
          return;
        }

        // 滑动的插值
        let deltaX = e.touches[0].pageX - this.touch.startX;
        let deltaY = e.touches[0].pageY - this.touch.startY;

        // 纵向的滚动return
        if (Math.abs(deltaX) < Math.abs(deltaY)) {
          return
        }

        let left = this.currentDot === 'cd' ? 0 : -window.innerWidth
        // 左滑动的距离
        let offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
        this.touch.percent = Math.abs(offsetWidth / window.innerWidth)

        // console.log('offsetWidth==', offsetWidth)
        // console.log('percent', this.touch.percent)

        // console.log('======', this.$refs.lyricList.$el)

        this.$refs.lyricList.$el.style['webkitTransform'] = `translate3d(${offsetWidth}px, 0, 0)`
        this.$refs.lyricList.$el.style['transform'] = `translate3d(${offsetWidth}px, 0, 0)`
        // 过渡的效果 坚持0s
        this.$refs.lyricList.$el.style['webkitTransition-duration'] = 0
        this.$refs.lyricList.$el.style['transition-duration'] = 0

        // 背景模糊
        this.$refs.middleRef.style.opacity = 1 - this.touch.percent
        this.$refs.middleRef.style['webkitTransition-duration'] = 0
        this.$refs.middleRef.style['transition-duration'] = 0
      },
      middleTouchend() {
        let offsetWidth = null
        let opacity = null

        if (this.currentDot === 'cd') {
          // 左滑
          if(this.touch.percent > 0.1) {
            offsetWidth = -window.innerWidth
            opacity = 0
            this.currentDot = 'lyric'
          } else {
            offsetWidth = 0
            opacity = 1
          }
        } else {
          // 右滑
          if (this.touch.percent < 0.9) {
            offsetWidth = 0
            this.currentDot = 'cd'
            opacity = 1
          } else {
            offsetWidth = -window.innerWidth
            opacity = 0
          }
        }

        this.$refs.lyricList.$el.style['webkitTransform'] = `translate3d(${offsetWidth}px, 0, 0)`
        this.$refs.lyricList.$el.style['transform'] = `translate3d(${offsetWidth}px, 0, 0)`

        // 过渡效果坚持 300ms
        this.$refs.lyricList.$el.style['webkitTransition-duration'] = '300ms'
        this.$refs.lyricList.$el.style['transition-duration'] = '300ms'
        // 背景模糊
        this.$refs.middleRef.style.opacity = opacity
        this.$refs.middleRef.style['webkitTransition-duration'] = '300ms'
        this.$refs.middleRef.style['transition-duration'] = '300ms'
      },
      _getPosAndScale() {
        const targetWidth = 40;
        const paddingLeft = 40;
        const paddingBottom = 30;
        const paddingTop = 80;
        const width = window.innerWidth * 0.8;
        const scale = targetWidth / width;
        const x = -(window.innerWidth / 2 - paddingLeft);
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
        console.log(x, y, scale);
        return {
          x,
          y,
          scale
        };
      },
      // 中部 cd 唱片, js动画钩子
      enter(el, done) {
        const { x, y, scale } = this._getPosAndScale();
        console.log("enter====", x, y, scale);

        let animation = {
          0: {
            transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0, 0, 0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0, 0, 0) scale(1)`
          }
        };

        animations.registerAnimation({
          name: "move",
          animation,
          presets: {
            duration: 400,
            easing: "linear",
            delay: 100
          }
        });

        // then run it
        animations.runAnimation(this.$refs.cdRef, "move", done);
      },
      afterEnter() {
        animations.unregisterAnimation("move");
        this.$refs.cdRef.style.animation = "";
      },
      leave(el, done) {
        const { x, y, scale } = this._getPosAndScale();
        console.log("leave====", x, y, scale);

        this.$refs.cdRef.style.transition = `all 0.4s ease`;
        this.$refs.cdRef.style[
          "transform"
        ] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        this.$refs.cdRef.style[
          "webkitTransform"
        ] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;

        this.$refs.cdRef.addEventListener("transitionend", done);
      },
      afterLeave() {
        this.$refs.cdRef.style["transform"] = "";
        this.$refs.cdRef.style["webkitTransform"] = "";
        this.$refs.cdRef.style.transition = "";
      }
    },
    created() {
      // 维护一个滑动状态的对象
      this.touch = {}
    },
    destroyed() { },
    components: {
      MyScroll,
      MyProgressBar
    }
  };
</script>

<style lang="scss" scoped>
  @import "mySccs.scss";
</style>
