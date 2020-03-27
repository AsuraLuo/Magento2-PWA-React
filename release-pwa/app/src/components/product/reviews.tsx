import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { I18n, Product } from '@helper/interface'

@Component({
    name: 'v-product-reviews'
})
export default class VProductReviews extends Vue {
    @Prop(Object) product: Product | undefined

    public i18n: I18n = {
        customerReivew: 'Customer Review',
        writeReview: 'Write A New Review',
        noReviews: 'There are no reviews yet! Click button on the right to submit one!'
    }

    public writeReview (e: Event) {
        e.stopPropagation()
        console.log(e)
    }

    protected render (h: CreateElement) {
        const product: any = this.product

        return (
            product && (
                <article>
                    <h1 class="title">{this.i18n.customerReivew}</h1>
                    <p>{this.i18n.noReviews}</p>
                    <v-button type="is-primary" onClick={(e: Event) => { this.writeReview(e) }}>{this.i18n.writeReview}</v-button>
                </article>
            )
        )
    }
}