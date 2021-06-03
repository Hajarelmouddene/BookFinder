const bcrypt = require("bcrypt");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(async function () {
      //hash password before inserting in db; needed during login in jest tests.
      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error("Something went wrong with bcrypt");
      const hashedPassword = await bcrypt.hash("Tara2082dn5%123-!", salt);
      if (!hashedPassword)
        throw Error("Something went wrong hashing the password");

      // Inserts seed entries
      return knex("user").insert([
        {
          first_name: "Tara",
          last_name: "Mills",
          email: "taramills@gmail.com",
          password: hashedPassword,
        },
        // {
        //   first_name: "Sara",
        //   last_name: "Simons",
        //   email: "sarasimons@gmail.com",
        //   password: "sldkfra-829!",
        // },
        // {
        //   first_name: "Matthew",
        //   last_name: "Mcmaster",
        //   email: "matmacmaster@gmail.com",
        //   password: "flf03f03-f!djd",
        // },
      ]);
    });
};
