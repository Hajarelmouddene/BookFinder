exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("book")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("book").insert([
        {
          isbn: 1001001001,
          book_name: "First book",
          author_name: "Troy Smith",
        },
        {
          isbn: 1001001002,
          book_name: "Second book",
          author_name: "John Doe",
        },
        {
          isbn: 1001001003,
          book_name: "Third book",
          author_name: "Sara Crooks",
        },
      ]);
    });
};
