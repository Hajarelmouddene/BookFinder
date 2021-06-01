//apply migration
exports.up = function (knex) {
  return knex.schema.createTable("bookstore", (table) => {
    table.increments("bookstore_id").primary().unique();
    table.string("name", 255).notNullable();
    //remove " ", "-", "+", "(", and ")" chars from req.body.phoneNumber
    table.string("phone_number").notNullable().unique();
    table.string("address", 255).notNullable();
    //created at and updated at timestamps
    table.timestamps(true, true);
  });
};

//undo migration
exports.down = function (knex) {
  return knex.schema.dropTable("bookstore");
};
