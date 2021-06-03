const router = require("express").Router();
const bookController = require("../controllers/book.controller");
const authenticateJWT = require("../middlewares/auth.middleware");
const { body } = require("express-validator");

router.post(
  "/add",
  authenticateJWT,
  /**
   * req.body validation and sanitization.
   * trim() trims leading and trailing whitespace.
   */
  body("bookName")
    .not()
    .isEmpty()
    .withMessage("Book name must be provided")
    .trim(),
  body("authorName")
    .not()
    .isEmpty()
    .withMessage("Author name must be provided")
    .trim(),
  body("ISBN")
    .not()
    .isEmpty()
    .withMessage("ISBN-13 must be provided")
    .isInt({ min: 0 })
    .withMessage("ISBN-13 must be a positive integer")
    .isLength({ min: 13, max: 13 })
    .withMessage("ISBN-13 must be 13-digits long"),
  bookController.createBook
);

// router.post("/add", [authenticateJWT, superuserMiddleware  ], bookController.createBook);

module.exports = router;
