import { IProduct } from './state';

type LOAD_PRODUCT_SUCCESS = 'LOAD_PRODUCT_SUCCESS'
type FAILED = "LOAD_PRODUCT_FAILED"

export function loadProductSuccess(products:IProduct[]): ILoadProductSuccess {
    return {
        type: 'LOAD_PRODUCT_SUCCESS',
        products
    }
}

export function failed(type: FAILED, msg: string):IFailedAction {
    return {
        type,
        msg
    }

}

interface ILoadProductSuccess {
    type: LOAD_PRODUCT_SUCCESS;
    products:IProduct[]
}

interface IFailedAction {
    type: FAILED;
    msg: string
}

export type IProductAction = ILoadProductSuccess |IFailedAction
