import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'v-fragment',
    abstract: true
})
export default class VFragment extends Vue {
    @Prop({ default: Math.floor(Date.now() * Math.random()).toString(16) }) readonly name: string | undefined

    public mounted () {
        const container: any = this.$el
        const parent: any = container.parentNode
    
        const head: any = document.createComment('')
        const tail: any = document.createComment('')
    
        parent.insertBefore(head, container)
        parent.insertBefore(tail, container)
    
        container.appendChild = (node: any) => {
            parent.insertBefore(node, tail)
            this.freeze(node, 'parentNode', container)
        }
    
        container.insertBefore = (node: any, ref: any) => {
            parent.insertBefore(node, ref)
            this.freeze(node, 'parentNode', container)
        }
    
        container.removeChild = (node: any) => {
            parent.removeChild(node)
            this.unfreeze(node, 'parentNode')
        }
    
        Array.from(container.childNodes)
          .forEach(node => container.appendChild(node))
    
        parent.removeChild(container)
    
        this.freeze(container, 'parentNode', parent)
        this.freeze(container, 'nextSibling', tail.nextSibling)
    
        const insertBefore = parent.insertBefore;
        parent.insertBefore = (node: any, ref: any) => {
          insertBefore.call(parent, node, ref !== container ? ref : head)
        }
    
        const removeChild = parent.removeChild;
        parent.removeChild = (node: any) => {
            if (node === container) {
                while (head.nextSibling !== tail)
                    container.removeChild(head.nextSibling)

                parent.removeChild(head)
                parent.removeChild(tail)
                this.unfreeze(container, 'parentNode')

                parent.insertBefore = insertBefore
                parent.removeChild = removeChild
            } else {
                removeChild.call(parent, node)
            }
        }
    }

    freeze (object: any, property: string, value: any) {
        Object.defineProperty(object, property, {
            configurable: true,
            get () { 
                return value; 
            },
            set (v) { 
                console.warn(`tried to set frozen property ${property} with ${v}`) 
            }
        })
    }
      
    unfreeze (object: any, property: string, value: any = null) {
        Object.defineProperty(object, property, {
            configurable: true,
            writable: true,
            value: value
        })
    }

    protected render (h: CreateElement) {
        const children = this.$slots.default

        if (children && children.length) {
            children.forEach(child =>
                child.data = { ...child.data, attrs: { fragment: this.name, ...(child.data || {}).attrs } }
            )
        }

        return (
            <div {...{attrs: {fragment: this.name}}}>{children}</div>
        )
    }
}