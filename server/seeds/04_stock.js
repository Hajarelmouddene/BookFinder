exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("stock")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("stock").insert([
        {
          isbn: 1001001001,
          bookstore_id: 1,
          quantity: 200,
          status: "in stock",
        },
      ]);
    });
};
