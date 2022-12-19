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
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("preferences");
};
