import * as Knex from "knex";

exports.up = async function (knex: Knex) {
    return await
        knex.schema.createTable('product', function (table) {
            table.increments('id'),
            table.string('package'),
            table.integer('token'),
            table.decimal('price'),
            table.timestamps(false,true)
        })
};

exports.down = async function (knex: Knex) {
    return await knex.schema.dropTable('product')
};
