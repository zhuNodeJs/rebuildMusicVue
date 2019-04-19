import * as types from './mutations-type'
import {myArray} from '@/common/js/myutils'
import {localSave, localDel, localClear} from '@/common/js/store'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

/**
 * 保存搜索历史
 * @param {[type]} query 搜索关键字
 */

export const saveHistory = function({commit}, query) {
  commit(types.SET_SEARCHHISTORY, localSave(query))
}

/**
 * 删除单个搜索历史
 * @param {[type]} query
 */

export const delHistory = function({commit}, query) {
  commit(types.SET_SEARCHHISTORY, localDel(query))
}

/**
 * 删除全部的搜索的历史
 * query 搜索的关键字
 */

export const clearHistory = function({commit}) {
  commit(types.SET_SEARCHHISTORY, localClear())
}
