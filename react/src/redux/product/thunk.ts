import { ThunkResult } from '../../store';
import { Dispatch } from 'redux';
import { IProductAction, loadProductSuccess, failed } from './actions';
import { IProduct } from './state';


const {REACT_APP_API_SERVER} = process.env

export function loadProduct():ThunkResult<void>{
    return async (dispatch:Dispatch<IProductAction>) =>{
        const res = await fetch(`${REACT_APP_API_SERVER}/product`,{
            method: "GET",
            headers:{
                "Content-type" :"application/json"
            },
        })
            const result:IProduct[] = await res.json()            
            if(res.status === 200 && result){
                dispatch(loadProductSuccess(result))
            } else {
                dispatch(failed("LOAD_PRODUCT_FAILED", 'Failed to Load Products'))
            }
    }
}