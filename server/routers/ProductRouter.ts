import * as express from 'express';
import {Request, Response} from 'express';
import { ProductService } from '../services/ProductService';

export class ProductRouter{

    constructor(private productService: ProductService){

    }
    router(){
        const router = express.Router()
        router.get('/', this.getAllProducts)
        router.get('/:id', this.getSingleProduct)
        return router;

    }

    private getAllProducts= async (_req:Request, res:Response)=>{
        try{
            res.json(await this.productService.retrieveAll())
        }catch(e){
            console.error(e);
            res.status(500);
            res.json({success:false})
        }   
    }
    private getSingleProduct= async (req:Request, res:Response)=>{
        try{
            const id = req.body.productId
            res.json(await this.productService.retrieveSingle(id))
        }catch(e){
            console.error(e);
            res.status(500);
            res.json({success:false})
        }   
    }
    

}