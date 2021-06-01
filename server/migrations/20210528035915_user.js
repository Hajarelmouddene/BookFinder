//apply migration
exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("user_id").primary().unique();
    table.string("first_name", 255).notNullable();
    table.string("last_name", 255).notNullable();
    table.string("email", 255).notNullable().unique();
    //Question: add min password length - hashed password?
    table.string("password").notNullable();
    //created at and updated at timestamps
    table.timestamps(true, true);
  });
};

//undo migration
exports.down = function (knex) {
  return knex.schema.dropTable("user");
};
