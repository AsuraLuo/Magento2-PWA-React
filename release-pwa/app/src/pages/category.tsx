import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { Route } from 'vue-router'
import { VDescription, VImage } from '@components/common'
import { VFilters } from '@components/filter'
import { VProductsList } from '@components/list'

@Component({
    name: 'v-category',
    head: {
        title: function () {
            return this.title
        }
    },
    components: {
        VDescription,
        VImage,
        VFilters,
        VProductsList
    }
})
export default class VCategory extends Vue {
    public title: object = {
        inner: 'PWA',
        complement: 'Category'
    }
    
    @Watch('currentCategory')
    onCurrentCategoryChanged(category: any) {
        this.title = {
            inner: 'PWA',
            complement: category.name
        }
        this.$emit('updateHead')
    }

    @State('currentCategory') currentCategory: any
    @Action('getCategoryInfo') getCategoryInfo: any

    public beforeRouteEnter (to: Route, from: Route, next: Function) {
        next((vm: Vue) => {
            vm.getCategoryInfo()
        })
    }
    
    public beforeRouteUpdate (to: Route, from: Route, next: Function) {
        next()
        this.getCategoryInfo()
    }

    protected render (h: CreateElement) {
        const currentCategory: any = this.currentCategory

        return (
            <div class="v-category">
                {currentCategory && (
                    <div class="container">
                        <section class="in-wrapper">
                            <v-filters></v-filters>
                            <article class="in-description">
                                <div class="content">
                                    <h1>{currentCategory.name}</h1>
                                    <v-description html={currentCategory.description}></v-description>
                                </div>
                                {currentCategory.image && (
                                    <v-image url={currentCategory.image} title={currentCategory.name}></v-image>
                                )}
                            </article>
                            <aside>
                                <p class="count">{`${currentCategory.product_count} items found`}</p>
                            </aside>
                            <v-products-list></v-products-list>
                        </section>
                    </div> 
                )}
            </div>
        )
    }
}