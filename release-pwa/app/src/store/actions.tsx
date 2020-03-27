import { ApolloActionTree } from './interface'
import { validateRouter } from '../graphql/validateRouter.gql'
import { getStoreConfig } from '../graphql/getStoreConfig.gql'
import { getNavigation } from '../graphql/getNavigation.gql'
import { getCmsPage } from '../graphql/getCmsPage.gql'
import { getSlider } from '../graphql/getSlider.gql'
import { getCategoryInfo } from '../graphql/getCategoryInfo.gql'
import { getProductDetail } from '../graphql/getProductDetail.gql'
import { getProductList } from '../graphql/getProductList.gql'
import { getBlogPosts } from '../graphql/getBlogPosts.gql'

const actions: ApolloActionTree<any, any> = {
    async validateRouter ({ apollo }, url: string) {
        return await apollo.query({
            query: validateRouter,
            variables: {
                url: url
            }
        })
    },
    async routeInit ({ dispatch }) {
        dispatch('getStoreConfig')
    },
    async getStoreConfig ({ commit, apollo }) {
        let res: any = await apollo.query({
            query: getStoreConfig
        })

        if (res.data) {
            const storeConfig: any = res.data.storeConfig
            commit('saveStoreConfig', storeConfig)
        }
    },
    async getNavigation ({ commit, state, apollo }) {
        let { rootIds } = state
        let res: any = await apollo.query({
            query: getNavigation,
            variables: {
                filters: {
                    ids: {
                        eq: rootIds
                    }
                }
            }
        })

        if (res.data) {
            const categoryMenu: any = res.data.categoryList[0].children
            commit('saveCategoryMenu', categoryMenu)
        }
    },
    async getCmsPage ({ commit, state, apollo }) {
        let path: string = state.route.path
        let res: any = await apollo.query({
            query: getCmsPage,
            variables: {
                identifier: path.replace('/page/', '')
            }
        })

        if (res.data) {
            commit('saveCmsPage', res.data.cmsPage)
        }
    },
    async getBanner ({ commit, apollo }) {
        let res: any = await apollo.query({
            query: getSlider
        })

        if (res.data) {
            const banner: any[] = res.data.slider.banner
            commit('saveCmsBanner', banner)
        }
    },
    async getCategoryInfo ({ commit, dispatch, state, apollo }) {
        let path: string = state.route.path
        let res: any = await apollo.query({
            query: getCategoryInfo,
            variables: {
                filters: {
                    url_key: {
                        eq: path.replace('/category/', '')
                    }
                }
            }
        })

        if (res.data) {
            const category: any = res.data.categoryList[0]

            commit('saveCategory', category)

            if (category.product_count > 0) dispatch('getProductList', category.id)
        }
    },
    async getProductList ({ commit, apollo }, id: string) {
        let res: any = await apollo.query({
            query: getProductList,
            variables: {
                filter: {
                    category_id: {
                        eq: id
                    }
                },
                pageSize: 20,
                currentPage: 1,
                sort: {
                    position: 'ASC'
                }
            }
        })

        if (res.data) {
            const products: any = res.data.products
            commit('updateProducts', products)
        }
    },
    async getProductDetail ({ commit, state, apollo }) {
        let path: string = state.route.path
        let res: any = await apollo.query({
            query: getProductDetail,
            variables: {
                filter: {
                    url_key: {
                        eq: path.replace('/product/', '')
                    }
                }
            }
        })

        if (res.data) {
            const product: any = res.data.products.items[0]
            commit('saveProductDetail', product)
        }
    },
    async getBlogList ({ commit, state, apollo }) {
        let res: any = await apollo.query({
            query: getBlogPosts,
            variables: {
                filter: {},
                pageSize: 20,
                currentPage: 1,
                sort: 'ASC'
            }
        })

        if (res.data) {
            console.log(res.data)
        }
    }
}

export default actions