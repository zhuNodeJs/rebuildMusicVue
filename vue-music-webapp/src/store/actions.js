import * as types from './mutations-type'
import { myArray } from '@/common/js/myutils'
import {
  localSave,
  localDel,
  localClear,
  savePlay,
  saveFavorite,
  delFavorite
} from '@/common/js/store'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

/**
 * 保存搜索历史
 * @param {[type]} query 搜索关键字
 */

export const saveHistory = function ({ commit }, query) {
  commit(types.SET_SEARCHHISTORY, localSave(query))
}

/**
 * 删除单个搜索历史
 * @param {[type]} query
 */

export const delHistory = function ({ commit }, query) {
  commit(types.SET_SEARCHHISTORY, localDel(query))
}

/**
 * 删除全部的搜索的历史
 * query 搜索的关键字
 */

export const clearHistory = function ({ commit }) {
  commit(types.SET_SEARCHHISTORY, localClear())
}


/**
 * 把当前的歌曲写进vuex最近的播放的playHistory中
 */

export const saveplayHistory = function ({ commit }, song) {
  commit(types.SET_PLAYHISTORY, savePlay(song))
}

/**
 * 我的收藏
 */

export const savefavoriteList = function ({ commit }, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

/**
 * 我的收藏 删除
 */

export const delfavoriteList = function ({ commit }, song) {
  commit(types.SET_FAVORITE_LIST, delFavorite(song))
}


/**
 * 选择歌曲播放
 *
 */

export const selectPlay = function ({ commit, state }, { list, index }) {
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
  // 避免随机播放时，单击歌单，播放歌曲乱序
  if (state.mode === 2) {
    let randomList = myArray.shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURRENT_INDEX, index)
}


/**
 * 随机播放全部的按钮
 *
 */

export const randomPlay = function ({ commit }, { list }) {
  commit(types.SET_MODE, 2)
  commit(types.SET_PLAYING_STATE, true) // 播放的状态
  commit(types.SET_FULL_SCREEN, true) // 全屏
  commit(types.SET_PLAYLIST, myArray.shuffle(list))
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURRENT_INDEX, 0)
}


/**
 *  新增歌曲到播放列表
 */
export const insertSong = ({ commit, state }, song) => {
  let playlist = state.playlist.slice(0) // 克隆一个数组，与原来的数组无关
  let sequenceList = state.sequenceList.slice(0)
  let currentIndex = state.currentIndex

  //  记录当前歌曲
  let currentSong = playlist[currentIndex]

  // 查询待添加的歌曲是否已经存在播放列表中
  let fpIndex = findIndex(playlist, song)

  // 插入到当前索引
  currentIndex++
  playlist.splice(currentIndex, 0, song) // 在currentIndex中添加到播放列表中

  // 如果待添加的歌曲已在播放列表中，删除原有的歌曲
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }

  // 插入到sequenceList中的位置
  let currentSIndex = findIndex(sequenceList, currentSong) + 1

  // 查询添加的歌曲是否已经在sequenceList中
  let fsIndex = findIndex(sequenceList, song)

  // 插入到当前的索引
  sequenceList.splice(currentSIndex, 0, song)

  // 如果待添加的歌曲已经存在于播放列表中，删除原来的歌曲
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
}

/**
 * 从删除列表中删除歌曲
 *
 */
export const deleteSong = ({ commit, state }, song) => {
  let playlist = state.playlist.slice(0)
  let sequenceList = state.sequenceList.slice(0)
  let currentIndex = state.currentIndex

  // 查询待删除的歌曲
  let pIndex = findIndex(playlist, song)

  // 查询在在sequenceList中的位置
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)

  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  let playingState = playlist.length > 0
  commit(types.SET_PLAYING_STATE, playingState)
}
