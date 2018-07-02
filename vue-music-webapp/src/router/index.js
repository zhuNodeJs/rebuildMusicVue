import Vue from 'vue'
import Router from 'vue-router'

const MyUser = resolve => require(['@/components/MyUser/MyUser'], resolve)
const MySongListDetail = resolve => require(['@/components/MySongListDetail/MySongListDetail'], resolve)
const MyRecommend = resolve => require(['@/components/MyRecommend/MyRecommend'], resolve)
const MySinger = resolve => require(['@/components/MySinger/MySinger'], resolve)
const MyRank = resolve => require(['@/components/MyRank/MyRank'], resolve)
const MySearch = resolve => require(['@/components/MySearch/MySearch'], resolve)

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
      component: MySinger
    },
    {
      path: '/rank',
      name: 'rank',
      component: MyRank
    },
    {
      path: '/search',
      name: 'search',
      component: MySearch
    }
  ]
})
