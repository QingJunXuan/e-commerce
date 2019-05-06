import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import mainPage from '../pages/mainPage.vue'
import Index from '../pages/Index.vue'
import Detail from '../pages/Detail.vue'
import searchList from '../pages/searchList.vue'
import Login from '../pages/Login.vue'
import Personal from '../pages/Personal.vue'
import Register from '../pages/Register.vue'
import Cart from '../pages/Cart.vue'
import Address from '../pages/Address.vue'

Vue.use(Router)
Vue.prototype.$axios = axios

export default new Router({
  routes: [{
    path: '/',
    component: mainPage,

    children: [{
      path: '',
      component: Index
    }, {
      path: 'bookDetail',
      component: Detail
    }, {
      path: 'searchList',
      component: searchList
      }]
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/personal',
    component: Personal
  }, {
    path: '/register',
    component: Register
    }, {
      path: '/cart',
      component: Cart
    }, {
      path: '/address',
      component: Address
    }]
})
