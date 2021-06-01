const router = require("express").Router();
const userController = require("../controllers/user.controller");

// @route: register a user account
router.post("/register", userController.createUser);

// @route: user login
TODO: router.post("/login", userController.loginUser);

//TODO: need to implement JWT access here

module.exports = router;
