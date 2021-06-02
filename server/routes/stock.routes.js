const router = require("express").Router();
const stockController = require("../controllers/stock.controller");
const authenticateJWT = require("../middlewares/auth.middleware");

// @route: get all books from a particular bookstore
router.get("/:bookstoreId", stockController.getBooksStock);

// @route: get a specific book from a particular bookstore
router.get("/:bookstoreId/:ISBN", stockController.getBookStock);

// @route: add book to a particular bookstore
router.post("/add", authenticateJWT, (req, res) => {
  stockController.createStock;
});

// @route: delete book from a particular bookstore
router.delete("/delete/:stockId", authenticateJWT, (req, res) => {
  stockController.deleteStock;
});

// @route: update book quantity in a particular bookstore
router.patch("/update", authenticateJWT, (req, res) => {
  stockController.updateStock;
});

module.exports = router;
