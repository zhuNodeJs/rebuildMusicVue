<template>
  <div class="my-rank" ref="rankRef">
    <my-scroll class="toplist" ref="scrollRef" :data='toplist'>
      <ul>
        <li class="item" v-for="(item, index) in toplist" :key="index" @click="selectItem(item)">
          <!-- 左图 -->
          <div class="icon">
            <img width="100" height="100" v-lazy='item.picUrl' @load="loadImg">
          </div>

          <!-- 右歌 -->
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.songList" :key="index">
              <span>{{index+1}}</span>
              <span>{{song.songname}}</span>
              <span class="singername">- {{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>

      <!-- loading组件 -->
      <div v-show="!toplist.length" class="loading-container">
        <my-loading></my-loading>
      </div>
    </my-scroll>
  </div>
</template>

<script>
import MyLoading from '@/components/Base/MyLoading/MyLoading'
import MyScroll from '@/components/Base/MyScroll/MyScroll'
import {getRankList} from '@/api/rank'
export default {
    name: 'MyRank',
    data() {
      return {
        toplist: []
      }
    },
    props: {},
    watch: {},
    filters: {},
    methods: {
      _getRankList() {
        getRankList().then((res) => {
          if (res.code === 0) {
            this.toplist = res.data.topList
          }
        })
      },
      loadImg() {

      }
    },
    components: {
      MyScroll,
      MyLoading
    },
    created() {
      this._getRankList();
    },
}
</script>

<style lang='scss' scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mixin.scss';
.my-rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0px;
  .toplist {
    height: 100%;
    overflow: hidden;
    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 100px;
      &:last-child {
        padding-bottom: 20px;
      }
      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }
      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;

      }
    }

  }
}
</style>
