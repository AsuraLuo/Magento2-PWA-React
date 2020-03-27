import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'v-account',
    head: {
        title: {
            inner: 'PWA',
            complement: 'Account'
        }
    }
})
export default class VAccount extends Vue {
    protected render (h: CreateElement) {
        return (
            <div class="v-account">
                Account Page
            </div>
        )
    }
}