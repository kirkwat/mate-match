exports.up = function(knex) {
    return knex.schema.createTable('preferences', (table) => {
        table.increments('id').notNullable().primary();
        table.string('email').notNullable().references('email').inTable("users");
        table.boolean('apartment');
        table.boolean('house');
        table.boolean('condo');
        table.boolean('nightPerson');
        table.boolean('morningPerson');
        table.boolean('extrovert');
        table.boolean('introvert');
        table.boolean('smoker');
        table.boolean('bringFriendsOver');
        table.boolean('loud');
        table.boolean('shareFood');
        table.boolean('messy');
    });
};
exports.down = function(knex) {
    return knex.schema.dropTable('preferences');
};
