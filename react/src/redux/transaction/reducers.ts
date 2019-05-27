import { ITransactionState } from './state';
import { ITransactionAction } from './actions';


const oldState={
    transaction:{
        productId:0,
        memberId:0,
        pricePaid:0,
        tokenReceived:0,
        stripeReceivedId:""
    },
    msg:""
}

export function transactionReducer(state: ITransactionState = oldState, action:ITransactionAction):ITransactionState{
    switch(action.type) {
        case 'TRANSACTION_SUCCESS':
        return{
            ...state,
            transaction: {
                ...state.transaction,
                productId:action.productId,
                pricePaid:action.pricePaid,
                tokenReceived:action.tokeReceived,
                stripeReceivedId: action.stripeReceivedId
            }    
        }
        case 'TRANSACTION_FAILED':
        return{
            ...state,
            msg:action.msg
        }
        default:
            return state
    }
}