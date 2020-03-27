import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { Route } from 'vue-router'

@Component({
    name: 'v-page',
    head: {
        title: function () {
            return this.title
        }
    }
})
export default class VPage extends Vue {
    public title: object = {
        inner: 'PWA',
        complement: 'Page'
    }
    
    @Watch('cmsPage')
    onCmsPageChanged(page: any) {
        this.title = {
            inner: 'PWA',
            complement: page.title
        }
        this.$emit('updateHead')
    }

    @State('cmsPage') cmsPage: any
    @Action('getCmsPage') getCmsPage: any

    public beforeRouteEnter (to: Route, from: Route, next: Function) {
        next((vm: Vue) => {
            vm.getCmsPage()
        })
    }
    
    public beforeRouteUpdate (to: Route, from: Route, next: Function) {
        next()
        this.getCmsPage()
    }

    protected render (h: CreateElement) {
        return (
            <div class="v-page">
                {this.cmsPage && (
                    <div class="container" domPropsInnerHTML={this.cmsPage.content}></div>
                )}
            </div>
        )
    }
}