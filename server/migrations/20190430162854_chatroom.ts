import * as Knex from "knex";

exports.up = async function (knex: Knex){
    return await 
        knex.schema.createTable('chat',function(table){
            table.increments()
            table.foreign('member_id').references('member.id'),
            table.integer('member_id').unsigned(),
            table.string('message')
        })
        
};

exports.down = async function (knex: Knex) {
    return await knex.schema.dropTableIfExists('chat')
};
