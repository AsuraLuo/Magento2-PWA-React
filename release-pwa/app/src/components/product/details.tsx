import { CreateElement, FunctionalComponentOptions, RenderContext } from 'vue'
import { Product } from '@helper/interface'

interface ProductDetail {
    product: Product
}

const VProductDetail: FunctionalComponentOptions<ProductDetail> = {
    name: 'v-product-detail',
    props: {
        product: Object
    },
    functional: true,
    render (h: CreateElement, context: RenderContext<ProductDetail>) {
        const { product } = context.props

        return (
            product && (
                <article class="in-details">
                    <section class="in-name">
                        <h4 itemprop="brand">{product.name}</h4>
                        <h1 itemprop="name">{product.name}</h1>
                    </section>
                    <section class="in-sku">
                        <span itemprop="sku">{`Sku: ${product.sku}`}</span>
                        <span itemprop="stock">{product.stock_status}</span>
                    </section>
                    <section class="in-short">
                        <div itemprop="description" domPropsInnerHTML={product.short_description.html}></div>
                    </section>
                </article>
            )
        )
    } 
}

export default VProductDetail