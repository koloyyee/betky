import * as express from 'express';
import { Request, Response } from 'express';
import { OddService } from '../services/OddService';
import { TeamService } from '../services/TeamService';
import { MatchService } from '../services/MatchService'

export class OddRouter {
    constructor(private oddService: OddService,
        private teamService: TeamService,
        private matchService: MatchService) {
    }

    router() {
        const router = express.Router();
        router.get('/', this.getAllOdd);
        router.get('/:id', this.getLatestOdd);
        return router;
    }

    private getAllOdd = async (_req: Request, res: Response) => {
        try {
            res.json(await this.oddService.retrieveAll());
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false });
        }
    }

    private getLatestOdd = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const match = (await this.matchService.retrieveAllInfoById(id))[0]
            const homeOdd = (await this.oddService.retrieveLatestOdd(match.id, match.home_team_id))[0].rate
            const awayOdd = (await this.oddService.retrieveLatestOdd(match.id, match.away_team_id))[0].rate
            const homeName = (await this.teamService.retrieveSingleName(match.home_team_id))[0].team_name
            const awayName = (await this.teamService.retrieveSingleName(match.away_team_id))[0].team_name
            const allOdd = {
                match_id: match.id,
                match_name: match.match_name,
                match_time: match.match_name,
                home_team_name: homeName,
                home_rate: homeOdd,
                away_team_name: awayName,
                away_rate: awayOdd
            }
            res.json(allOdd);
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false })
        }
    }
} 