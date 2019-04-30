<template>
  <transition name='slide'>
    <my-music-list class="my-song-list-detail" :songs='songs' :title='title' :bg-image='bgImage'></my-music-list>
  </transition>
</template>

<script>
  // 数据准备
  import {mapGetters} from 'vuex'
  import {getSongList} from '@/api/recommend'
  import {createSingerSong} from '@/common/js/SingerSongClass'
  import MyMusicList from "@/components/MyMusicList/MyMusicList"
  export default {
    name:'MySongListDetail',
    components: {
      MyMusicList
    },
    data() {
      return {
        songs: []
      }
    },
    props: {
    },
    watch: {
    },
    filters: {
    },
    methods: {
      // 获取歌单数据
      _getSongList() {
        // 当获取不到id时，禁止刷新歌单
        // console.log('****', this.songlist)
        if(!this.songlist.dissid) {
          this.$router.push('/recommend');
          return;
        }

        getSongList(this.songlist.dissid).then((res) => {
          if (res.code === 0) {
            this.songs = this._formatSongs(res.cdlist[0].songlist)
            console.log("this.songs>>>>", this.songs)
          }
        })
      },
      // 重组数据
      _formatSongs(list) {
        let result = []

        list.forEach((item) => {
          if (item.songid && item.albummid) {
            result.push(createSingerSong(item))
          }
        })

        return result
      }
    },
    mounted() {
    },
    computed: {
      // vuex 使用对象展开运算符将getters混入computed对象中
      ...mapGetters(['songlist']),
      title() {
        return this.songlist.dissname
      },
      // 传入子组件
      bgImage() {
        return this.songlist.imgurl
      }
    },
    created() {
      this._getSongList()
    },
    destroyed () {
    }
  }
</script>

<style lang='scss' scoped>
@import '~@/common/scss/const.scss';
@import '~@/common/scss/mixin.scss';

.my-song-list-detail {
 &.slide-enter-active, &.slide-leave-active {
  transition: all .5s ease;
 }
 &.slide-enter, &.slide-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
 }
}


</style>
