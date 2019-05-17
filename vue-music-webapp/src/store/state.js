/**
 * 单一状态树
 * vuex的操作顺序： state.js -> mutations-type.js -> mutations.js -> getters.js
 */

import {getStorage, getPlayStorage, getFavorite} from '@/common/js/store.js'

const playMode = {
  sequence: 0, // 顺序播放
  loop: 1, // 单曲播放
  random: 2 // 随机播放
}
const state = {
  // 歌手信息
  singer: {},
  // 播放器的播放的状态
  playing: false,
  // 播放器的展开状态
  fullScreen: false, // 测试环境
  // 播放歌曲列表
  playlist: [],
  // 顺序播放列表
  sequenceList: [],
  // 播放模式
  mode: playMode.sequence,
  // 播放的歌曲的索引
  currentIndex: -1,
  // 推荐页歌单
  songlist: {},
  // 歌曲排行数据
  ranklist: {},
  // 搜索结果
  searchHistory: getStorage(),
  // 播放历史(最近播放)
  playHistory: getPlayStorage(),
  // 我的收藏
  favoriteList: getFavorite()
}

export default state
