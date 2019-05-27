import * as Knex from "knex";

exports.up = async function (knex: Knex) {
    return await 
            knex.schema.createTable('game_history', function(table){
            table.increments('id'),
            table.integer('home_team_score').notNullable(),
            table.integer('away_team_score').notNullable(),
            table.boolean('home_team_won').notNullable(),
            table.foreign('match_id').references('match.id'),
            table.integer('match_id').unsigned().notNullable()
            table.timestamps(false,true);
        })
      
};

exports.down = async function (knex: Knex) {
        return await 
                knex.schema.dropTable('game_history')
    
};
