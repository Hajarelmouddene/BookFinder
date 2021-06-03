const router = require("express").Router();
const bookstoreController = require("../controllers/bookstore.controller");
const authenticateJWT = require("../middlewares/auth.middleware");
const { body } = require("express-validator");

// @route: add a bookstore
router.post(
  "/add",
  authenticateJWT,
  //req.body validation and sanitization. trim() trims leading and trailing whitespace
  body("bookstoreName")
    .not()
    .isEmpty()
    .withMessage("Bookstore name is required")
    .trim(),
  body("phoneNumber")
    .not()
    .isEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Phone number must have digits only and no spaces or hyphens")
    .trim(),
  body("address")
    .not()
    .isEmpty()
    .withMessage("Address name is required")
    .trim(),
  bookstoreController.createBookstore
);

module.exports = router;
