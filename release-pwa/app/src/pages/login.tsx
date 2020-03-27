import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'v-login',
    head: {
        title: {
            inner: 'PWA',
            complement: 'Login'
        }
    }
})
export default class VLogin extends Vue {
    protected render (h: CreateElement) {
        return (
            <div class="v-login">
                Login Page
            </div>
        )
    }
}