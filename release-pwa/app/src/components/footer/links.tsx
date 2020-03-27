import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { Links } from '@helper/interface'

@Component({
    name: 'v-links'
})
export default class VLinks extends Vue {
    public links: Array<Links> = [
        { title: 'Privacy policy', url: '/page/privacy-policy-cookie-restriction-mode' },
        { title: 'Enable Cookies', url: '/page/enable-cookies' },
        { title: 'Blog', url: '/blog' }
    ]

    protected render (h: CreateElement) {
        return (
            <ul class="v-links">
                {this.links.map((item: Links) => {
                    return (
                        <li>
                            <router-link tag="a" to={item.url} title={item.title}>{item.title}</router-link>
                        </li>
                    )
                })}
            </ul>
        )
    }
}