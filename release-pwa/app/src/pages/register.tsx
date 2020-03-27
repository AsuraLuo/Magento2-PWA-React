import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'v-register',
    head: {
        title: {
            inner: 'PWA',
            complement: 'Register'
        }
    }
})
export default class VRegister extends Vue {
    protected render (h: CreateElement) {
        return (
            <div class="v-register">
                Register Page
            </div>
        )
    }
}