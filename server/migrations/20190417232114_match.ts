

import * as Knex from "knex";

exports.up = async function (knex: Knex) {
    return await 
            knex.schema.createTable('match', function(table){
            table.increments('id'),
            table.string('match_name').notNullable(),
            table.dateTime('match_date_time').notNullable(),
            table.integer('current_home_score').defaultTo(0),
            table.integer('current_away_score').defaultTo(0),
            table.foreign('home_team_id').references('team.id')
            table.integer('home_team_id').unsigned(),
            table.foreign('away_team_id').references('team.id')
            table.integer('away_team_id').unsigned(),
            table.foreign('channel_id').references('channel.id')
            table.integer('channel_id').unsigned(),
            table.boolean('is_finished').defaultTo(false),
            table.timestamps(false,true);
        })
      
};

exports.down = async function (knex: Knex) {
        return await 
                knex.schema.dropTable('match')
    

};
