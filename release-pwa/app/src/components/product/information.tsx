import { CreateElement, FunctionalComponentOptions, RenderContext } from 'vue'
import { Product } from '@helper/interface'

interface ProductInfo {
    product: Product
}

const VProductInformation: FunctionalComponentOptions<ProductInfo> = {
    name: 'v-product-information',
    props: {
        product: Object
    },
    functional: true,
    render (h: CreateElement, context: RenderContext<ProductInfo>) {
        const { product } = context.props

        return (
            product && (
                <article domPropsInnerHTML={product.description.html}></article>
            )
        )
    } 
}

export default VProductInformation