const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
// TODO: add login service

class UserService {
  async createUser(userDto) {
    //destructure req.body passed from book controller to book service
    const { firstName, lastName, email, password } = userDto;

    //check if user exists in user table, if it does throw error.
    const user = await userModel.findUserByEmail(email);
    if (user) {
      const err = new Error(`User with email ${email} exists already`);
      err.code = 400;
      throw err;
    }

    //hash password received from req.body
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hashedPassword = await bcrypt.hash(password, salt);
    if (!hashedPassword)
      throw Error("Something went wrong hashing the password");

    // pass req.body to bookModel; return (promise)
    return userModel.createUser(firstName, lastName, email, hashedPassword);
  }

  async loginUser(loginDto) {
    const { email, password } = loginDto;

    //check if user exists in user table, if no user with provided email is found throw error.
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      const err = new Error(`Account with email ${email} does not exist`);
      err.code = 400;
      throw err;
    }
    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error(`Provided password is invalid`);
      err.code = 400;
      throw err;
    }

    return userModel.loginUser(email);
  }
}

module.exports = new UserService();
