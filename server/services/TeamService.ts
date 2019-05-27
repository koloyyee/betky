import * as Knex from 'knex';
import { TeamModel } from '../Model/models';

export class TeamService{
    constructor(private knex:Knex){
    }

    async retrieveAll(){
        return await this.knex.select('id','team_name').from('team').orderBy('id')
    }

    async retrieveSingle(id:number){
        return await this.knex.select("*").from('team').where('id',id);
    }

    async retrieveSingleName(id:number){
        return await this.knex.select('team_name').from('team').where('id',id)
    }

    async retrieveSingleByName(name:string){
        return await this.knex.select('*').from('team').where('team_name',name);
    }

    async retrieveTeamIdByName(name:string){
        return await this.knex.select('id').from('team').where(this.knex.raw('LOWER("team_name") = ?', name.toLowerCase()))
    }

    async create(newTeam:TeamModel){
        return await this.knex.insert(newTeam).into('team').returning("id")
    }

    async update(id:number, body: TeamModel){
        return await this.knex('team').update(body).where('id',id)
    }

    async delete(id:number){
        return await this.knex('team').where('id',id).del()
    }

}