import {jsonp} from 'common/js/jsonp'
import axios from 'axios'
import { commonParams, opts } from 'api/common-query.js'

/**
 * jsonp抓取推荐页轮播图数据
 * 接口：https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg
 */
export function getRecommend() {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  let data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, opts)
}

/**
 * axios 抓取推荐页列表数据
 * 接口：https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg
 * 接口提供方使用了 referer:https://y.qq.com/portal/playlist.html
 * axios结合node.js代理后端请求
 */
export function getList() {
  let url = '/api/getList'
  let data = Object.assign({}, commonParams, {
    rnd: Math.random(),
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29
  })
  return axios.get(url, {
    params: data
  })
  .then((res) => {
    return Promise.resolve(res.data)
  })
  .catch((error) => {
    console.log(error)
  })
}

/**
 * 接口 搜索 keyword 关键字
 */
export function getResult(query, page, perpage, zhida) {
  let url = '/api/getResult'
  let data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    n: perpage,
    perpage,
    zhidaqu: 1,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    uin: 0,
    platform: 'h5',
    uid: 0,
    needNewCode: 1,
    remoteplace: 'txt.mqq.all'
  })

  return axios.get(url, {
    params: data
  })
  .then((res) => {
    // console.log('>>>***',JSON.stringify(res.data), typeof res.data)
    return Promise.resolve(res.data)
  })
  .catch(err => {
    console.log(err)
  })
}


/**
 * jsonp 抓取推荐页歌单数据
 * 接口：https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg
 * 提供方：https://y.qq.com/n/yqq/playlist/1471714611.html#
 */

export const getSongList = (disstid) => {
  let url = '/api/getSonglist'
  let data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log('song list err', err)
  })
};




