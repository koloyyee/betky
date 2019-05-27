import { IProductState } from './state';
import { IProductAction } from './actions';

const oldState={
    products:[],
    msg:""
}

export function productReducer(state:IProductState = oldState, action:IProductAction):IProductState{
    switch(action.type) {
        case "LOAD_PRODUCT_SUCCESS":
            return{
                ...state,
                products:action.products
            }
        case "LOAD_PRODUCT_FAILED":
            return{...state, msg: action.msg}
        default:
            return state
    }
}