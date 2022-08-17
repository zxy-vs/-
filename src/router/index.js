import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import('../views/Home.vue'),
    children:[{
      path:'/category/:id',
      name:'category',
      component:()=>import('../components/category/CGCom.vue'),
    },{
      path:'/category/sub/:id',
      name:'sub',
      component:()=>import('../components/category/Sub.vue'),
    },{
      path:'/product/:id',
      name:'product',
      component:()=>import('../components/category/Product.vue'),
    },{
      path:'/member',
      component:()=>import('../components/member/MCom.vue'),
      children:[{
        path:'/member/order',
        component:()=>import('../components/member/order.vue'),
      }]
    },{
      path:'/cart',
      component:()=>import('../components/category/cart.vue')
    }]
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
