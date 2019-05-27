import * as Knex from 'knex';
import { hashPassword } from '../hash';
import { MemberModel } from '../Model/models';


export class MemberService {
    constructor(private knex: Knex) {
    }

    async getMembers() {
        return await this.knex.select('*').from('member')
    }

    async getMemberById(id: number) {
        return await this.knex.first('*').from('member').where('id', id);
    }

    async getMembersByName(username: string) {
        return await this.knex.select("*").from('member').where('name', username);
    }

    async createMember(newMember: MemberModel) {
        const name = newMember.username;
        const hash = await hashPassword(newMember.password);
        const email = newMember.email;
        let token = newMember.token
        token = 1000
        return await this.knex.insert({ name, email, password: hash, token }).into('member').returning('*')
    }

    async getMemberRanking() {
        return await this.knex.select('name', 'token').from('member').orderBy('token', 'desc')
    }
}