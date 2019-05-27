
export interface ITransaction {
    productId: number;
    memberId:number;
    pricePaid:number;
    tokenReceived:number;
    stripeReceivedId:string
}

export interface ITransactionState{
    transaction:ITransaction
    msg:string

}



