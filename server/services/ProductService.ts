import * as Knex from 'knex'

export class ProductService{
    constructor(private knex:Knex){}

    async retrieveAll(){
        return  await this.knex.select('*').from('product')
    }

    async retrieveSingle(id:number) {
        return await this.knex.first('*').from('product').where('id', id).returning("id")
    }
}