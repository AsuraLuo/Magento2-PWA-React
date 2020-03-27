import { RouteConfig } from 'vue-router'

const VHomePage: any = () => import(/* webpackChunkName: "vsf-homepage" */ '../pages/homepage')
const VCategory: any = () => import(/* webpackChunkName: "vsf-category" */ '../pages/category')
const VProduct: any = () => import(/* webpackChunkName: "vsf-product" */ '../pages/product')
const VCart: any = () => import(/* webpackChunkName: "vsf-cart" */ '../pages/cart')
const VCheckout: any = () => import(/* webpackChunkName: "vsf-checkout" */ '../pages/checkout')
const VLogin: any = () => import(/* webpackChunkName: "vsf-login" */ '../pages/login')
const VRegister: any = () => import(/* webpackChunkName: "vsf-register" */ '../pages/register')
const VAccount: any = () => import(/* webpackChunkName: "vsf-account" */ '../pages/account')
const VPage: any = () => import(/* webpackChunkName: "vsf-page" */ '../pages/page')
const VBlog: any = () => import(/* webpackChunkName: "vsf-blog" */ '../pages/blog')
const VNotFind: any = () => import(/* webpackChunkName: "vsf-notFind" */ '../pages/notFind')

const routes: Array<RouteConfig> = [
    {
        name: 'homepage',
        path: '/', 
        component: VHomePage
    },
    { 
        name: 'category',
        path: '/category*', 
        component: VCategory
    },
    {
        name: 'product',
        path: '/product*',
        component: VProduct
    },
    {
        name: 'cart',
        path: '/cart',
        component: VCart
    },
    {
        name: 'checkout',
        path: '/checkout',
        component: VCheckout
    },
    {
        name: 'login',
        path: '/login',
        component: VLogin
    },
    {
        name: 'register',
        path: '/register',
        component: VRegister
    },
    {
        name: 'account',
        path: '/account',
        component: VAccount
    },
    {
        name: 'page',
        path: '/page*',
        component: VPage
    },
    {
        name: 'blog',
        path: '/blog',
        component: VBlog
    },
    {
        name: '404',
        path: '/404',
        component: VNotFind
    },
    {
        name: 'redirect',
        path: '*',
		redirect: '/404'
    }
]

export default routes