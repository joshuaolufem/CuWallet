import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../components/Dashboard'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        redirect: 'student'
      },
      {
        path: 'student',
        name: 'Student',
        component: () => import('../components/Dashboard/Student'),
        children: [
          {
            path: '',
            redirect: 'wallet'
          },
          {
            path: 'wallet',
            name: 'Wallet',
            component: () => import('../components/Dashboard/Student/Wallet'),
            children: [
              {
                path: 'transfer-funds',
                name: 'TransferFunds',
                component: () => import('../components/Dashboard/Student/Wallet/TransferFunds')
              },
              {
                path: 'withdraw-funds',
                name: 'WithdrawFunds',
                component: () => import('../components/Dashboard/Student/Wallet/WithdrawFunds')
              }
            ]
          },
          {
            path: 'orders',
            name: 'Orders',
            component: () => import('../components/Dashboard/Student/Orders')
          }
        ]
      },
      {
        path: 'service-provider',
        name: 'ServiceProvider',
        component: () => import('../components/Dashboard/ServiceProvider'),
        children: [
          {
            path: '',
            redirect: 'products'
          },
          {
            path: 'products',
            name: 'Products',
            component: () => import('../components/Dashboard/ServiceProvider/Products'),
            children: [
              {
                path: '',
                redirect: 'product-list'
              },
              {
                path: 'product-list',
                name: 'ProductList',
                component: () => import('../components/Dashboard/ServiceProvider/Products/ProductList')
              },
              {
                path: 'add-product',
                name: 'AddProduct',
                component: () => import('../components/Dashboard/ServiceProvider/Products/AddProduct')
              },
              {
                path: 'edit-product',
                name: 'EditProduct',
                component: () => import('../components/Dashboard/ServiceProvider/Products/EditProduct')
              }
            ]
          },
          {
            path: 'orders',
            name: 'Orders',
            component: () => import('../components/Dashboard/ServiceProvider/Orders')
          }
        ]
      },
      {
        path: 'agent',
        name: 'Agent',
        component: () => import('../components/Dashboard/Agent'),
        children: [
          {
            path: 'fund-student',
            name: 'FundStudent',
            component: () => import('../components/Dashboard/Agent/FundStudent')
          },
          {
            path: 'fund-agent',
            name: 'FundAgent',
            component: () => import('../components/Dashboard/Agent/FundAgent'),
            children: [
              {
                path: '',
                redirect: 'fund-other-agent'
              },
              {
                path: 'fund-other-agent',
                name: 'OtherAgent',
                component: () => import('../components/Dashboard/Agent/FundAgent/OtherAgent')
              },{
                path: 'fund-self',
                name: 'Self',
                component: () => import('../components/Dashboard/Agent/FundAgent/Self')
              }
            ]
          }
        ]
      },
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('../components/Dashboard/Admin'),
        children: [
          {
            path: 'agents',
            name: 'Agents',
            component: () => import('../components/Dashboard/Admin/Agents'),
            children: [
              {
                path: '',
                redirect: 'all-agents'
              },
              {
                path: 'all-agents',
                name: 'AllAgents',
                component: () => import('../components/Dashboard/Admin/Agents/AllAgents')
              },
              {
                path: 'create-agent-account',
                name: 'CreateAgentAccount',
                component: () => import('../components/Dashboard/Admin/Agents/CreateAgentAccount')
              }
            ]
          },
          {
            path: 'service-providers',
            name: 'ServiceProvider',
            component: () => import('../components/Dashboard/Admin/ServiceProviders')
          },
          {
            path: 'students',
            name: 'Students',
            component: () => import('../components/Dashboard/Admin/Students')
          }
        ]
      }
    ]
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('../components/Shop'),
    children: [
      {
        path: '',
        redirect: '/shop/home'
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import('../components/Shop/Home')
      },
      {
        path: 'store',
        name: 'Store',
        component: () => import('../components/Shop/Store')
      },
      {
        path: 'canteen',
        name: 'Canteen',
        component: () => import('../components/Shop/Canteen')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../components/Shop/Cart')
      }
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../components/Auth'),
    children: [
      {
        path: '',
        redirect: '/auth/register'
      },
      {
        path: '/auth/register',
        name: 'Register',
        component: () => import('../components/Auth/Register'),
        children: [
          {
            path: '',
            redirect: '/auth/register/student'
          },
          {
            path: '/auth/register/student',
            name: 'Student',
            component: () => import('../components/Auth/Register/Student')
          },
          {
            path: '/auth/register/service-provider',
            name: 'ServiceProvider',
            component: () => import('../components/Auth/Register/ServiceProvider')
          }
        ]
      },
      {
        path: '/auth/login',
        name: 'Login',
        component: () => import('../components/Auth/Login')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !store.getters.currentUser) {
    next('/auth/login')
  } else {
    next()
  }
})

export default router
