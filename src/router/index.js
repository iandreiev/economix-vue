import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from "../store"

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        name:'Index',
        component:()=>import('../views/Index'),
        redirect: '/panel/transactions'
    },
    {
        path: '/panel',
        name: 'DefaultPanel',
        component: () => import('../components/pages/default'),
        children: [
            {
                path: 'transactions',
                name: 'Transactions',
                component: () => import('../views/Transactions')
            },
            {
                path: 'categories',
                name: 'Categories',
                component: () => import('../views/Categories')
            },
            {
                path: 'currencies',
                name: 'Currencies',
                component: () => import('../views/Currencies')
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })

export default router
