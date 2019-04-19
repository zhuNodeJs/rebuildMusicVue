/**
 * 单一状态树
 * vuex的操作顺序： state.js -> mutations-type.js -> mutations.js -> getters.js
 */

import {getStorage} from '@/common/js/store.js'

const state = {

  // 搜索结果
  searchHistory: getStorage()
}

export default state
