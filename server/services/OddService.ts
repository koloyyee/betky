import * as Knex from 'knex';
import { NewOddModel } from '../Model/models';

export class OddService {
    constructor(private knex: Knex) {
    }

    async retrieveAll() {
        return await this.knex.select('*').from('odd')
    }

    async retrieveLatestOdd(matchId: number, teamId: number) {
        return await this.knex.select('rate').from('odd')
                                .where('team_id', teamId).where('match_id', matchId)
                                .orderBy('created_at', 'desc').limit(1)
    }

    async createOdd(newOdd: NewOddModel) {
        return await this.knex.insert(newOdd).into('odd')
    }
}