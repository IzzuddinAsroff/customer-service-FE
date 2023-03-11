import Vue from 'vue'
import VueRouter from 'vue-router'
import CustomerList  from '../views/CustomerList.vue'
import CustomerDetail  from '../views/CustomerDetail.vue'
import CustomerModify  from '../views/CustomerModify.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'CustomerList',
    component: CustomerList
  },
  {
    path: '/detail',
    name: 'CustomerDetail',
    component: CustomerDetail
  },
  {
    path: '/modify',
    name: 'CustomerModify',
    component: CustomerModify
  }
]

const router = new VueRouter({
  routes
})

export default router
