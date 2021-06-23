import Vue from 'vue'
import VueRouter from 'vue-router'
// import Msite from '../pages/Msite/Msite.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: () => import('../pages/Msite/Msite.vue'),
      children: [
        {
          path: 'food',
          components: {
            shop: () => import('../components/Food/Food.vue')
          }
        }
      ]
    },
    {
      path: '/shop/:shopName',
      component: () => import('..//components/Shop/Shop.vue'),
      props: true
    },
    {
      path: '/order',
      component: () => import('../pages/Order/Order.vue')
    },
    {
      path: '/profile',
      component: () => import('../pages/Profile/Profile.vue')
    },
    {
      path: '/login',
      component: () => import('../pages/Profile/Login.vue')
    },
    {
      path: '/register',
      component: () => import('../pages/Profile/Register.vue')
    },
    {
      path: '/comment',
      component: () => import('../pages/Profile/Comment.vue')
    },
    {
      path: '/history',
      component: () => import('../pages/Profile/HistoryOrder')
    },
    {
      path: '/search',
      component: () => import('../pages/Msite/Search.vue')
    }
  ]
})
