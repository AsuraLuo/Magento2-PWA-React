import { Router } from '@helper/interface'
import { RouterSet } from '@config/store'

const RouterUtil: any =  {
    hasRouter (router: Router) {
        return RouterSet.has(router.name)
    },
    filterRouter (router: Router) {
        if (RouterSet.has(router.name)) {
            return router.path.replace(`/${router.name}/`, '')
        }
    }
}

export default RouterUtil