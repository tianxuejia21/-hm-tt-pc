import VueRouter from 'vue-router'

import Vue from 'vue'

import Login from '@/views/login'

import Home from '@/views/home'

import Welcome from '@/views/welcome'

import Notfound from '@/views/404'

import local from '@/utils/local.js'

import article from '@/views/article'

import image from '@/views/image'

import publish from '@/views/publish'

import comment from '@/views/comment'

import setting from '@/views/setting'

import fans from '@/views/fans'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Home,
    children: [{
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
    },
    {
      path: '/publish',
      component: publish
    },
    {
      path: '/comment',
      component: comment
    },
    {
      path: '/setting',
      component: setting
    },
    {
      path: '/fans',
      component: fans
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
