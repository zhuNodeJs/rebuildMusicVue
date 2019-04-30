import * as types from './mutations-type'
const mutations = {
  [types.SET_SONGLIST](state, songlist) {
    state.songlist = songlist
  },
  [types.SET_SEARCHHISTORY](state, searchHistory) {
    state.searchHistory = searchHistory
  },
  [types.SET_PLAYHISTORY](state, playHistory) {
    state.playHistory = playHistory
  },
  [types.SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list
  }
}

export default mutations;
