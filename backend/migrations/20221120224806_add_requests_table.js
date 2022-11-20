exports.up = function(knex) {
    table.increments('id').notNullable().primary();
    table.string('from').notNullable().references('email').inTable("users");
    table.string('to').notNullable().references('email').inTable("users");
    table.string('message');
    table.boolean('accepted');
};

exports.down = function(knex) {
    return knex.schema.dropTable('requests');
};
