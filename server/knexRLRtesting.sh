#!/bin/bash
yarn knex migrate:rollback --env testing
yarn knex migrate:latest --env testing 
yarn knex seed:run --env testing 

