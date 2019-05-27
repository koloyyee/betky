import * as Knex from "knex";

exports.up = async function (knex: Knex) {
    return await
        knex.schema.createTable('dealer', function (table) {
            table.increments('id'),
            table.integer('token').nullable(),
            table.timestamps(false, true)
        })
};

exports.down = async function (knex: Knex) {
    return await knex.schema.dropTable('dealer')
};
