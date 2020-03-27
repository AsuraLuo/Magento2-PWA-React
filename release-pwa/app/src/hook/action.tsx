const VuexActionDebounce: Function =  (timeout: number = 0) => {
    return (store: any) => {
        const dispatchOrigin = store.dispatch
    
        store.dispatch = debouncedDispatch
        store._debouncedActions = {}
    
        /**
         * @method debouncedDispatch
         * @return {Promise}
         */
        function debouncedDispatch () {
            let args = arguments
            let argsArr = Array.prototype.slice.call(args)
            let actionType = Array.prototype.shift.call(argsArr)
            let argsKey = ''
    
            try {
                argsKey = JSON.stringify(args)
            } catch (e) {
                console.warn(e)
            }
    
            return promiseOne(
                () => dispatchOrigin.apply(store, args),
                `${actionType}_${argsKey}`,
                store._debouncedActions,
                timeout
            )
        }
    
        /**
         * @method promiseOne
         * @param {function} createPromiseFn
         * @param {string} key
         * @param {object} cacheObj
         * @param {number} timeout
         */
        function promiseOne (createPromiseFn: Function, key: string, cacheObj: any, timeout: number) {
            if (!cacheObj[key]) {
                cacheObj[key] = createPromiseFn()
            
                cacheObj[key]
                    .then(null, () => {})
                    .then(() => {
                        setTimeout(() => {
                            delete cacheObj[key]
                        }, timeout)
                    })
            }
    
            return cacheObj[key]
        }
    }
}

export default VuexActionDebounce