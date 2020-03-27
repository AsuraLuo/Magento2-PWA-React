import { ActionContext, ActionObject, Store } from 'vuex'

interface ApolloActionContext<S, R>  extends ActionContext<S, R>  {
    apollo: any
    bus: any
}
type ApolloActionHandler<S, R> = (this: Store<R>, injectee: ApolloActionContext<S, R>, payload?: any) => any
type ApolloAction<S, R> = ApolloActionHandler<S, R> | ActionObject<S, R>

export interface ApolloActionTree<S, R> {
    [key: string]: ApolloAction<S, R>
}