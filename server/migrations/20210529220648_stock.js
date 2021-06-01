//apply migration
exports.up = function (knex) {
  return knex.schema.createTable("stock", (table) => {
    table.increments("stock_id").primary().unique();
    table.integer("bookstore_id").unsigned().notNullable();
    table.integer("isbn").unsigned().notNullable();
    //QUESTION: add delete: cascade?
    table
      .foreign("bookstore_id")
      .references("bookstore_id")
      .inTable("bookstore");
    table.foreign("isbn").references("isbn").inTable("book");
    //constrain: unique stock entry for a given book at a given bookstore

    //QUESTION: The following line is not working.
    table.unique(["isbn", "bookstore_id"]);
    table.integer("quantity").unsigned().notNullable();
    //QUESTION: set as true when stock is added, and run the job which checks
    //every minute the stock db and updates status if quantity goes to 0.
    table.string("status").notNullable();

    //created at and updated at timestamps
    table.timestamps(true, true);
  });
};

//undo migration
exports.down = function (knex) {
  return knex.schema.dropTable("stock");
};

// this goes in stock table table.integer("bookstore_stock", 255).notNullable();
//created at and updated at timestamps
