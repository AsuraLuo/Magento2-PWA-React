import { CreateElement, FunctionalComponentOptions, RenderContext } from 'vue'

const VBreadcrumbs: FunctionalComponentOptions<any> = {
    name: 'v-breadcrumbs',
    functional: true,
    render (h: CreateElement, context: RenderContext<any>) {
        return (
            <section class="v-breadcrumbs">
                
            </section>
        )
    } 
}

export default VBreadcrumbs