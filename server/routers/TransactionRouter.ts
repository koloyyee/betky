import * as express from 'express';
import {Request, Response} from 'express';
import{ProductService} from '../services/ProductService'
import { TransactionService } from '../services/TransactionService';
import { Transaction } from '../Model/models';
const stripe = require("stripe")('sk_test_3BYh1TjiV0jQe3s4Xf1TUsDb00y1eptKfE')


export class TransactionRouter {
    constructor(private transactionService: TransactionService,
                private productService: ProductService
                ){}

    router(){
        const router = express.Router()
        router.post('/transaction', this.createTransaction)
        router.get('/', this.getAllTransactions)
        router.post('/', this.stripeCharges)
        return router;
    }

    private createTransaction = async (req:Request, res:Response)=>{
        const newTransaction = req.body
        const product_id = (await this.productService.retrieveSingle(req.body.productId)).id
        const member_id = req.user.id
        try{
            const transaction: Transaction = {
                member_id: member_id,
                product_id: product_id,
                price_paid: newTransaction.pricePaid,
                stripe_received_id:newTransaction.stripeReceivedId,
                token_received:newTransaction.tokenReceived
            }
            await this.transactionService.createTransaction(transaction)
        }catch(e){
            console.error(e);
            res.status(400);
            res.json({success:false})
        }

    
    }
    private stripeCharges= async(req:Request, res:Response) =>{
        try {
            let {status} = await stripe.charges.create({
                amount: req.body.price_paid,
                currency: "usd",
                description: req.body.product_id,
                source: req.body
                });
            
                const result = await res.json({status});
                console.log(result)
        } catch (err) {
            res.status(500).end();
        }

    }
    private getAllTransactions = async (_req:Request, res:Response) =>{
        try{
            res.json( await this.transactionService.retrieveAll())

        }catch(e){
            console.error(e);
            res.status(500);
            res.json({success:false})
        }
    }



}