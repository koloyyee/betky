import * as express from 'express';
import {Request, Response} from 'express';
import { TeamService } from '../services/TeamService';

export class TeamRouter{
    constructor(private teamService:TeamService){

    }

    router(){
        const router = express.Router();
        router.get('/',this.getAllTeam);
        router.get('/:id',this.getTeamById);
        router.post('/',this.post);
        router.put('/:id',this.put);
        router.delete('/:id',this.delete);
        return router;
    }

    private getAllTeam = async(_req:Request,res:Response)=>{
        try{
            res.json(await this.teamService.retrieveAll());
        }catch(e){
            console.log(e);
            res.status(500);
            res.json({success:false});
        }
    }

    private getTeamById = async(req:Request,res:Response)=>{
        try{
            const id = parseInt(req.params.id);
            res.json(await this.teamService.retrieveSingle(id));
        }catch(e){
            console.log(e);
            res.status(500);
            res.json({success:false})
        }
    }

    private post = async(req:Request,res:Response)=>{
        const newTeam = req.body;
        try{
            await this.teamService.create(newTeam);
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
            await this.teamService.update(id,updated);
            res.json({success:true});
        }catch(e){
            console.log(e);
            res.status(500);
            res.json({success:false});
        }
    }

    private delete = async (req:Request,res:Response)=>{
        try{
            const id = parseInt(req.params.id);
            await this.teamService.delete(id);
            res.json({success:true});
        }catch(e){
            console.log(e);
            res.status(500);
            res.json({success:false});
        }
    }

} 