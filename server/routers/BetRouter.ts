import * as express from 'express';
import { Request, Response } from 'express';
import { BetService } from '../services/BetService';
import { MemberService } from '../services/MemberService';
import { BetModel } from '../Model/models';
import { MatchService } from '../services/MatchService';
import { TeamService } from '../services/TeamService';
export class BetRouter {
    constructor(private betService: BetService,
        private memberService: MemberService,
        private matchService: MatchService,
        private teamService: TeamService) {

    }

    router() {
        const router = express.Router();
        router.get('/', this.getAllBet);
        router.get('/:id', this.getBetById);
        router.post('/', this.post);
        router.put('/:id', this.put);
        router.delete('/:id', this.delete);
        return router;
    }

    private getAllBet = async (_req: Request, res: Response) => {
        try {
            res.json(await this.betService.retrieveAll());
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false });
        }
    }

    private getBetById = async (_req: Request, res: Response) => {
        try {
            const id = parseInt(_req.params.id);
            res.json(await this.betService.retrieveByBetId(id));
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false })
        }
    }

    private post = async (req: Request, res: Response) => {
        try {
            const newBet = req.body;
            const userId = req.user.id
            const token = (await this.memberService.getMemberById(userId)).token
            const checkToken = (token - newBet.token) >= 0
            const team_id = (await this.teamService.retrieveSingle(newBet.teamId))[0].id
            const matchState = (await this.matchService.retrieveAllByID(newBet.matchId))[0].is_finished
            const match_id = (await this.matchService.retrieveId(newBet.matchId))[0].id
            if (!matchState && checkToken) {
                const bet: BetModel = {
                    ...newBet,
                    match_id: match_id,
                    member_id: userId,
                    team_id: team_id
                }
                await this.betService.createBet(bet.token, bet.member_id, bet.match_id, bet.team_id, bet.odd);
                res.status(200)
                res.json({ success: true, msg: `The remain token is ${token - newBet.token}` })
            } else {
                res.status(400)
                res.json({ success: true, msg: 'Match is finished / Token is not enough' })
            }
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
            await this.betService.update(id, updated);
            res.json({ success: true });
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false });
        }
    }

    private delete = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            await this.betService.delete(id);
            res.json({ success: true });
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false });
        }
    }

} 