import {jsonp} from '@/common/js/jsonp'
import {commonParams, opts} from '@/api/common-query'
/**
 * jsonp 抓取排行页数据
 * 接口(pc端)： https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg
 * 接口(移动端): https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg
 * 提供方：https://y.qq.com/n/yqq/toplist/4.html
 */
export const getRankList = () => {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  let data = Object.assign({}, commonParams, {
    uin: 0,
    format: 'h5',
    needNewCode: 1
  })
  return jsonp(url, data, opts)
}

/**
 * jsonp 抓取排行详情页数据
 * 接口：https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg
 *
 * @param {} params
 */
export const getRankDetail = (topid) => {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  let data = Object.assign({}, commonParams, {
    hostUin: 0,
    platform: 'h5',
    needNewCode: 1,
    order: 'listen',
    begin: 0,
    uin: 0,
    num: 100,
    songstatus: 1,
    format: 'json',
    type: 'top',
    tpl: 3,
    page: 'detail',
    topid
  })
  return jsonp(url,data,opts)
}
