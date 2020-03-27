import Vue from 'vue'
import { Store } from 'vuex'
import VueRouter, { Route } from 'vue-router'
 
declare module 'vue/types/options' {
    interface ComponentOptions<
        V extends Vue,
        Data = DefaultData<V>,
        Methods = DefaultMethods<V>,
        Computed = DefaultComputed,
        PropsDef = PropsDefinition<DefaultProps>,
        Props = DefaultProps> {
        [key: string]: any;
    } 
}

declare module 'vue/types/vue' {
    interface Vue {
        [key: string]: any
    }

    interface VueConstructor {
        $store: Store<any>
        $router: VueRouter
        $route: Route
        $api: any
        $url: any
    }
}