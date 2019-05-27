import * as express from 'express';
import {Request, Response} from 'express';
import { ChannelService } from '../services/ChannelService';

export class ChannelRouter {

    constructor(private channelService:ChannelService){

    }
    router(){
        const router = express.Router()
        router.get('/:id', this.getChannel)
        router.get('/', this.getAllChannel)

        return router;
    }
    getChannel = async (req:Request, res:Response) =>{
        const id = parseInt(req.params.id)
        try{   
            res.json(await this.channelService.retrieveSingle(id))

        }catch(e){ 
            res.status(400)
            res.json({success:false})
        }
    }
    getAllChannel = async (req:Request,res:Response)=>{
        try{    
            res.json(await this.channelService.retrieveAll())
        }catch(e){
            res.json(500)
            res.json({success:false})
        }
    }



}