import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'components/recommend/recommend'
import singer from 'components/singer/singer'
import rank from 'components/rank/rank'
import search from 'components/search/search'
import SingerDetail from 'components/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({
  routes: [
    /* {
      path: '/',
      name: 'Hello',
      component: Hello
    } */
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: recommend
    },
    {
      path: '/singer',
      component: singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: rank
    },
    {
      path: '/search',
      component: search
    }
  ]
})
