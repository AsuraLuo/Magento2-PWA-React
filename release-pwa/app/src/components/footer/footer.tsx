import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import VLinks from './links'
import VCopyright from './copyright'

@Component({
    name: 'v-footer',
    components: {
        VLinks,
        VCopyright
    }
})
export default class VFooter extends Vue {
    @State (state => state.storeConfig) storeConfig: any

    protected render (h: CreateElement) {
        return (
            <footer class="v-footer">
                {this.storeConfig && (
                    <div class="container">
                        <v-links></v-links>
                        <v-copyright html={this.storeConfig.copyright}></v-copyright>
                    </div>
                )}
            </footer>
        )
    }
}