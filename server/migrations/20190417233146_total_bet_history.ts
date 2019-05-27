import * as Knex from "knex";

exports.up = async function (knex: Knex) {
    return await 
            knex.schema.createTable('total_bet_history', function(table){
            table.increments('id'),
            table.float('payout'),
            table.foreign('bet_id').references('bet.id'),
            table.integer('bet_id').unsigned(),
            table.foreign('game_history_id').references('game_history.id'),
            table.integer('game_history_id').unsigned(),
            table.timestamps(false,true);
        })
      
};

exports.down = async function (knex: Knex) {
        return await 
                knex.schema.dropTable('total_bet_history')
    

};
