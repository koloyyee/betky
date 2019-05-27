import { ThunkResult } from '../../store';
import { Dispatch } from 'redux';
import { ITransactionAction, transactionSuccess, failed } from './actions';
import { ITransaction } from './state';
import { CallHistoryMethodAction, push } from 'connected-react-router';


const {REACT_APP_API_SERVER} = process.env

export function transaction(productId:number, pricePaid:number,tokenReceived:number,stripeReceivedId:string ):ThunkResult<void>{

    const data= {productId, pricePaid, tokenReceived, stripeReceivedId}
    return async (dispatch:Dispatch<ITransactionAction|CallHistoryMethodAction>) =>{
        const res = await fetch(`${REACT_APP_API_SERVER}/charge/transaction`,{
            method: "POST",
            headers:{
                "Content-type" :"application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },

            body:JSON.stringify(data)
        });
            const result:ITransaction = await res.json()            
            if(res.status === 200 && result){
                dispatch(transactionSuccess(result.productId,result.pricePaid, result.tokenReceived,result.stripeReceivedId))
            } else {
                dispatch(failed("TRANSACTION_FAILED", 'Transaction Failed'))
            }
            dispatch(push('/shop'))
    }
}