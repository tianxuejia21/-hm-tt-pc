import VueRouter from 'vue-router'

import Vue from 'vue'

import Login from '@/views/login'

import Home from '@/views/home'

import Welcome from '@/views/welcome'

import Notfound from '@/views/404'

import local from '@/utils/local.js'

import article from '@/views/article'

import image from '@/views/image'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          component: Welcome
        },
        {
          path: '/article',
          component: article
        },
        {
          path: '/photo',
          component: image
        }
      ]
    },
    {
      path: '*',
      component: Notfound
    }
  ]
})
router.beforeEach((to, from, next) => {
  const user = local.getUser()
  // 如果登录
  if (user && user.token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
