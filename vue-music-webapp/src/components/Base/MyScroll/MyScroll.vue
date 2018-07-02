<template>
  <div class="my-scroll" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
  export default {
    name:'MyScroll',
    components: {

    },
    data() {
      return {

      }
    },
    props: {
      // 传入的数据
      data: {
        type: Array,
        default: null
      },
      probeType: {
        /**
         * 1. 滚动的时候会派发scroll事件，会截流
         * 2. 滚动的时候实时的派发scroll事件，不会截流
         * 3. 除了实时的派发scroll事件，在swipe的情况下仍然能实时的派发scroll事件
         */
        type:Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      /**
       * 是否开启横向滚动
       */
      scrollX: {
        type: Boolean,
        default: false
      },
      // 是否监听滚动位置
      listenScroll: {
        type: Boolean,
        default: false
      },
      // 是否派发滚动到底部的事件，是否开启上拉刷新
      pullup: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发顶部下拉的事件，用于下拉刷新
       */
      pulldown: {
        type: Boolean,
        default: false
      },
      // 滚动前是否触发事件，如：滚动前让输入框失去焦点，避免滚动搜索结果时移动端键盘的遮挡
      beforeScroll: {
        type: Boolean,
        default: false
      },
      // 当数据更新后，刷新scroll的延时
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return;
        }
        // better-scroll初始化
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX: this.scrollX
        })
        // 是否派发滚动事件
        if(this.listenScroll) {
          let me = this;
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos);
          })
        }

        //是否派发滚动到底部的事件，用于上拉加载
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            // 滚动到底部
            if(this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollEnd')
            }
          })
        }

        // 是否派发顶部下拉事件，用于下拉刷新
        if (this.pulldown) {
          this.scroll.on('touchend', (pos) => {
            // 下拉动作
            if (pos.y > 50) {
              this.$emit('pulldown')
            }
          })
        }

        // 是否派发列表滚动开始的事件
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }

        // 代理better-scroll的disable方法
        // disable() {

        // }






      }
    }
  }
</script>

<style lang='scss' scoped>

</style>
