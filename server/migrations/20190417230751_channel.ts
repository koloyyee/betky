import * as Knex from "knex";

exports.up = async function (knex: Knex){
    return await 
        knex.schema.createTable('channel',function(table){
            table.increments()
            table.string('game')
            table.string('channel')
        })
        
};

exports.down = async function (knex: Knex) {
    return await knex.schema.dropTableIfExists('channel')
};
