import { CreateElement, FunctionalComponentOptions, RenderContext } from 'vue'

interface Copyright {
    html: string
}

const VCopyright: FunctionalComponentOptions<Copyright> = {
    name: 'v-copyright',
    props: {
        html: String
    },
    functional: true,
    render (h: CreateElement, context: RenderContext<Copyright>) {
        const { html } = context.props

        return (
            <small class="v-copyright" domPropsInnerHTML={html}></small>
        )
    } 
}

export default VCopyright