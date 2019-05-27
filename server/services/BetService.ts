import * as Knex from 'knex';
import { BetModel } from '../Model/models';
import { MatchService } from './MatchService';
import { TeamService } from './TeamService';

export class BetService {
    constructor(private knex: Knex,
                private matchService: MatchService,
                private teamService: TeamService
        ) {
    }

    async retrieveAll() {
        return await this.knex.select('*').from('bet')
    }

    async retrieveByBetId(id: number) {
        return await this.knex.select('*').from('bet').where('id', id)
    }

    async retrieveTotalBetByMatchId(id: number) {
        return await this.knex('bet').sum('token').where('match_id', id)
    }
    async retrieveSingleTeamTotalBet(teamId: number, matchId: number) {
        console.log(teamId, matchId)
        return await this.knex('bet')
            .where({
                'team_id': teamId,
                'match_id': matchId
            }).sum('token')

    }

    async createBet(token: number, memberId: number, matchId: number, teamId: number, odd: number) {
        return await this.knex.transaction(async (t: Knex.Transaction) => {
            await t.table('member').where('id', memberId).decrement('token', token);
            await t.table('dealer').where('id', 1).increment('token', token);
            await t.insert({ member_id: memberId, team_id: teamId, match_id: matchId, token: token, odd: odd }).into('bet');
        })
    }

    async update(id: number, body: BetModel) {
        return await this.knex('bet').update(body).where('id', id)
    }

    async delete(id: number) {
        return await this.knex('bet').where('id', id).del()
    }

    async getMemberBetHistory(id: number) {
        //without time name
        console.log("id", id)
        const cleanHistory = []
        const historys = await this.knex.select('bet.member_id AS id','bet.match_id AS match_id','bet.token AS token','total_bet_history.payout AS payout','game_history.home_team_score AS homeScore','game_history.away_team_score AS awayScore')
                                .innerJoin('total_bet_history','bet.id','total_bet_history.bet_id')
                                .innerJoin('game_history','bet.match_id','game_history.match_id')
                                .from('bet').where('member_id',id)
        for(let item of historys){
            const matchInfo = (await this.matchService.retrieveAllInfoById(item.match_id))[0]
            const homeName = (await this.teamService.retrieveSingle(matchInfo.home_team_id))[0].team_name
            const awayName = (await this.teamService.retrieveSingle(matchInfo.away_team_id))[0].team_name
            const bet = {
                state: (item.payout > 0)? 'Win' : 'Lose',
                match_date_time: matchInfo.match_date_time,
                match : {
                    homeName: homeName,
                    homeScore: item.homeScore,
                    awayName: awayName,
                    awayScore: item.awayScore, 
                },
                token: item.payout,
                matchName : matchInfo.match_name
            }
            cleanHistory.push(bet)
        }

        console.log("cleanHistory", cleanHistory)
        return cleanHistory
    }

}