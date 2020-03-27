import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import VHeader from '@components/header/header'
import VBreadcrumbs from '@components/common/breadcrumbs'
import VFooter from '@components/footer/footer'

@Component({
    name: 'v-app',
    components: {
        VHeader,
        VBreadcrumbs,
        VFooter
    }
})
export default class VApp extends Vue {
    protected render (h: CreateElement) {
        return (
            <div id="root">
                <v-header></v-header>
                <v-breadcrumbs></v-breadcrumbs>
                <main class="v-main">
                    <transition name="fade">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </transition>
                </main>
                <v-footer></v-footer>
            </div>
        )
    }
}