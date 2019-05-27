import * as Knex from "knex";

exports.up = async function (knex: Knex) {
    return await 
            knex.schema.createTable('member', function(table){
            table.increments('id'),
            table.string('name', 255).unique().notNullable(),
            table.string('password',255).notNullable(),
            table.string('email', 255).notNullable(),
            table.integer('token').notNullable().unsigned(),
            table.timestamps(false, true)
        })
      
};

exports.down = async function (knex: Knex) {
        return await 
                knex.schema.dropTable('member')
    

};
