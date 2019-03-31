import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import mainPage from '../pages/mainPage.vue'
import Index from '../pages/Index.vue'
import Detail from '../pages/Detail.vue'
import searchList from '../pages/searchList.vue'
import Login from '../pages/Login.vue'
import home from '../pages/home.vue'
import Register from '../pages/Register.vue'

Vue.use(Router)
Vue.use(axios)

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
  },{
    path: '/login',
    component: Login
  }, {
    path: '/home',
    component: home
  },{
    path:'/register',
    component:Register
  }]
})
