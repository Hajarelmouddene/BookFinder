const router = require("express").Router();
const bookstoreController = require("../controllers/bookstore.controller");

// @route: add a bookstore
router.post("/add", bookstoreController.createBookstore);

//TODO: need to implement JWT access here
module.exports = router;
