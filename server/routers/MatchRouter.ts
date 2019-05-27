import * as express from 'express';
import { Request, Response } from 'express';
import { MatchService } from '../services/MatchService';
import { NewMatchModel, NewMatchInfoResult } from '../Model/models';
import { TeamService } from '../services/TeamService';
import { OddService } from '../services/OddService';

export class MatchRouter {
    constructor(private matchService: MatchService,
        private teamService: TeamService,
        private oddService: OddService
    ) {

    }

    router() {
        const router = express.Router();
        router.get('/', this.getAllEvent);
        router.get('/:id', this.getEventById);
        router.post('/', this.post);
        router.put('/:id', this.put);
        router.delete('/:id', this.delete);
        return router;
    }

    private getAllEvent = async (_req: Request, res: Response) => {
        try {
            res.json(await this.matchService.retrieveAll());
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false });
        }
    }

    private getEventById = async (req: Request, res: Response) => {
        try {
            const matchId = parseInt(req.params.id)
            const matchInfo = (await this.matchService.retrieveAllByID(matchId))[0];
            const homeName = (await this.teamService.retrieveSingleName(matchInfo.home_team_id))[0].team_name;
            const awayName = (await this.teamService.retrieveSingleName(matchInfo.away_team_id))[0].team_name;
            const currentHomeRate = (await this.oddService.retrieveLatestOdd(matchId, matchInfo.home_team_id))[0].rate;
            const currentAwayRate = (await this.oddService.retrieveLatestOdd(matchId, matchInfo.away_team_id))[0].rate;
            const matchInfoResult : NewMatchInfoResult  = {
                home: {
                    teamName: homeName,
                    odd: currentHomeRate,
                    teamId: matchInfo.home_team_id
                },
                away: {
                    teamName: awayName,
                    odd: currentAwayRate,
                    teamId: matchInfo.away_team_id
                },
                matchId: matchId,
                date: new Date(matchInfo.match_date_time)
            }
            res.json(matchInfoResult)
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false })
        }
    }

    private post = async (req: Request, res: Response) => {
        const newMatch: NewMatchModel = req.body;
        try {
            await this.matchService.create(newMatch);
            res.json({ success: true })
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false })
        }
    }

    private put = async (req: Request, res: Response) => {
        try {
            const updated = req.body;
            const id = parseInt(req.params.id);
            await this.matchService.update(id, updated);
            res.json({ success: true });
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            await this.matchService.delete(id);
            res.json({ success: true });
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false });
        }
    }

} 