const router = require("express").Router();
const stockController = require("../controllers/stock.controller");

// @route: get all books from a particular bookstore
router.get("/:bookstoreId", stockController.getBooksStock);

// @route: get a specific book from a particular bookstore
router.get("/:bookstoreId/:ISBN", stockController.getBookStock);

// @route: add book to a particular bookstore
router.post("/add", stockController.createStock);

// @route: delete book from a particular bookstore
router.delete("/delete/:stockId", stockController.deleteStock);

// @route: update book quantity in a particular bookstore
router.patch("/update", stockController.updateStock);

//TODO: need to implement JWT access here
module.exports = router;
