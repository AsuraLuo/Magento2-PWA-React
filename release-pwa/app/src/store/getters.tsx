import { GetterTree } from 'vuex'
import { StoreConfig } from '@helper/interface'

const getters: GetterTree<any, any> = {
    logoStore: (state) => {
        const config: StoreConfig = state.storeConfig
        
        if (config) {
            return {
                url: `${config.base_media_url}logo/${config.header_logo_src}`,
                href: config.base_url,
                title: config.logo_alt
            }
        }
    },
    productList: (state) => {
        const collection: any = state.productCollection

        return collection ? collection.items : []
    },
    filter: (state) => {
        const collection: any = state.productCollection

        return collection ? collection.filters : []
    }
}

export default getters