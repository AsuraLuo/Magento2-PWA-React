import Vue from 'vue'
import Vuex from 'vuex'

const isPromise: Function = (val: any) => {
    return val && typeof val.then === 'function'
}

const patchAction: Function = (store: any, type: any, handler: Function, local: any) => {
    const entry = store._actions[type] || (store._actions[type] = [])

    if (entry.length > 0) entry.pop()

    const wrappedActionHandler: Function = (payload: any, cb: any) => {
        let res = handler({
            dispatch: local.dispatch,
            commit: local.commit,
            getters: local.getters,
            state: local.state,
            rootGetters: store.getters,
            rootState: store.state,
            apollo: store.$apollo.defaultClient,
            bus: Vue.prototype['$bus']
        }, payload, cb)

        if (!isPromise(res)) res = Promise.resolve(res)
        if (store._devtoolHook) {
            return res.catch((err: any) => {
                store._devtoolHook.emit('vuex:error', err)
                throw err
            })
        } else {
            return res
        }
    }

    entry.push(wrappedActionHandler)
}

const patchModule: Function = (store: any, path: any, module: any, hot: any) => {
    const namespace = store._modules.getNamespace(path)
    const local = module.context

    module.forEachAction((action: any, key: any) => patchAction(store, (namespace + key), action, local))
    module.forEachChild((child: any, key: any) => patchModule(store, path.concat(key), child, hot))
}

export default (store: any) => {
    patchModule(store, [], store._modules.root)

    const orig = Vuex.Store.prototype.registerModule
    Vuex.Store.prototype.registerModule = function (path: any, rawModule: any) {
        const _this: any = this
        orig.call(_this, path, rawModule)
        patchModule(_this, [].concat(path), _this._modules.get([path]))
        _this.dispatch(`${path}Init`)
    }
}