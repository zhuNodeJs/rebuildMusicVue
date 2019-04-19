<template>
  <my-scroll class="my-suggest-list"
       ref='scrollRef'
       :data='result'
       :beforeScroll='beforeScrollData'
       @beforeScroll='beforeScroll'
       :pullup='pullup'
       @scrollToEnd='scrollToEnd'
       >
      <ul class="sugguest-list">
        <li class="suggest-item" v-for="(item,index) in result" :key="index" @click="selectItem(item)">
          <div class="icon">
            <i :class="getIconCls(item)"></i>
          </div>

          <div class="name">
            <p class="text" v-html="getSingernameOrSongname(item)"></p>
          </div>
        </li>

        <my-loading v-show="hasMore" title=""></my-loading>
      </ul>

      <div class="no-result-wrapper" v-if="!hasMore && !result.length">
        <my-no-result></my-no-result>
      </div>
  </my-scroll>
</template>


<script>
import MyScroll from '@/components/Base/MyScroll/MyScroll'
import MyLoading from '@/components/Base/MyLoading/MyLoading'
import {search} from '@/api/search'
import {getResult} from '@/api/recommend'
import MyNoResult from '@/components/Base/MyNoResult/MyNoResult'

const TYPE_SINGER = 'singer'

  export default {
    name: 'MySuggestList',
    data() {
      return {
        // 当前的检索页，用于下拉刷新
        page: 1,
        // 每一页的数量
        perpage: 20,
        // 接收的检索结果
        result: [],
        // 标志位，是否加载完
        hasMore: true,
        beforeScrollData: true,
        pullup: true
      }
    },
    props: {
      // 接受的检索值
      query: {
        type: String,
        default: ''
      },
      // 是否显示歌手
      zhida: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      query(newVal) {
        this.search()
      }
    },
    methods: {
      selectItem(item) {

      },
      callback(data) {
        console.log('*********', data)
      },
      search() {
        this.page = 1;
        this.hasMore = true;
        this.$refs.scrollRef.scrollTo(0, 0)

        getResult(this.query, this.page, this.perpage, this.zhida)
        .then((res) => {
          if (res.code === 0) {
            this.result = this._formatSearch(res.data)
            this._checkMore(res.data)
          }
        })

      },
      // 什么时候不上拉刷新
      _checkMore(data) {
        let song = data.song;
        // 没有数据或者是最后一页
        if(!song.list.length || (song.curnum + song.curpage * this.perpage) > song.totalnum) {
          this.hasMore = false;
        }
      },
      _formatSearch(data) {
        console.log('data=====', JSON.stringify(data))
        let ret = []

        if (data.zhida && data.zhida.singerid) {
          // 结构赋值
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }

        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }

        return ret
      },
      _normalizeSongs(list) {
        let ret = []

        list.forEach((item) => {
          if (item.songid && item.albummid) {
            ret.push(createSingerSong(item))
          }
        })

        return ret
      },
      beforeScroll() {

      },
      scrollToEnd() {

      },
      // 获取 icon class 图标样式
      getIconCls(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      }
    },
    components: {
      MyLoading,
      MyNoResult,
      MyScroll
    }
  }
</script>

<style lang="scss" scoped>
@import '~common/scss/const.scss';
@import '~common/scss/mixin.scss';

.my-suggest-list {
  height: 100%;
  overflow: hidden;
  .sugguest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      .icon {
        flex: 0 0 30px;
        width: 30px;
        [class^='icon-'] {
          font-size: 14px;
          color: $color-text-d;
        }
      }
      .name {
        flex: 1;
        font-size: $font-size-medium;
        color: $color-text-d;
        overflow: hidden;
        .text {
          @include no-wrap();
        }
      }
    }
  }
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
