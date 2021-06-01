const router = require("express").Router();
const bookController = require("../controllers/book.controller");

router.post("/add", bookController.createBook);

//TODO: need to implement JWT access here

module.exports = router;
