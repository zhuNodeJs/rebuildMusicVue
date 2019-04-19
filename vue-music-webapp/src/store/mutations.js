import * as types from './mutations-type'
const mutations = {

  [types.SET_SEARCHHISTORY](state, searchHistory) {
    state.searchHistory = searchHistory
  }
}

export default mutations;
