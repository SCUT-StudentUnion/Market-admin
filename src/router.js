import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Layout from './views/Layout.vue'
import Dashboard from './views/Dashboard.vue'
import Goods from "./views/Goods.vue";
import Review from "./views/Review.vue";
import { hasLogedIn } from './api';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        public: true
      },
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
          path: '/review',
          name: 'review',
          component: Review
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isPublic = to.meta && to.meta.public;
  if (!isPublic && !hasLogedIn()) {
    const loginRoute = { name: "login" };
    if (to.name) loginRoute.params = { return: to.name };
    next(loginRoute);
  } else {
    next();
  }
});

export default router;
