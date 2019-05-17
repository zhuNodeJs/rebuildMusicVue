import storage from 'good-storage'

const SEARCH_KEY = '__search__'

/**
 * 插入新元素到arr[0]并删除重复值，可控制数组最大长度
 * arr 要插入到哪个数组
 * val 要插入的值
 * compareFn 比较函数
 * maxLen 数组的最大长度
 * type [description]
 */

 function insertArr(arr, val, compareFn, maxLen = 15) {
  let index = arr.findIndex(compareFn)
  if (index === 0) {
    // 输入的项和数组的第一个项是相同的，可以不继续进行相关的操作
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }

  // unshift() 反复可以向数组的开头添加一个或者更多的元素，并返回新的长度。
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    // pop() 方法用于删除并返回数组的最后的一个元素
    arr.pop()
  }
 }

function delArr(arr, compareFn) {
  let index = arr.findIndex(compareFn)

  if (index > -1) {
    arr.splice(index, 1)
  }
}

//  获取
export const getStorage = () => {
  return storage.get(SEARCH_KEY, [])
}

// 增加
export function localSave(query) {
  // 当前的localstorage的数组
  let searches = storage.get(SEARCH_KEY, [])
  insertArr(searches, query, (item) => {
    return item === query
  }, 15)

  storage.set(SEARCH_KEY, searches)

  return searches
}

// 删除
export const localDel = (query) => {
  // 当前的localstorage数组
  let searches = storage.get(SEARCH_KEY, [])

  delArr(searches, (item) => {
    return item === query
  })

  storage.set(SEARCH_KEY, searches)
  return searches
}

// 清空
export const localClear = (query) => {
  storage.remove(SEARCH_KEY)
  return []
}


// 最近播放 localstorage
const FAVORITE_KEY = '__favorite__'

// 获取
export function getFavorite() {
  return storage.get(FAVORITE_KEY, [])
}

// 增加
export function saveFavorite(song) {
  // 当前localstorage数组
  let songs = storage.get(FAVORITE_KEY, [])

  insertArr(songs, song, (item) => {
    return item.id === song.id
  }, 50)

  storage.set(FAVORITE_KEY, songs)

  return songs
}

// 删除
export function delFavorite(song) {
 // 当前localstorage数组
  let songs = storage.get(FAVORITE_KEY, [])
  delArr(songs, (item) => {
    return item.id === song.id
  })

  storage.set(FAVORITE_KEY, songs)

  return songs
}

// 最近播放localstorage
const PLAY_KEY = '__play__'

// 获取
export function getPlayStorage() {
  return storage.get(PLAY_KEY, [])
}

// 增加
export function savePlay(song) {
  // 当前localstorage数组
  let songs = storage.get(PLAY_KEY, [])

  insertArr(songs, song, (item) => {
    return item.id === song.id
  }, 50)

  storage.set(PLAY_KEY, songs)

  return songs
}
