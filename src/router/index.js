import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index.vue'
import Detail from '../components/Detail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/bookDetail',
      component: Detail
    }
  ]
})
