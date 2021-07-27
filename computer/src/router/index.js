import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Admin from '@/views/Admin'
import Cr from '@/components/admin/computerRoom'
import Wel from '@/components/admin/welcome'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children:[
        {
        path: '/admin/611',
        name: 'cr',
        component: Wel,
        },
        {
        path: '/admin/welcome',
        name: 'welcome',
        component: Wel,
        }
      ]
    }
  ]
})
