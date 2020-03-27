import { CreateElement, FunctionalComponentOptions, RenderContext } from 'vue'

interface Description {
    html: string
}

const VDescription: FunctionalComponentOptions<Description> = {
    name: 'v-description',
    props: {
        html: String
    },
    functional: true,
    render (h: CreateElement, context: RenderContext<Description>) {
        const { html } = context.props

        return (
            <div class="description" domPropsInnerHTML={html}></div>
        )
    } 
}

export default VDescription