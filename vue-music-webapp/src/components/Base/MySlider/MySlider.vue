<template>
  <div class="my-slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <!-- 轮播点 -->
    <div class="dots">
      <span v-for="(dot, index) in dots" :key="index" :class="{active: currentDotsIndex === index}" class="dot"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { myDOM } from 'common/js/myutils'
  export default {
    name: 'MySlider',
    data() {
      return {
        dots: [],
        currentDotsIndex: 0
      }
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      delay: {
        type: Number,
        default: 3000
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()
        // 首先触发
        if (this.loop) {
          this._initPlay()
        }
        // 当窗口尺寸发生变化时，重新计算轮播图宽度
        window.addEventListener('resize', () => {
          if (!this.slider) {
            return;
          }
          this._setSliderWidth(true)
          this.slider.refresh()
        })
      }, 20)
    },
    methods: {
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for(let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          myDOM.addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2*sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          },
          click: true
        })
        this.slider.on('scrollEnd', () => {
          let nowIndex = this.slider.getCurrentPage().pageX
          this.currentDotsIndex = nowIndex;
          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._initPlay()
          }
        })
      },
      _initPlay() {
        let nextIndex = this.currentDotsIndex + 1;
        this.timer = setTimeout(() => {
          this.slider.next(400)
        }, this.delay)
      }
    },
    destroyed() {
      clearTimeout(this.timer)
    },
    created() {
    }
  }
  /**
   * 1. bounce: true 是否启用回弹动画效果
   * 2. selectedIndex: 0,  wheel 为true时有效，表示被选中的wheel索引
   * 3. rotate: 25, wheel为true时有效，表示被选中的wheel每一层的旋转角度
   * 4. wheel： false, 该属性是给picker组件使用的, 普通的列表滚动不需要配置
   * 5. snap: {} 该属性是给slider组件使用的, 普通的列表滚动不需要配置
   * 6. snap.loop: false， 是否可以无缝循环轮播
   * 7. snap.threshold: 0.1 用手指滑动时页面可以切换的阀值，大于这个阀值可以滑动到下一页
   * 8. snap.speed: 400,轮播图切换的动画时间
   * 9. swipeTime: 2500 swipe 持续时间
   * 10.bounceTime: 700 弹力动画持续的毫秒数
   * 11.adjustTime: 400 wheel为true有用，调整停留位置的时间
   * 12.swipeBounceTime: 1200 swipe回弹时间
   * 13.deceleration:0.001 滚动运动量减速越大越快，建议不大于0.01
   * 14.momentumLimitTime: 300 符合惯性拖动的最大时间
   * 15.momentumLimitDistance: 15 符合惯性拖动的最大时间
   * 16.resizePolling: 60 重新调整窗口大小时 重新计算better-scroll的时间间隔
   * 17.preventDefault: true 是否阻止默认时间
   * 18. preventDefaultException: {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/}阻止默认事件
   * 19. HWCompositing: true 是否启用硬件加速
   * 20.useTransition： true 是否使用CSS3的transition属性
   * 21. useTransform: true 是否使用CSS3的transform属性
   *
   */
</script>

<style lang='scss' scoped>
@import "~common/scss/const.scss";
@import "~common/scss/mixin.scss";
.my-slider {
  min-height: 1px;
  .slider-group {
    @include display-flex;
    @include flex-direction(row);
    @include flex-wrap(nowrap);
    box-sizing: border-box;
    overflow: hidden;
    .slider-item {
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
