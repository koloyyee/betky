import * as Knex from 'knex';

const seedFile = require('./seeds/initialSeed');
const knexConfig = require('./knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);

seedFile.seed(knex);