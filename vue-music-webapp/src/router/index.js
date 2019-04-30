import Vue from 'vue'
import Router from 'vue-router'

const MyUser = resolve => require(['@/components/MyUser/MyUser'], resolve)
const MySongListDetail = resolve => require(['@/components/MySongListDetail/MySongListDetail'], resolve)
const MyRecommend = resolve => require(['@/components/MyRecommend/MyRecommend'], resolve)
const MySinger = resolve => require(['@/components/MySinger/MySinger'], resolve)
const MyRank = resolve => require(['@/components/MyRank/MyRank'], resolve)
const MySearch = resolve => require(['@/components/MySearch/MySearch'], resolve)
const MySingerDetail = resolve => require(['@/components/MySingerDetail/MySingerDetail'], resolve)
const MyRankDetail = resolve => require(['@/components/MyRankDetail/MyRankDetail'], resolve)


Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/user',
      name: 'user',
      component: MyUser
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: MyRecommend,
      children: [
        {
          path: ':id',
          name: 'songlistdetail',
          component: MySongListDetail
        }
      ]
    },
    {
      path: '/singer',
      name: 'singer',
      component: MySinger,
      children: [
        {
          path: ':id',
          name: 'rsingerdetail',
          component: MySingerDetail
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: MySearch,
      children: [
        {
          path: ':id',
          name: 'singerdetail',
          component: MySingerDetail
        }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: MyRank,
      children: [
        {
          path:':id',
          name: 'rankdetail',
          component: MyRankDetail
        }
      ]
    }

  ]
})
