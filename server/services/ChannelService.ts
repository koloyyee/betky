import * as Knex from 'knex';

export class ChannelService {

    constructor(private knex:Knex){

    }
    
    async retrieveSingle(id:number){
        return await this.knex.first('channel').from('channel').where('id', id)
    }
    
    async retrieveSingleId(id:number){
        return await this.knex.select('id').from('channel').where('id',id)
    }
    async retrieveAll(){
        return await this.knex('*').from('channel')
    }
}
