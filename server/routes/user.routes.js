const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { body } = require("express-validator");

// @route: register a user account
//t
router.post(
  "/register",
  /**
   * req.body validation and sanitization.
   * trim() trims leading and trailing whitespace.
   */
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("A valid email address must be provided")
    .trim(),
  body("firstName")
    .not()
    .isEmpty()
    .withMessage("First Name is required")
    .trim(),
  body("lastName").not().isEmpty().withMessage("Last name is required").trim(),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage(
      "Password must be minimum eight characters, have at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .trim(),
  userController.createUser
);

// @route: user login
router.post(
  "/login",
  //req.body validation and sanitization. trim() trims leading and trailing whitespace
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("A valid email address must be provided")
    .trim(),
  body("password").not().isEmpty().withMessage("Password is required").trim(),
  userController.loginUser
);

module.exports = router;
