//apply migration
exports.up = function (knex) {
  return knex.schema.createTable("stock", (table) => {
    /**
     * increments() creates `id` int unsigned not null auto_increment primary key
     */
    table.increments("stock_id");
    table.integer("bookstore_id").unsigned().notNullable();
    table.integer("isbn").unsigned().notNullable();
    table
      .foreign("bookstore_id")
      .references("bookstore_id")
      .inTable("bookstore");
    table.foreign("isbn").references("isbn").inTable("book");
    //constrain: unique stock entry for a given book at a given bookstore
    table.unique(["isbn", "bookstore_id"]);
    table.integer("quantity").unsigned().notNullable();
    table.string("status").notNullable();

    //created at and updated at timestamps
    table.timestamps(true, true);
  });
};

//undo migration
exports.down = function (knex) {
  return knex.schema.dropTable("stock");
};
