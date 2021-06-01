const userService = require("../services/user.service");
// TODO: add req.body validation and JWT and login controller

//Controller handles requests, deleguates to service, and communicates errors.
exports.createUser = async (req, res) => {
  try {
    //Create User, pass req.body to service layer
    const newUser = await userService.createUser(req.body);
    res.status(201).json({
      message: "User successfully created",
      user: newUser,
    });
  } catch (err) {
    if (err.code === 400) {
      res.status(400).json({
        status: 400,
        message: `Something went wrong creating a user with email ${req.body.email}. ${err}.`,
      });
    } else {
      res
        .status(500)
        .json(
          `Something went wrong creating a user with email ${req.body.email}.`
        );
    }
  }
};

exports.loginUser = async (req, res) => {
  try {
    //Create User, pass req.body to service layer
    const authenticatedUser = await userService.loginUser(req.body);
    res.status(201).json({
      message: "User successfully authenticated",
      authenticatedUser,
    });
  } catch (err) {
    if (err.code === 400) {
      res.status(400).json({
        status: 400,
        message: `Something went wrong authenticating a user with email ${req.body.email}. ${err}.`,
      });
    } else {
      res
        .status(500)
        .json(
          `Something went wrong authenticating a user with email ${req.body.email}.`
        );
    }
  }
};

//TODO: when using dependency injection export an instance of UserController
// module.exports = new UserController();