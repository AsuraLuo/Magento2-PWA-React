import { Component } from 'vue'
import VueRouter, { Route } from 'vue-router'
import routes from './config'
import RouterUtil from '@utils/router'

const router: VueRouter = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior (to: Route, from: Route, savedPosition: any) {
        return new Promise((resolve: any, reject: any) => {
            setTimeout(() => {
                resolve({ x: 0, y: 0 })
            }, 500)
        })
    }
})

router.beforeEach((to: Route, from: Route, next: any) => {
    if (RouterUtil.hasRouter(to)) {
        const params: string = RouterUtil.filterRouter(to)

        router.app.$store.dispatch('validateRouter', params).then((res: any) => {
            const urlResolver: any = res.data.urlResolver
            urlResolver ? next() : next({ name: '404' })
        }).catch((err: Error) => {
            console.log(err)
        })
    } else {
        next()
    }
})

router.beforeResolve((to: Route, from: Route, next: any) => {
    const matched: Component[] = router.getMatchedComponents(to)
    const prevMatched: Component[] = router.getMatchedComponents(from)
    
    let diffed: boolean = false
    let activated: Component[] = matched.filter((c: Component, i: number) => diffed || (diffed = (prevMatched[i] !== c)))

    if (!activated.length) {
        return next()
    }

    Promise.all(
        activated
        .filter((c: any) => c.asyncData && (!c.asyncDataFetched || !to.meta.keepAlive))
        .map(async (c: any) => {
            await c.asyncData({ route: to })
            c.asyncDataFetched = true
        })
    ).then(() => {
        next()
    }).catch(() => {
        next()
    })
})

export default router