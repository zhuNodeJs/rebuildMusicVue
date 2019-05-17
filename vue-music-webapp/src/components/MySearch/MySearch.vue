<template>
  <div class="my-search">
    <div class="search-box-wrapper">
      <my-search-box ref="searchBoxRef" @query='onQueryChange'></my-search-box>
    </div>

    <div class='shortcut-wrapper' v-show="!query" ref="shortcutRef">
      <my-scroll class='shortcut' ref='scrollRef' :data='scrollData' :refreshDelay='refreshDelay'>
        <div>
          <!-- 热门搜索 -->
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" v-for="(item,index) in hotkey" :key="index" @click="addQuery(item.k)">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>

          <!-- 搜索历史 -->
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>

            <my-search-list :searches='searchHistory' @select='addQuery' @delete='deleteHis'></my-search-list>
          </div>
        </div>
      </my-scroll>
    </div>

    <!-- 搜索结果 -->
    <div class="search-result" ref='resultRef' v-show="query">
      <my-suggest-list ref='suggestRef'
                      :query='query'
                      :zhida='zhida'
                      @beforeScroll='blurInput'
                      @select='savaHis'>
      </my-suggest-list>
    </div>

    <!-- 清空弹窗 -->
    <my-confirm ref="confirmRef" @confirm='confirm' @cancel='cancel'></my-confirm>

  </div>
</template>

<script>
  import MySearchBox from '@/components/Base/MySearchBox/MySearchBox'
  import MyScroll from '@/components/Base/MyScroll/MyScroll'
  import MySearchList from '@/components/Base/MySearchList/MySearchList'
  import MySuggestList from '@/components/MySuggestList/MySuggestList'
  import {mapActions, mapGetters} from 'vuex'
  import {getHotKey} from '@/api/search'
  import MyConfirm from '@/components/Base/MyConfirm/MyConfirm'
  export default {
    name:'MySearch',
    data() {
      return {
        // 热门搜索关键字
        hotkey: [],
        // 搜索字段(my-search-box -> my-search -> my-sugguest- list)
        query: '',
        // 是否显示歌手
        zhida: true,
        refreshDelay: 100
      }
    },
    computed: {
      ...mapGetters(['searchHistory']),
      scrollData() {
        return this.hotkey.concat(this.searchHistory)
      }
    },
    methods: {
      ...mapActions(['saveHistory', 'delHistory', 'clearHistory']),
      // 保存搜索结果历史到vuex 和 localstorage 中
      savaHis() {
        this.saveHistory(this.query)
      },
      onQueryChange(query) {
        this.query = query
      },
      addQuery(k) {
        this.$refs.searchBoxRef.getQuery(k)
      },
      showConfirm() {
        this.$refs.confirmRef.show()
      },
      deleteHis(item) {
        this.delHistory(item)
      },
      // 获取热搜数据
      _getHotKey() {
        getHotKey().then((res) => {
          // console.log('res===', res)
          if (res.code === 0) {
            // this.hotkey = res.data.hotkey
            this.hotkey = res.data.hotkey.slice(0, 10)
          }
        })
      },
      blurInput() {
        this.$refs.searchBoxRef.blur()
      },
      confirm() {
        this.clearHistory()
      },
      cancel() {
        return;
      }
    },
    created() {
      this._getHotKey()
    },
    components: {
      MySearchBox,
      MyScroll,
      MySearchList,
      MySuggestList,
      MyConfirm
    }
  }
</script>

<style lang="scss" scoped>
@import "~common/scss/const.scss";
@import "~common/scss/mixin.scss";

.my-search {
  .search-box-wrapper {
    margin: 20px;
  }

  .shortcut-wrapper {
    position: fixed;
    top: 178px;
    bottom: 0px;
    width: 100%;
    .shortcut {
      height: 100%;
      overflow: hidden;
      .hot-key {
        margin: 0 20px 20px 20px;
        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }
        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0px;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
          &.special {
            color: rgba(255,255,255,.7);
          }
        }
      }
      .search-history {
        position: relative;
        margin: 0 20px;
        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;
          .text {
            flex: 1;
          }
          .clear {
            @include extend-click();
            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
  }

  .search-result {
    position: fixed;
    width: 100%;
    top: 178px;
    bottom: 0px;
  }

}
</style>
