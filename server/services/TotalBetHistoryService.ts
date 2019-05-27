import * as Knex from 'knex';
import { TotalBetHistoryModel } from '../Model/models';

export class TotalBetHistoryService {
    constructor(private knex: Knex) {
    }

    async retrieveAll() {
        return await this.knex.select('bet.member_id AS member_id',
                                    'match.id AS match_id',
                                    'member.name AS name',
                                    'bet.token AS token',
                                    'bet.odd AS odd',
                                    'total_bet_history.payout AS payout')
                                .from('total_bet_history')
                                .innerJoin('bet','bet_id','bet.id')
                                .innerJoin('team','bet.team_id','team.id')
                                .innerJoin('match','match.id','bet.match_id')
                                .innerJoin('member','bet.member_id','member.id').orderBy('member_id')
    }

    async retrieveSingle(id: string) {
        return await this.knex.select('*').from('total_bet_history').where('id', id)
    }

    async create(newBetHistory: TotalBetHistoryModel) {
        return await this.knex.insert(newBetHistory).into('total_bet_history')
    }

    async update(id: number, body: TotalBetHistoryModel) {
        return await this.knex('total_bet_history').update(body).where('id', id)
    }

}