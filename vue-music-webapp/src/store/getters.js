// 映射
export const singer = (state) => state.singer
export const playing = (state) => state.playing
export const fullScreen = (state) => state.fullScreen
export const mode = (state) => state.mode
export const sequenceList = (state) => state.sequenceList
//  当前播放的音乐的索引
export const currentIndex = (state) => state.currentIndex

// 计算
export const playlist = (state) => state.playlist
export const songlist = (state) => state.songlist

// 当前的播放的歌曲
export const currentSong = (state) => state.playlist[state.currentIndex] || {}

export const searchHistory = state => state.searchHistory
export const playHistory = state => state.playHistory
export const favoriteList = state => state.favoriteList
