exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("bookstore")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("bookstore").insert([
        {
          name: "Bookstore 1",
          phone_number: "5142438822",
          address: "123 Elmer, Montreal, Canada J4Z 3H8",
        },
        {
          name: "Bookstore 2",
          phone_number: "5142018710",
          address: "23 Maisonneuve, Montreal, Canada J5Z 3F8",
        },
        {
          name: "Bookstore 3",
          phone_number: "5140987651",
          address: "3400 Joliette, Montreal, Canada J4Z 3R9",
        },
      ]);
    });
};
