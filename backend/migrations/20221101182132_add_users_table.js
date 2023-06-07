exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.string("email").notNullable().primary();
    table.string("password").notNullable();
    table.text("refreshToken", "text");
    table.text("photoID", "text");
    table.string("name");
    table.integer("age");
    table.string("city");
    table.text("bio", "text");
    table.string("gender");
    table.integer("desired_roommates");
    table.boolean("hasResidence");
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
