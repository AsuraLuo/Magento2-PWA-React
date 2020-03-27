import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { Route } from 'vue-router'

@Component({
    name: 'v-blog',
    head: {
        title: function () {
            return this.title
        }
    }
})
export default class VPage extends Vue {
    public title: object = {
        inner: 'PWA',
        complement: 'Blog'
    }

    @Action('getBlogList') getBlogList: any
    
    public beforeRouteEnter (to: Route, from: Route, next: Function) {
        next((vm: Vue) => {
            vm.getBlogList()
        })
    }
    
    public beforeRouteUpdate (to: Route, from: Route, next: Function) {
        next()
    }

    protected render (h: CreateElement) {
        return (
            <div class="v-blog">
               
            </div>
        )
    }
}