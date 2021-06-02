const router = require("express").Router();
const bookstoreController = require("../controllers/bookstore.controller");
const authenticateJWT = require("../middlewares/auth.middleware");

// @route: add a bookstore
router.post("/add", authenticateJWT, (req, res) => {
  bookstoreController.createBookstore;
});

module.exports = router;
