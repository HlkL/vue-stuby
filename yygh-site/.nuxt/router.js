import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6e113da4 = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages/user/index" */))
const _0d31c5a0 = () => interopDefault(import('..\\pages\\weixin\\callback.vue' /* webpackChunkName: "pages/weixin/callback" */))
const _7ccf23e4 = () => interopDefault(import('..\\pages\\hospital\\detail\\_hoscode.vue' /* webpackChunkName: "pages/hospital/detail/_hoscode" */))
const _c5131756 = () => interopDefault(import('..\\pages\\hospital\\notice\\_hoscode.vue' /* webpackChunkName: "pages/hospital/notice/_hoscode" */))
const _5276f206 = () => interopDefault(import('..\\pages\\hospital\\_hoscode.vue' /* webpackChunkName: "pages/hospital/_hoscode" */))
const _7628c499 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/user",
    component: _6e113da4,
    name: "user"
  }, {
    path: "/weixin/callback",
    component: _0d31c5a0,
    name: "weixin-callback"
  }, {
    path: "/hospital/detail/:hoscode?",
    component: _7ccf23e4,
    name: "hospital-detail-hoscode"
  }, {
    path: "/hospital/notice/:hoscode?",
    component: _c5131756,
    name: "hospital-notice-hoscode"
  }, {
    path: "/hospital/:hoscode?",
    component: _5276f206,
    name: "hospital-hoscode"
  }, {
    path: "/",
    component: _7628c499,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
