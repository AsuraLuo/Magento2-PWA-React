import { combineReducers } from 'redux'
import * as types from './types'

const appReducer: any = combineReducers({
    cart: (state = {}, action) => {
        switch (action.type) {
            case types.GET_CART:
                return action.data
            default:
                return state
        }
    }
})

export default appReducer