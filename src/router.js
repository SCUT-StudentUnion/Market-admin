import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Layout from './views/Layout.vue'
import Dashboard from './views/Dashboard.vue'
import Goods from "./views/Goods.vue";
import Audit from "./views/Audit.vue";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: Dashboard
        }, {
          path: '/goods',
          name: 'goods',
          component: Goods
        }, {
          path: '/audit',
          name: 'audit',
          component: Audit
        }
      ]
    }
  ]
})
