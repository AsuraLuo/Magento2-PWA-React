import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({
    name: 'v-products-list'
})
export default class VProductsList extends Vue {
    @Getter('productList') productList: any

    protected render (h: CreateElement) {
        const products: any[] = this.productList

        return (
            <div class="v-produts-list">
                {products.length > 0 ? (
                    <ul class="list">
                        {products.map((product: any) => {
                            const image: any = product.thumbnail
                            const mini_price: any = product.price_range.minimum_price

                            return (
                                <li itemscope itemtype="https://schema.org/Product">
                                    <meta itemprop="sku" content={product.sku} />
                                    <div class="v-product-item">
                                        <router-link tag="a" to={`/product/${product.url_key}`} title={product.title}>
                                            <figure class="in-figure">
                                                <div class="picture">
                                                    <img v-lazy={image.url} alt={image.label} />
                                                </div>
                                            </figure>
                                            <div class="in-content">
                                                <p class="price" itemprop="offers" itemscope="" itemtype="https://schema.org/AggregateOffer">
                                                    <span>
                                                        <data value={mini_price.final_price.value}>
                                                            <span>$</span>
                                                            <span itemprop="lowPrice">{mini_price.final_price.value}</span>
                                                        </data>
                                                    </span>
                                                    <meta itemprop="priceCurrency" content="USD" />    
                                                </p>
                                                <p class="name">{product.name}</p>
                                            </div>
                                        </router-link>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                    <p>There is no match produts !</p>
                )}
            </div>
        )
    }
}