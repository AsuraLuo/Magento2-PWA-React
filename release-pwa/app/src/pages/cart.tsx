import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'v-cart',
    head: {
        title: {
            inner: 'PWA',
            complement: 'Cart'
        }
    }
})
export default class VCart extends Vue {
    protected render (h: CreateElement) {
        return (
            <div class="v-cart">
                Cart Page
            </div>
        )
    }
}