exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("user").insert([
        //better to avoid adding id, can run into issue,
        {
          first_name: "Hajar",
          last_name: "El Mouddene",
          email: "hajarmouddjene@gmail.com",
          password: "hajar123-!",
        },
        {
          first_name: "Sara",
          last_name: "Simons",
          email: "sarasimons@gmail.com",
          password: "sldkfra-829!",
        },
        {
          first_name: "Matthew",
          last_name: "Mcmaster",
          email: "matmacmaster@gmail.com",
          password: "flf03f03-f!djd",
        },
      ]);
    });
};
