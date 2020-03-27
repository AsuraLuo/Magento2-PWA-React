import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'v-not-find',
    head: {
        title: {
            inner: 'PWA',
            complement: '404'
        }
    }
})
export default class VNotFind extends Vue {
    protected render (h: CreateElement) {
        return (
            <div class="v-not-find">
                404 Page
            </div>
        )
    }
}