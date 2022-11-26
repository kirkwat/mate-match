exports.up = function(knex) {
    return knex.schema.createTable('house', (table) => {
      table.increments('id').notNullable().primary();
      table.string('email1').references('email').inTable("users");
      table.string('email2').references('email').inTable("users");
      table.string('email3').references('email').inTable("users");
      table.string('email4').references('email').inTable("users");
      table.string('email5').references('email').inTable("users");
      table.string('email6').references('email').inTable("users");
      table.string('email7').references('email').inTable("users");
      table.string('email8').references('email').inTable("users");
      table.string('email9').references('email').inTable("users");
      table.string('email10').references('email').inTable("users");
    });
  };
  exports.down = function(knex) {
    return knex.schema.dropTable('house');
  };
  
  