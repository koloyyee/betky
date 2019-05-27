import * as Knex from "knex";


exports.seed = async function (knex: Knex) {

    await knex.table('transaction').del()
    await knex.table('product').del()

    const members = 
    await knex.select('id').from('member').returning('id')

    const memberId1 = members[0];
    const memberId2 = members[1];
    const memberId3 = members[2];

    const product=
    await knex.insert([
        {
            package:"Basic",
            token:5000,
            price:7.99
        },
        {
            package:"Premium",
            token:20000,
            price:9.99

        },
        {
            package:"Luxury",
            token:50000,
            price:14.99

        }
]).into('product').returning('id')

    const product1= product[0];
    const product2=product[1];
    const product3=product[2];
    
    await knex.insert([
        {
            product_id: product1.id,
            member_id:memberId1.id,
            price_paid: 7.99,
            token_received: 50000,
            stripe_received_id:"sakjfrgfkjas82134928"
        },
        {
            product_id: product2.id,
            member_id:memberId2.id,
            price_paid: 9.99,
            token_received: 20000,
            stripe_received_id:"uhf98f38938f093jeqrg53g"
        },
        {
            product_id: product3.id,
            member_id:memberId3.id,
            price_paid: 14.99,
            token_received: 50000,
            stripe_received_id:'iunvi923t84230jwevv893'
        },
    ]).into('transaction')

}


