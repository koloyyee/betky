import * as Knex from 'knex'
import { NewMatchModel, TotalBetHistoryModel } from '../Model/models';

export class AdminService {
    constructor(private knex: Knex) {

    }
    async retrieveToken(){
        return await this.knex.select('token').from('dealer')
    }
    async retrieveAllMatchInfo() {
        return (await this.knex.raw(`SELECT
        match.id,
        match.channel_id,
        match.match_name,
        match.match_date_time,
        match.current_home_score,
        match.current_away_score,
        match.home_team_id AS home_team_id,
        home_team.team_name AS home_team_name,
        match.away_team_id AS away_team_id,
        away_team.team_name AS away_team_name,
        (   
            select rate
            from odd where odd.team_id = match.home_team_id and odd.match_id = match.id  
            ORDER BY CREATED_AT DESC LIMIT 1
        ) as home_team_rate,
        (   
            select rate
            from odd where odd.team_id = match.away_team_id and odd.match_id = match.id 
            ORDER BY CREATED_AT DESC LIMIT 1
        ) as away_team_rate
        FROM match
        LEFT JOIN team AS home_team ON match.home_team_id = home_team.id
        INNER JOIN team AS away_team ON match.away_team_id = away_team.id`)).rows
    }
    async retrieveAllCurrentMatch(){
        return (await this.knex.raw(`SELECT
        match.id,
        match.channel_id,
        match.match_name,
        match.match_date_time,
        match.current_home_score,
        match.current_away_score,
        match.home_team_id AS home_team_id,
        home_team.team_name AS home_team_name,
        match.away_team_id AS away_team_id,
        away_team.team_name AS away_team_name,
        (   
            select rate
            from odd where odd.team_id = match.home_team_id and odd.match_id = match.id  
            ORDER BY CREATED_AT DESC LIMIT 1
        ) as home_team_rate,
        (   
            select rate
            from odd where odd.team_id = match.away_team_id and odd.match_id = match.id 
            ORDER BY CREATED_AT DESC LIMIT 1
        ) as away_team_rate
        FROM match
        LEFT JOIN team AS home_team ON match.home_team_id = home_team.id
        INNER JOIN team AS away_team ON match.away_team_id = away_team.id
        where match.is_finished = false ORDER BY match.id`)).rows
    } 

    async retrieveCompletedMatch(){
        return (await this.knex.raw(`SELECT
        match.id,
        match.channel_id,
        match.match_name,
        match.match_date_time,
        match.current_home_score,
        match.current_away_score,
        match.home_team_id AS home_team_id,
        home_team.team_name AS home_team_name,
        match.away_team_id AS away_team_id,
        away_team.team_name AS away_team_name,
        (   
            select rate
            from odd where odd.team_id = match.home_team_id and odd.match_id = match.id  
            ORDER BY CREATED_AT DESC LIMIT 1
        ) as home_team_rate,
        (   
            select rate
            from odd where odd.team_id = match.away_team_id and odd.match_id = match.id 
            ORDER BY CREATED_AT DESC LIMIT 1
        ) as away_team_rate
        FROM match
        LEFT JOIN team AS home_team ON match.home_team_id = home_team.id
        INNER JOIN team AS away_team ON match.away_team_id = away_team.id
        where match.is_finished = true ORDER BY match.id`)).rows
    }
    async retrieveAllBets(game_historyId: number) {
        return (await this.knex.raw(`SELECT 
        game_history.id AS game_history_id,
        match.id AS match_id,
        bet.id AS bet_id,
        bet.odd AS bet_odd,
        bet.token AS token,
        bet.member_id AS member_id,
        CASE WHEN match.home_team_id = bet.team_id
        THEN game_history.home_team_won
        ELSE (NOT game_history.home_team_won)
        END AS bet_won
        FROM game_history
        INNER JOIN match ON game_history.match_id = match.id
        INNER JOIN bet ON match.id = bet.match_id AND
        (match.home_team_id = bet.team_id OR match.away_team_id = bet.team_id)
        WHERE game_history.id = ${game_historyId}`)).rows
    }

    async retrieveMatchByMatchId(matchId: number) {
        return await this.knex.select('*').from('match').where('id', matchId)
    }

    async retrieveMatchIdByNames(match_name: string, home_team_id: number, away_team_id: number) {
        return await this.knex.select('id').from('match').where('home_team_id', home_team_id)
            .where('away_team_id', away_team_id).where(this.knex.raw('LOWER("match_name") = ?', match_name.toLowerCase()))
    }

    async creatMatch(newMatch: NewMatchModel) {
        return await this.knex.insert(newMatch).into('match')
    }

    async retrieveAllBet() {
        return await this.knex.select('*').from('bet')
    }

    async retrieveBetById(betId: number) {
        return await this.knex.select('*').from('bet').where('id', betId)
    }

    async retrieveGameHistoryById(id:number){
        return await this.knex.select('*').from('game_history').where('id',id)
    }

    async retrieveBetByUserId(userId: number) {
        return await this.knex.select('*').from('bet').where('member_id', userId)
    }

    async retrieveBetByMatchId(matchId: number) {
        return await this.knex.select('*').from('bet').where('match_id', matchId)
    }

    async createBetHistory(newBetHistory:TotalBetHistoryModel){
        return await this.knex.insert(newBetHistory).into('total_bet_history')
    }

    async createMemberWinTransaction(memberId:number, payout:number){
        return await this.knex.table('member').where('id',memberId).increment('token',payout)
    }

    async createDealerLoseTransaction(payout:number){
        return await this.knex.table('dealer').decrement('token',payout)
    }

}


