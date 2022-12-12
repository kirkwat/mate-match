exports.up = function (knex) {
  return knex.schema.createTable("preferences", (table) => {
    table
      .string("email")
      .notNullable()
      .references("email")
      .inTable("users")
      .primary();
    table.boolean("apartment");
    table.boolean("house");
    table.boolean("condo");
    table.boolean("nightPerson");
    table.boolean("morningPerson");
    table.boolean("extrovert");
    table.boolean("introvert");
    table.boolean("smoker");
    table.boolean("bringFriendsOver");
    table.boolean("loud");
    table.boolean("shareFood");
    table.boolean("messy");
    table.boolean("pets");
    table.boolean("relationship");

    /*
        table.string('relationship');
        table.string('person_type');
        table.string('bring_over');
        table.string('shared_space');
        table.string('environment');
        table.string('smoker');
        table.string('cleanliness');
        table.string('temperature');
        table.string('sharing');
        table.string('pet');
        */
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("preferences");
};
