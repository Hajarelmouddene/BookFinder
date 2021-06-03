//apply migration
exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    /**
     * increments() creates `id` int unsigned not null auto_increment primary key
     */
    table.increments("user_id");
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    //created at and updated at timestamps
    table.timestamps(true, true);
  });
};

//undo migration
exports.down = function (knex) {
  return knex.schema.dropTable("user");
};
