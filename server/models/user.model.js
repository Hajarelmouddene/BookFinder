const db = require("../db/db");
// TODO: add login model

class UserModel {
  async createUser(firstName, lastName, email, hashedPassword) {
    //destructure newUser (promise)
    const [newUser] = await db("user")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword,
      })
      .returning(["user_id", "first_name", "last_name", "email"]);

    return newUser;
  }
  async findUserByEmail(email) {
    //destructure user (promise)
    const [user] = await db("user").where("email", email);
    return user;
  }

  async loginUser(email) {
    //destructure user (promise)
    const [user] = await db("user")
      .where("email", email)
      .select("first_name", "last_name", "email");
    return user;
  }
}

module.exports = new UserModel();
