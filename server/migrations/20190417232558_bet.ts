import * as Knex from "knex";

exports.up = async function (knex: Knex) {
    return await 
            knex.schema.createTable('bet', function(table){
            table.increments('id'),
            table.foreign('member_id').references('member.id'),
            table.integer('member_id').unsigned().notNullable(),
            table.foreign('team_id').references('team.id'),
            table.integer('team_id').unsigned().notNullable(),
            table.foreign('match_id').references('match.id'),
            table.integer('match_id').unsigned().notNullable(),
            table.integer('token').unsigned().notNullable(),
            table.decimal('odd').notNullable()
            table.timestamps(false,true);
        })
      
};

exports.down = async function (knex: Knex) {
        return await 
                knex.schema.dropTable('bet')
    

};
