import * as types from './types'

export const getCart = () => {
    return (dispatch: any) => {
        dispatch({
            type: types.GET_CART,
            data: {}
        })
    }
}