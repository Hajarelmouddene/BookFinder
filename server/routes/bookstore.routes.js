const router = require("express").Router();
const bookstoreController = require("../controllers/bookstore.controller");
const authenticateJWT = require("../middlewares/auth.middleware");

// @route: add a bookstore
router.post("/add", authenticateJWT, bookstoreController.createBookstore);

module.exports = router;
