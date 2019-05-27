import * as express from 'express';
import { Request, Response } from 'express';
import { BetService } from '../services/BetService';
import { TeamService } from '../services/TeamService';
import { MatchService } from '../services/MatchService';
import { ChannelService } from '../services/ChannelService';
import { OddService } from '../services/OddService';

export class CurrentInfoRouter {
    constructor(
        private betService: BetService,
        private teamService: TeamService,
        private matchService: MatchService,
        private channelService: ChannelService,
        private oddService: OddService,

    ) {

    }
    router() {
        const router = express.Router();
        router.get('/match/:id', this.getMatchOdds);
        router.get('/matchById/:id', this.getMatch);
        return router;
    }

    private getMatchObject = async (match: any) => {
        const homeName = (await this.teamService.retrieveSingle(match.home_team_id))[0].team_name
        const awayName = (await this.teamService.retrieveSingle(match.away_team_id))[0].team_name
        const currentHomeRate = (await this.oddService.retrieveLatestOdd(match.id,match.home_team_id))[0].rate
        const currentAwayRate = (await this.oddService.retrieveLatestOdd(match.id,match.away_team_id))[0].rate
        const currentHomeBet = parseInt((await this.betService.retrieveSingleTeamTotalBet(match.home_team_id, match.id))[0].sum)
        const currentAwayBet = parseInt((await this.betService.retrieveSingleTeamTotalBet(match.away_team_id, match.id))[0].sum)
        const currentMatch = {
            matchId: match.id,
            matchName: match.match_name,
            matchDayTime: match.match_date_time,
            homeName: homeName,
            awayName: awayName,
            currentHomeScore: match.current_home_score,
            currentAwayScore: match.current_away_score,
            currentHomeRate: currentHomeRate,
            currentAwayRate: currentAwayRate,
            homeBet: (!currentHomeBet) ? 0 : currentHomeBet,
            awayBet: (!currentAwayBet) ? 0 : currentAwayBet,
            homeTeamId: match.home_team_id,
            awayTeamId: match.away_team_id,
        }

        return currentMatch;
    }

    private getMatchOdds = async (req: Request, res: Response) => {
        try {
            const channel_id = (await this.channelService.retrieveSingleId(parseInt(req.params.id)))[0];
            const match = (await this.matchService.retrieveByChannelId(channel_id.id))[0];
            const currentMatch = await this.getMatchObject(match);
            res.json(currentMatch);
            
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false });
        }
    }
    private getMatch = async (req: Request, res: Response) => {
        try {
             const matchId = parseInt(req.params.id)
            
            const match = await this.matchService.retrieveAllInfoById(matchId)
            console.log(match);

            const currentMatch = await this.getMatchObject(match[0]);
            res.json(currentMatch);
            
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false });
        }
    }

}