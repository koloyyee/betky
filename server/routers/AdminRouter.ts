import * as express from 'express';
import { Request, Response } from 'express';
import { AdminService } from '../services/AdminService';
import { MatchService } from '../services/MatchService';
import { NewGameHistoryForm } from '../Model/models';
import { OddService } from '../services/OddService';
import { TeamService } from '../services/TeamService';
import { GameHistoryService } from '../services/GameHistoryService';
import { ChannelService } from '../services/ChannelService';
import { TotalBetHistoryService } from '../services/TotalBetHistoryService';

export class AdminRouter {
    constructor(private adminService: AdminService,
        private matchService: MatchService,
        private oddService: OddService,
        private teamService: TeamService,
        private gameHistoryService: GameHistoryService,
        private channelService: ChannelService,
        private totalBetHistoryService: TotalBetHistoryService,
        private io: SocketIO.Server

    ) {

    }

    router() {
        const router = express.Router();
        router.get('/match/completed', this.getCompleteMatch)
        router.get('/team', this.getAllTeam);
        router.post('/team', this.postNewTeam);
        router.put('/team/:id', this.putTeam)
        router.get('/match', this.getAllMatch);
        router.post('/match', this.postNewMatch);
        router.get('/match/:id', this.getMatchByMatchId);
        router.put('/match/:id', this.putMatch);
        router.get('/odd/match/:id', this.getMatchInfoByMatchId);
        router.post('/odd/match', this.postNewOdd);
        router.get('/bet', this.getAllBetHistory);
        router.get('/result/:id', this.getGameHistory);
        router.get('/result', this.getAllMatchResult);
        router.post('/result', this.postGameHistory);
        router.get('/token', this.getToken);
        return router;
    }

    private putTeam = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            const id = parseInt(req.params.id);
            await this.teamService.update(id, body)
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false })
        }
    }
    private postNewTeam = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            await this.teamService.create(body)
            res.redirect('/')
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false })
        }
    }

    private getAllBetHistory = async (_req: Request, res: Response) => {
        try {
            res.json(await this.totalBetHistoryService.retrieveAll())
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false })
        }
    }

    private getToken = async (_req: Request, res: Response) => {
        try {
            res.json((await this.adminService.retrieveToken())[0].token)
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false })
        }
    }
    private getAllTeam = async (_req: Request, res: Response) => {
        try {
            res.json(await this.teamService.retrieveAll())
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false })
        }
    }
    private getAllMatch = async (_req: Request, res: Response) => {
        try {
            const matches = await this.adminService.retrieveAllCurrentMatch();
            res.json(matches)
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false })
        }
    }
    private getCompleteMatch = async (_req: Request, res: Response) => {
        try {
            const matches = await this.adminService.retrieveCompletedMatch();
            res.json(matches)
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false })
        }
    }
    private getMatchByMatchId = async (req: Request, res: Response) => {
        try {
            const matchId = parseInt(req.params.id);
            res.json(await this.adminService.retrieveBetByMatchId(matchId))
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false })
        }
    }
    private postNewMatch = async (req: Request, res: Response) => {
        try {
            const newMatch = req.body;
            const checkHome = (await this.teamService.retrieveTeamIdByName(newMatch.home_team_name))[0]
            const checkAway = (await this.teamService.retrieveTeamIdByName(newMatch.away_team_name))[0]
            const channel_id = (await this.channelService.retrieveSingleId(parseInt(newMatch.channel_id)))[0].id
            let home_team_id;
            let away_team_id;
            if (checkHome) {
                home_team_id = checkHome.id
            } else {
                home_team_id = (await this.teamService.create({ team_name: newMatch.home_team_name }))[0]
            }
            if (checkAway) {
                away_team_id = checkAway.id
            } else {
                away_team_id = (await this.teamService.create({ team_name: newMatch.away_team_name }))[0]
            }
            const cleanMatch = {
                home_team_id: home_team_id,
                away_team_id: away_team_id,
                match_name: newMatch.match_name,
                match_date_time: newMatch.match_date_time,
                channel_id: channel_id,
                current_home_score: newMatch.current_home_score,
                current_away_score: newMatch.current_away_score,
                is_finished: false
            }
            const matchId = (await this.matchService.create(cleanMatch))[0]

            const homeOdd = {
                team_id: home_team_id,
                match_id: matchId,
                rate: newMatch.home_rate
            }
            const awayOdd = {
                team_id: away_team_id,
                match_id: matchId,
                rate: newMatch.away_rate
            }
            await this.oddService.createOdd(homeOdd);
            await this.oddService.createOdd(awayOdd);
            res.json({ success: true })
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false })
        }
    }
    // Socket need to set up here to listen to the changes
    private putMatch = async (req: Request, res: Response) => {
        try {
            const update = req.body;
            const matchId = parseInt(req.params.id);
            const channelId = (await this.channelService.retrieveSingleId(update.channel_id))[0]
            const match = (await this.matchService.retrieveId(matchId))[0]
            const teamIds = (await this.matchService.retrieveAllTeamIdByMatchId(match.id))[0]
            const current_match = {
                home_team_id: teamIds.home_team_id,
                away_team_id: teamIds.away_team_id,
                channel_id: channelId.id,
                match_name: update.match_name,
                match_date_time: update.match_date_time,
                current_home_score: update.current_home_score,
                current_away_score: update.current_away_score,
                is_finished: update.is_finished
            }

            await this.matchService.update(match.id, current_match)

            const home_name = {
                team_name: update.home_team_name
            }

            await this.teamService.update(teamIds.home_team_id, home_name)

            const away_name = {
                team_name: update.away_team_name
            }

            await this.teamService.update(teamIds.away_team_id, away_name)

            const hOdd = {
                match_id: match.id,
                team_id: teamIds.home_team_id,
                rate: update.home_team_rate
            }
            await this.oddService.createOdd(hOdd);

            const aOdd = {
                match_id: match.id,
                team_id: teamIds.away_team_id,
                rate: update.away_team_rate
            }
            await this.oddService.createOdd(aOdd);
            
            // this.io.sockets.in(req.params.id).emit("oddChange", JSON.stringify({odd: {home: hOdd.rate, away: aOdd.rate}}))
            this.io.sockets.in(req.params.id).emit("infoChange", 
            {
                matchName: current_match.match_name,
                matchDayTime:current_match.match_date_time,
                currentHomeScore: current_match.current_home_score,
                currentAwayScore: current_match.current_away_score,
                currentHomeRate: hOdd.rate,
                currentAwayRate: aOdd.rate,
                homeName: home_name.team_name,
                awayName: away_name.team_name,
            })
            res.json({ success: true })
           
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false })
        }
    }
    private getMatchInfoByMatchId = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const matchIds = (await this.matchService.retrieveAllTeamIdByMatchId(id))[0]
            const matchName_Date = (await this.matchService.retrieveName_dateByMatchId(id))[0]
            const home = (await this.teamService.retrieveSingleName(matchIds.home_team_id))[0]
            const away = (await this.teamService.retrieveSingleName(matchIds.away_team_id))[0]
            const homeOdd = (await this.oddService.retrieveLatestOdd(id, matchIds.home_team_id))[0]
            const awayOdd = (await this.oddService.retrieveLatestOdd(id, matchIds.away_team_id))[0]
            const allOdd = {
                match_id: id,
                match_name: matchName_Date.match_name,
                match_time: matchName_Date.match_date_time,
                home_team_name: home.team_name,
                home_rate: homeOdd.rate,
                away_team_name: away.team_name,
                away_rate: awayOdd.rate
            }
            console.log(allOdd)
            res.json(allOdd);
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false })
        }
    }
    private postNewOdd = async (_req: Request, res: Response) => {
        try {
            const newMatchInfo = _req.body;
            // console.log(newMatchInfo);
            const teamIds = (await this.matchService.retrieveAllTeamIdByMatchId(newMatchInfo.match_id))[0]
            const homeOdd = {
                match_id: newMatchInfo.match_id,
                team_id: teamIds.home_team_id,
                rate: newMatchInfo.home_rate
            }
            const awayOdd = {
                match_id: newMatchInfo.match_id,
                team_id: teamIds.away_team_id,
                rate: newMatchInfo.away_rate
            }
            await this.oddService.createOdd(homeOdd);
            await this.oddService.createOdd(awayOdd);
            res.json({ success: true })
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false })
        }
    }
    private getAllMatchResult = async (_req: Request, res: Response) => {
        try {
            res.json(await this.gameHistoryService.retrieveAll())
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false })
        }
    }
    private getGameHistory = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            res.json(await this.gameHistoryService.retrieveSingle(id));
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false })
        }
    }
    private postGameHistory = async (req: Request, res: Response) => {
        try {
            const body: NewGameHistoryForm = req.body;
            const match = (await this.matchService.retrieveAllByID(body.id))[0]
            const matchId = (await this.matchService.retrieveId(body.id))[0].id
            const home_won = ((body.home_team_score - body.away_team_score) > 0)
            const newMatchState = {
                ...match,
                is_finished: true,
                current_home_score: body.home_team_score,
                current_away_score: body.away_team_score
            }
            await this.matchService.update(body.id, newMatchState)

            const newGameHis = {
                match_id: matchId,
                home_team_won: home_won,
                home_team_score: body.home_team_score,
                away_team_score: body.away_team_score
            }
            const historyId = (await this.gameHistoryService.create(newGameHis))[0]
            const bets = await this.adminService.retrieveAllBets(historyId)
            for (let item of bets) {
                const betId = (await this.adminService.retrieveBetById(item.bet_id))[0].id
                const game_history_id = (await this.adminService.retrieveGameHistoryById(item.game_history_id))[0].id
                if (item.bet_won == true) {
                    let bet_history = {
                        game_history_id: game_history_id,
                        bet_id: betId,
                        payout: item.bet_odd * item.token
                    }
                    await this.adminService.createBetHistory(bet_history);
                    await this.adminService.createMemberWinTransaction(item.member_id, bet_history.payout);
                    await this.adminService.createDealerLoseTransaction(bet_history.payout);
                }
                if (item.bet_won == false) {
                    let bet_history = {
                        game_history_id: game_history_id,
                        bet_id: betId,
                        payout: 0 * item.token
                    }
                    await this.adminService.createBetHistory(bet_history);
                }
            }
            res.json({ success: true })
        } catch (e) {
            console.log(e);
            res.status(500);
            res.json({ success: false })
        }
    }
}