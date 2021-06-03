const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { validationResult } = require("express-validator");

//Controller handles requests, deleguates to service, and communicates errors.
exports.createUser = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    //Create User, pass req.body to service layer
    const authenticatedUser = await userService.loginUser(req.body);

    if (authenticatedUser) {
      //Generate an access token
      const accessToken = jwt.sign(
        authenticatedUser,
        process.env.ACCESS_TOKEN_SECRET
      );
      // respond with generated access token
      if (accessToken) {
        res.status(200).json({
          message: "User successfully authenticated",
          accessToken,
        });
      } else {
        res.status(500).json({
          message:
            "Something went wrong generating an access token for an authenticated user",
        });
      }
    }
  } catch (err) {
    console.log(err);
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
