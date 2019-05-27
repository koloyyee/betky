import * as Knex from 'knex';
import { Transaction } from '../Model/models';

export class TransactionService {
    constructor(private knex: Knex){}

    async createTransaction(transaction:Transaction){
        return await this.knex.transaction(async(t: Knex.Transaction)=>{
            await t.table('member').where('id', transaction.member_id).increment('token', transaction.token_received)
            await t.insert({
                member_id:transaction.member_id,
                product_id:transaction.product_id,
                price_paid:transaction.price_paid,
                token_received: transaction.token_received,
                stripe_received_id: transaction.stripe_received_id
            }).into('transaction')
        })
    }
    async retrieveAll(){
        return await this.knex.select('*').from('transaction')
    }
}