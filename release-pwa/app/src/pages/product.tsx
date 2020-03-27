import Vue, { CreateElement } from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { Route } from 'vue-router'
import { VProductMedia, VProductDetail, VProductInformation, VProductReviews } from '@components/product'
import { I18n } from '@helper/interface'

@Component({
    name: 'v-product',
    head: {
        title: function () {
            return this.title
        }
    },
    components: {
        VProductMedia,
        VProductDetail,
        VProductInformation,
        VProductReviews
    }
})
export default class VProduct extends Vue {
    public title: object = {
        inner: 'PWA',
        complement: 'Product'
    }
    public i18n: I18n = {
        productInfo: 'Product Information'
    }

    @Watch('currentProduct')
    onCurrentProductChanged(product: any) {
        this.title = {
            inner: 'PWA',
            complement: product.name
        }
        this.$emit('updateHead')
    }

    @State('currentProduct') currentProduct: any
    @Action('getProductDetail') getProductDetail: any
    
    public beforeRouteEnter (to: Route, from: Route, next: Function) {
        next((vm: Vue) => {
            vm.getProductDetail()
        })
    }
    
    public beforeRouteUpdate (to: Route, from: Route, next: Function) {
        next()
        this.getProductDetail()
    }
    
    protected render (h: CreateElement) {
        return (
            <div class="v-product">
                <section class="v-details">
                    <div class="container">
                        <section class="in-wrapper">
                            <v-product-media product={this.currentProduct}></v-product-media>
                            <v-product-detail product={this.currentProduct}></v-product-detail>
                        </section>
                    </div>
                </section>
                <section class="v-information">
                    <div class="container">
                        <h3 class="in-title">{this.i18n.productInfo}</h3>
                        <v-product-information product={this.currentProduct}></v-product-information>
                    </div>
                </section>
                <section class="v-reviews">
                    <div class="container">
                        <v-product-reviews product={this.currentProduct}></v-product-reviews>
                    </div>
                </section>
            </div>
        )
    }
}