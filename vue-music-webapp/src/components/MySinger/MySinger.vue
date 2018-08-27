<template>
  <div class="my-singer" ref="singerRef">
    <my-phone-list ref="listRef" :data='singers' @select='selectSinger'></my-phone-list>
    <router-view></router-view>
  </div>
</template>

<script>
import MyPhoneList from "components/Base/MyPhoneList/MyPhoneList";
import { getSingerList } from "api/singer";
import { createSinger } from "common/js/SingerClass";

const HOT_TITLE = "热门";
const HOT_NUM = 10;

export default {
  name: "MySinger",
  data() {
    return {
      singers: []
    };
  },
  methods: {
    selectSinger(singer) {
      console.log(singer)
    },
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === 0) {
          this.singers = this._formatSingers(res.data.list);
        }
      });
    },
    _formatSingers(list) {
      // 热门歌手
      let map = {
        hot: {
          title: HOT_TITLE,
          items: []
        }
      };

      // 填充歌手的数据
      list.forEach((item, index) => {
        // 填充热门歌手数据
        if (index < HOT_NUM) {
          map.hot.items.push(createSinger(item));
        }
        // 填充a-z的字母
        let key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        // 填充对应的字母歌手数据
        map[key].items.push(createSinger(item))
      });

      // 得到有序的列表
      let hot = []
      let others = []
      for (let key in map) {
        let value = map[key]
        if (value.title.match(/[a-zA-Z]/)) {
          others.push(value)
        } else if (value.title === HOT_TITLE) {
          hot.push(value)
        }
      }
      // 按照字母的unicode码来进行排序
      others.sort((a,b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

      return hot.concat(others)
    }
  },
  created() {
    this._getSingerList();
  },
  components: {
    MyPhoneList
  }
};
</script>

<style lang='scss' scoped>
.my-singer {
  position: fixed;
  top: 88px;
  bottom: 0px;
  width: 100%;
}
</style>
