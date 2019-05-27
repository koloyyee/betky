import * as Knex from "knex";

exports.up = async function (knex: Knex) {
    return await
        knex.schema.createTable('transaction', function (table) {
            table.increments('id'),
            table.integer('product_id').unsigned(),
            table.foreign('product_id').references('product.id'),
            table.integer('member_id').unsigned(),
            table.foreign('member_id').references('member.id'),
            table.decimal('price_paid'),
            table.integer('token_received'),
            table.string('stripe_received_id'),
            table.timestamps(false,true)
        })
};

exports.down = async function (knex: Knex) {
    return await knex.schema.dropTable('transaction')
};
