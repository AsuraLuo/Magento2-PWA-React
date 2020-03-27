import Vue, { VNode } from 'vue'

declare global {
    namespace JSX {
        interface Element extends VNode {}
        interface ElementClass extends Vue {}
        interface ElementAttributesProperty {
            $props: {}
        }
        interface IntrinsicElements {
            div: any,
            [key: string]: any
        }
        interface PropsType {
            children: JSX.Element
            name: string
        }
        interface ElementChildrenAttribute {
            children: {}
        }
    }
}