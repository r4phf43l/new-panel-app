import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home'),
    },
    {
      path: '/settings',
      component: () => import('@/views/Settings'),
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
