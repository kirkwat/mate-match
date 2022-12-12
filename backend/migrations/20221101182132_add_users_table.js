exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.string("email").notNullable().primary();
    table.string("password").notNullable();
    table.string("photoID");
    table.string("name");
    table.integer("age");
    table.string("city");
    table.string("bio");
    table.string("gender");
    table.string("desired_gender");
    table.integer("desired_roommates");
    table.boolean("hasResidence");
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
