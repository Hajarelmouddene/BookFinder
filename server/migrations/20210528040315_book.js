//apply migration
exports.up = function (knex) {
  return knex.schema.createTable("book", (table) => {
    //QUESTION: check if I can add .unique() or if primary specifies it.
    //unsigned added:  isbn is composed of positive integers.
    //remove "-" chars from req.body.ISBN and store ISBN as an integer (less storage requirements)
    // QUESTON: precise ISBN limit is 13?
    table.integer("isbn").unsigned().unique().primary().notNullable();
    table.string("book_name", 255).notNullable();
    table.string("author_name", 255).notNullable();
    //created at and updated at timestamps
    table.timestamps(true, true);
  });
};

//undo migration
exports.down = function (knex) {
  return knex.schema.dropTable("book");
};
