import * as Knex from "knex";

exports.up = async function (knex: Knex) {
    return await 
            knex.schema.createTable('team', function(table){
            table.increments('id'),
            table.string('team_name', 255).unique().notNullable()
            table.timestamps(false,true);
        })
      
};

exports.down = async function (knex: Knex) {
        return await 
                knex.schema.dropTable('team')
    

};
