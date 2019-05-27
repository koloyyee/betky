
import * as Knex from "knex";

exports.up = async function (knex: Knex) {
    return await 
            knex.schema.createTable('odd', function(table){
            table.increments('id'),
            table.float('rate').notNullable(),
            table.foreign('team_id').references('team.id')
            table.integer('team_id').unsigned(),
            table.foreign('match_id').references('match.id')
            table.integer('match_id').unsigned()
            table.timestamps(false, true)
        })
      
};

exports.down = async function (knex: Knex) {
        return await 
                knex.schema.dropTable('odd')
    

};
