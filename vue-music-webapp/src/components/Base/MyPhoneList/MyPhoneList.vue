<template>
  <my-scroll
    ref="scrollRef"
    :data="data"
    :probeType='probeType'
    :listen-scroll='listenScroll'
    @scroll="scroll"
    class="my-phone-list">
    <!-- 左侧歌手列表 -->
    <ul class="pList">
      <li ref="leftRef" v-for="(group, index) in data" :key="index" class="list-group">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="(item, uIndex) in group.items" :key="uIndex" @click="selectItem(item)" class="list-group-item">
            <img v-lazy="item.avatar" class="avatar" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 右侧字母列表, stop, prevent阻止默认事件 -->
    <div
      @touchmove.stop.prevent='onShortcutTouchmove'
      @touchstart='onShortcutTouchstart'
      class="list-shortcut">
      <ul>
        <li
           class='item'
           v-for="(item, index) in shortcut"
           :key="index"
           :class="{'current': currentIndex === index}">
           {{item}}
        </li>
      </ul>
    </div>
    <!-- 滚动固定标题的实现 -->
    <div ref="fixedTitleRef" v-show="fixedTitle" class="list-fixed">
      <h1 class="fixedTitle">{{ fixedTitle }}</h1>
    </div>
    <!-- loading加载页 -->
    <div v-show="!data.length" class="loading-container">
      <my-loading></my-loading>
    </div>
  </my-scroll>
</template>

<script>
import MyScroll from 'components/Base/MyScroll/MyScroll'
import MyLoading from 'components/Base/MyLoading/MyLoading'

const TITLE_HEIGHT = 29

  export default {
    name: 'MyPhoneList',
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        probeType: 3,
        listenScroll: true,
        currentIndex: 0,
        scrollY: -1,
        diff: -1 // 悬浮的索引title与滚动索引的间距
      }
    },
    computed: {
      shortcut() {
        return this.data.map((group) => {
          return group.title.substr(0,1)
        })
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calcHeight()
        }, 20)
      },
      scrollY(newY, oldY) {
        const leftListHeight = this.leftListHeight
        // 当滚动到顶部，newY > 0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }

        // 在中间部分滚动
        for(let i = 0, len = leftListHeight.length; i < len; i++) {
          let heightT = leftListHeight[i]
          let heightB = leftListHeight[i+1]
          if (!heightB || (-newY >= heightT && -newY <= heightB)) {
            console.log('>>newY>>>', -newY)
            console.log('>>>i>>>',i)
            this.currentIndex = i
            return
          }
        }




      },
      diff() {

      }
    },
    methods: {
      scroll(pos) {
        this.scrollY = pos.y
      },
      _calcHeight() {
        // 初始化
        let height = 0
        this.leftListHeight = []
        this.leftListHeight.push(height)
        let list = this.$refs.leftRef
        for(let i = 0; i < list.length; i++) {
          height += list[i].clientHeight
          this.leftListHeight.push(height)
        }
      },
      selectItem(item) {

      },
      onShortcutTouchstart() {

      },
      onShortcutTouchmove() {

      }
    },
    components: {
      MyScroll,
      MyLoading
    }
  }
</script>

<style lang='scss' scoped>
@import "~common/scss/const.scss";
@import "~common/scss/mixin.scss";

.my-phone-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .pList {
    .list-group {
      padding-bottom: 30px;
      .list-group-title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background: $color-highlight-background;
      }
      & > ul {
        .list-group-item {
          @include display-flex;
          @include flex-direction(row);
          @include align-items(center);
          padding: 20px 0 0 30px;
          .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
          .name {
            margin-left: 20px;
            color: $color-text-l;
            font-size: $font-size-medium;
          }
        }
      }
    }
  }
  .list-shortcut {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%);
    z-index: 30;
    width: 20px;
    padding: 20px 0px;
    border-radius: 10px;
    background:$color-background-d;
    font-family: Helvetica;
    text-align: center;
    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current {
        color: $color-theme;
      }
    }
  }
  .list-fixed {
    position: absolute;
    top: -1px;
    left: 0px;
    width: 100%;
    .fixedTitle {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
