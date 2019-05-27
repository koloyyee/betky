import * as express from 'express';
import {Request, Response} from 'express';
import { GameHistoryService } from '../services/GameHistoryService';

export class BetRouter{
    constructor(private gameHistoryService:GameHistoryService){

    }

    router(){
        const router = express.Router();
        router.get('/',this.getAll);
        router.get('/:id',this.getById);
        router.post('/',this.post);
        router.put('/:id',this.put);
        return router;
    }

    private getAll = async(_req:Request,res:Response)=>{
        try{
            res.json(await this.gameHistoryService.retrieveAll());
        }catch(e){
            console.log(e);
            res.status(500);
            res.json({success:false});
        }
    }

    private getById = async(_req:Request,res:Response)=>{
        try{
            const id = parseInt(_req.params.id);
            res.json(await this.gameHistoryService.retrieveSingle(id));
        }catch(e){
            console.log(e);
            res.status(500);
            res.json({success:false})
        }
    }

    private post = async(req:Request,res:Response)=>{
        const newGameHistory = req.body;
        try{
            await this.gameHistoryService.create(newGameHistory);
            res.json({success:true})
        }catch(e){
            console.log(e);
            res.status(500);
            res.json({success:false})
        }
    }

    private put = async (req:Request,res:Response)=>{
        try{
            const updated = req.body; 
            const id = parseInt(req.params.id);
            await this.gameHistoryService.update(id,updated);
            res.json({success:true});
        }catch(e){
            console.log(e);
            res.status(500);
            res.json({success:false});
        }
    }

} 