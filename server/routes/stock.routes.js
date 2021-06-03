const router = require("express").Router();
const stockController = require("../controllers/stock.controller");
const authenticateJWT = require("../middlewares/auth.middleware");
const { body } = require("express-validator");

// @route: get all stock entries (books) for a particular bookstore
router.get("/:bookstoreId", authenticateJWT, stockController.getBooksStock);

// @route: get a specific stock (book) from a particular bookstore
router.get(
  "/:bookstoreId/:ISBN",
  authenticateJWT,
  stockController.getBookStock
);

// @route: add book to a particular bookstore (stock)
router.post(
  "/add",
  authenticateJWT,

  //req.body validation
  body("ISBN")
    .not()
    .isEmpty()
    .withMessage("ISBN-13 must be provided")
    .isInt({ min: 0 })
    .withMessage("ISBN-13 must be a positive integer")
    .isLength({ min: 13, max: 13 })
    .withMessage("ISBN-13 must be 13-digits long"),
  body("bookstoreId")
    .not()
    .isEmpty()
    .withMessage("Bookstore Id must be provided")
    .isInt({ min: 0 })
    .withMessage("Bookstore Id must be a positive integer"),
  body("quantity")
    .not()
    .isEmpty()
    .withMessage("Quantity must be provided")
    .isInt({ min: 0 })
    .withMessage("Quantity must be 0 or a positive integer"),
  stockController.createStock
);

// @route: delete book from a particular bookstore
router.delete("/delete/:stockId", authenticateJWT, stockController.deleteStock);

// @route: update book quantity in a particular bookstore
router.patch(
  "/update",

  //req.body validation
  authenticateJWT,
  body("stockId")
    .not()
    .isEmpty()
    .withMessage("Stock Id must be provided")
    .isInt({ min: 0 })
    .withMessage("Stock Id must be a positive integer"),
  body("quantity")
    .not()
    .isEmpty()
    .withMessage("Quantity must be provided")
    .isInt({ min: 0 })
    .withMessage("Quantity must be 0 or a positive integer"),
  stockController.updateStock
);

module.exports = router;
