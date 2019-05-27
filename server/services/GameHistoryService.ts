import * as Knex from 'knex';
import { GameHistoryModel } from '../Model/models';

export class GameHistoryService {
    constructor(private knex: Knex) {
    }

    async retrieveAll() {
        return await this.knex.select('*').from('game_history')
    }

    async retrieveSingle(id: number) {
        return await this.knex.select("*").from('game_history').where('id', id);
    }

    async create(newGameHistory: GameHistoryModel) {
        return await this.knex.insert(newGameHistory).into('game_history').returning('id')
    }

    async update(id: number, body: GameHistoryModel) {
        return await this.knex('game_history').update(body).where('id', id)
    }
}