//apply migration
exports.up = function (knex) {
  return knex.schema.createTable("bookstore", (table) => {
    /**
     * increments() creates `id` int unsigned not null auto_increment primary key
     */
    table.increments("bookstore_id");
    table.string("bookstore_name").notNullable();
    table.string("phone_number").notNullable().unique();
    table.string("address").notNullable();
    //created at and updated at timestamps
    table.timestamps(true, true);
  });
};

//undo migration
exports.down = function (knex) {
  return knex.schema.dropTable("bookstore");
};
