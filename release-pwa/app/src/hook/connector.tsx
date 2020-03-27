import Vue, { CreateElement, FunctionalComponentOptions } from 'vue'
import { Store } from 'vuex'

interface IMapOptions {
    [index: string]: any
}

export default class VuexConnector {
    private store: Store<any>

    constructor (store: Store<any>) {
        this.store = store
    }
    
    private dataToProps(
        map: IMapOptions = {},
        type: 'getters' | 'state',
        props: any
    ): any {
        return Object.keys(map).reduce((pre: IMapOptions, cur: string) => {
            let fn: any
            const option: any = map[cur]

            switch (typeof option) {
              case 'function':
                fn = option;
                break
              case 'string':
                fn = (data: any): any => data[option];
                break
            }
      
            pre[cur] = fn.call(null, this.store[type], props)
            return pre
        }, {})
    }

    private functionToProps(
        map: IMapOptions = {},
        type: 'commit' | 'dispatch'
    ): any {
        return Object.keys(map).reduce((pre: IMapOptions, cur: string) => {
            const option: string = map[cur]

            pre[cur] = (...args: any[]): any => {
                const fn: any = this.store[type]
                return fn(option, ...args)
            }

            return pre
        }, {})
    }

    public connect({
        mapStateToProps = {},
        mapGettersToProps = {},
        mapDispatchToProps = {},
        mapCommitToProps = {},
        mapDispatchToEmits = {}
    }: any = {}) : (component: any) => FunctionalComponentOptions<any> {
        return (component: typeof Vue): any => {
            return {
                functional: true,
                render: (h: CreateElement, context: any): any => {
                    return h(
                        component,
                        Object.assign(context.data, {
                            props: Object.assign(
                                {},
                                context.props,
                                this.dataToProps(mapStateToProps, 'state', context.props),
                                this.dataToProps(mapGettersToProps, 'getters', context.props),
                                this.functionToProps(mapDispatchToProps, 'dispatch'),
                                this.functionToProps(mapCommitToProps, 'commit')
                            ),
                            on: Object.assign(
                                {},
                                context.on,
                                this.functionToProps(mapDispatchToEmits, 'dispatch')
                            )
                        }),
                        context.children
                    )
                }
            }
        }
    }
}