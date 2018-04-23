import Vue from 'vue'
import VueRouter from 'vue-router'
import PageContent from './pages/index'

Vue.use(VueRouter)

export default new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/products/:product',
      name: 'product',
      component: () => import(/* webpackChunkName: "product" */ './pages/product.vue')
    },
    {
      path: '/*',
      component: PageContent
    }
  ]
})
