//apply migration
exports.up = function (knex) {
  return knex.schema.createTable("book", (table) => {
    table.bigInteger("isbn").unsigned().unique().primary().notNullable();
    table.string("book_name").notNullable();
    table.string("author_name").notNullable();
    //created at and updated at timestamps
    table.timestamps(true, true);
  });
};

//undo migration
exports.down = function (knex) {
  return knex.schema.dropTable("book");
};
