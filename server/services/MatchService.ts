import * as Knex from 'knex';
import { NewMatchModel } from '../Model/models';

export class MatchService {
    constructor(private knex: Knex) {
    }
    async retrieveByChannelId(channel_Id: number) {
        return await this.knex.select('*').from('match').where('channel_id', channel_Id)
    }
    async retrieveAllInfoById(id: number) {
        return await this.knex.select('*').from('match').where('id', id)
    }
    async retrieveAll() {
        return await this.knex.select('id as match_id', 'match_name', 'match_date_time', 'home_team_id', 'away_team_id', 'channel_id').from('match')
    }
    async retrieveAllByID(id: number) {
        return await this.knex.select('home_team_id', 'away_team_id', 'match_name', 'match_date_time', 'channel_id', 'current_home_score', 'current_away_score', 'is_finished').from('match').where('id', id)
    }
    async retrieveName_dateByMatchId(id: number) {
        return await this.knex.select('match_name', 'match_date_time').from('match').where('id', id)
    }
    async retrieveId(id: number) {
        return await this.knex.select('id').from('match').where('id', id)
    }
    async retrieveAllTeamIdByMatchId(id: number) {
        return await this.knex.select('home_team_id', 'away_team_id').from('match').where('id', id)
    }
    async create(newEvent: NewMatchModel) {
        return await this.knex.insert(newEvent).into('match').returning('id')
    }
    async update(id: number, body: NewMatchModel) {
        return await this.knex('match').update(body).where('id', id)
    }
    async delete(id: number) {
        return await this.knex('match').where('id', id).del()
    }

}