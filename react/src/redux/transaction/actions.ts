type TRANSACTION_SUCCESS = 'TRANSACTION_SUCCESS'
type FAILED = "TRANSACTION_FAILED"

export function transactionSuccess(productId:number, pricePaid:number, tokeReceived:number, stripeReceivedId:string): ITransactionSuccess {
    return {
        type: 'TRANSACTION_SUCCESS',
        productId, 
        pricePaid, 
        tokeReceived, 
        stripeReceivedId
    }
}

export function failed(type: FAILED, msg: string):IFailedAction {
    return {
        type,
        msg
    }

}

interface ITransactionSuccess {
    type: TRANSACTION_SUCCESS;
    productId:number, 
    pricePaid:number, 
    tokeReceived:number, 
    stripeReceivedId:string

}

interface IFailedAction {
    type: FAILED;
    msg: string
}

export type ITransactionAction = ITransactionSuccess |IFailedAction 
