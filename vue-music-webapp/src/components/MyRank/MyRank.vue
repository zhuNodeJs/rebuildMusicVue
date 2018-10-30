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

</style>
