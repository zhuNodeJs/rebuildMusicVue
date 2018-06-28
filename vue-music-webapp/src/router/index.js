import Vue from 'vue'
import Router from 'vue-router'

const MyUser = resolve => (['@/components/MyUser/MyUser'], resolve)
const MyRecommend = resolve => (['@/components/MyRecommend/MyRecommend'], resolve)
const MySongListDetail = resolve => (['@/components/MySongListDetail/MySongListDetail'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: 'user',
      name: 'user',
      component: MyUser
    },
    {
      path: 'recommend',
      name: 'recommend',
      component: MyRecommend,
      children: [
        {
          path: ':id',
          name: 'songlistdetail',
          component: MySongListDetail
        }
      ]
    }
  ]
})
