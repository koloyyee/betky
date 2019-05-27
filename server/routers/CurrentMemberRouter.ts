import * as express from 'express'
import { Request, Response } from 'express';
import { BetService } from '../services/BetService'
import { MemberService } from '../services/MemberService';

export class CurrentMemberRouter {
    constructor(private betService: BetService,
        private memberService: MemberService) {

    }
    router() {
        const router = express.Router();
        router.get('/bet-history', this.getBetResult)
        router.get('/bet-ranking', this.getBetRanking)
        return router;
    }

    private getBetResult = async (req: Request, res: Response) => {
        try {
            const id = req.user.id
            res.json({ data: await this.betService.getMemberBetHistory(id)})
        } catch (e) {
            console.log(e)
            res.status(400);
            res.json({ success: false })
        }
    }

    private getBetRanking = async (req: Request, res: Response) => {
        try {
            res.json(await this.memberService.getMemberRanking())
        } catch (e) {
            console.log(e)
            res.status(400);
            res.json({ success: false })
        }
    }
}